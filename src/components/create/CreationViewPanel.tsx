import { useContext } from 'react';
import "../../css/AppTable.css";
import "../add/SubjectList.css";
import { CreationContext } from "../../App";
import { Lecture } from '../../util/Lecture';
import ScenarioSummary from './ScenarioSummary';
import { Scenario } from '../../util/Scenario';

type propType = {
  setIsLoading: (param: boolean) => void;
  setScenarios: (param: Scenario[]) => void;
  setTotalCombinations: (param: number) => void;
  setCurrentCombination: (param: number) => void;
  setValidCombinations: (param: number) => void;
};

function CreationViewPanel(props: propType) {

  const data = useContext(CreationContext);

  const runWorker = () => {
    const worker = new Worker(new URL("./CreationWorker.tsx", import.meta.url));
    props.setCurrentCombination(0);
    props.setTotalCombinations(1);
    props.setValidCombinations(0);
    props.setIsLoading(true);

    worker.onmessage = (event) => {
      if (event.data.finished) {
        data.setScenarioNumber(0);
        props.setScenarios(event.data.scenarios);
        if (data.scenarios.length > 0) {
          let relatedLectures: Lecture[] = [];
          for (let i = 0; i < data.scenarios[0].shareTimeLectures.length; i++) {
            relatedLectures.push(...data.scenarios[0].shareTimeLectures[i]);
          }
          data.setRelatedLectures(relatedLectures);
        }
        worker.terminate();
        props.setIsLoading(false);
      } else {
        props.setCurrentCombination(event.data.current);
        props.setTotalCombinations(event.data.total);
        props.setValidCombinations(event.data.valid);
      }
    }

    worker.postMessage({
      originalLectureGroups: data.lectureGroups,
      priorityValues: data.priority
    });
  }

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <button className='button-0'
      style={
        {
          position: "absolute",
          left: "50%",
          top: "20px",
          transform: "translate(-50%, 0)",
          width: "65%",
          fontSize: data.isMobile ? "120%" : "x-large",
          fontWeight: "700"
        }
      }
      onClick={runWorker}>{(data.scenarios.length > 0) ? "시간표 다시 생성하기" : "시간표 자동 생성하기"}</button>

      {
        data.scenarios.length > 0 && (
          <button className='button-0'
          style={
            {
              position: "absolute",
              left: "50%",
              top: data.isMobile ? "70px" : "80px",
              transform: "translate(-50%, 0)",
              width: "65%",
              fontSize: data.isMobile ? "120%" : "x-large",
              fontWeight: "700"
            }
          }
          onClick={
            () => {
                if (data.scenarios.length > 0) {
                  data.setSelSubj(data.scenarios[data.scenarioNumber].lectures);
                  data.displayPopup("시간표 가져오기", <>시간표 가져오기에 성공했습니다. "시간표" 메뉴에서 이 시간표를 확인할 수 있습니다.</>);
                }
              }
          }>시간표 가져오기</button>
        )
      }
      {
        (data.scenarios.length > 0) && (
          <ScenarioSummary/>
        )
      }
    </div>
  );
}

export default CreationViewPanel;