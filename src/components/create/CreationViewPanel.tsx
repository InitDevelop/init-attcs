import { useContext } from 'react';
import "../../css/AppTable.css";
import "../add/SubjectList.css";
import { CreationContext } from "../../App";
import { CreateScenarios } from './CreateScenarios';
import { lecture } from '../../interfaces/Lecture';
import ScenarioSummary from './ScenarioSummary';

function CreationViewPanel() {

  const data = useContext(CreationContext);

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
          fontSize: "x-large",
          fontWeight: "700"
        }
      }
      onClick={
        () => {
            data.setScenarioNumber(0);
            CreateScenarios(data.setScenarios, data.lectureGroups);
            if (data.scenarios.length > 0) {
              let relatedLectures: lecture[] = [];
              for (let i = 0; i < data.scenarios[0].shareTimeLectures.length; i++) {
                relatedLectures.push(...data.scenarios[0].shareTimeLectures[i]);
              }
              data.setRelatedLectures(relatedLectures);
            }
          }
      }>{(data.scenarios.length > 0) ? "시간표 다시 생성하기" : "시간표 자동 생성하기"}</button>

      {
        data.scenarios.length > 0 && (
          <button className='button-0'
          style={
            {
              position: "absolute",
              left: "50%",
              top: "80px",
              transform: "translate(-50%, 0)",
              width: "65%",
              fontSize: "x-large",
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