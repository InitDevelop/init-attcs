import { useSelector } from "react-redux";
import { Lecture } from "../../types/Lecture";
import { Scenario } from "../../types/Scenario";
import "./AutoCreatePanel.css";
import { combinedStateType } from "../../reducers";
import { useDispatch } from "react-redux";

import Left from '../../img/left.svg';
import Right from '../../img/right.svg';
import WarningBox from "../global/WarningBox";

const getNumPriorities = (prioritiesCount: number[]) => {
  const returnList: number[] = [];
  let i = 1;
  while (true) {
    if (prioritiesCount.includes(i)) {
      returnList.push(0);
      i++;
    } else {
      break;
    }
  }
  for (const num of prioritiesCount) {
    returnList[num - 1] += 1;
  }
  return returnList;
}

const creditSum = (sc: Scenario) => {
  let returnValue = 0;
  for (const lect of sc.lectures) {
    returnValue += parseInt(lect.credit);
  }
  return returnValue;
}

const colors: string[] 
  = ["#39709D", "#5997c9", "#f5c764", "#F19B61", "#F3825F", "#F96859"];


export const AutoCreatePanel = (
  props: {
    setIsLoading: (param: boolean) => void;
    setScenarios: (param: Scenario[]) => void;
    setTotalCombinations: (param: number) => void;
    setCurrentCombination: (param: number) => void;
    setValidCombinations: (param: number) => void;
  }
) => {

  const scenarioNumber = useSelector((state: combinedStateType) => state.scenarioReducer.scenarioNumber);
  const scenarios = useSelector((state: combinedStateType) => state.scenarioReducer.scenarios);
  const lectureGroups = useSelector((state: combinedStateType) => state.autoGeneratorReducers.addedLectureGroups);
  const priority = useSelector((state: combinedStateType) => state.priorityReducer.priority);

  const prioritiesCount = scenarios.map(sc => sc.priority);
  const numPriorities = getNumPriorities(prioritiesCount);

  const dispatch = useDispatch();

  const setScenarioNumber = (value: number) => {
    dispatch(
      {
        type: "SET_SCENARIO_NUMBER",
        payload: {
          scenarioNumber: value,
        }
      }
    );
  }

  const setRelatedLectures = (lectures: Lecture[]) => {
    dispatch(
      {
        type: "SET_RELATED_LECTURES",
        payload: {
          relatedLectures: lectures,
        }
      }
    );
  }

  const runWorker = () => {
    const worker = new Worker(new URL("./CreationWorker.tsx", import.meta.url));
    props.setCurrentCombination(0);
    props.setTotalCombinations(1);
    props.setValidCombinations(0);
    props.setIsLoading(true);

    worker.onmessage = (event) => {
      if (event.data.finished) {
        setScenarioNumber(0);
        props.setScenarios(event.data.scenarios);
        if (scenarios.length > 0) {
          let relatedLectures: Lecture[] = [];
          for (let i = 0; i < scenarios[0].shareTimeLectures.length; i++) {
            relatedLectures.push(...scenarios[0].shareTimeLectures[i]);
          }
          setRelatedLectures(relatedLectures);
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
      originalLectureGroups: lectureGroups,
      priorityValues: priority,
    });
  }

  const handleLeftButtonClick = () => {
    if (scenarioNumber > 0) {
      setScenarioNumber(scenarioNumber - 1);
    }
  }

  const handleRightButtonClick = () => {
    if (scenarioNumber < scenarios.length - 1) {
      setScenarioNumber(scenarioNumber + 1);
    }
  }

  return (
    <div className='default-box create-box'>
      <div className='container-title'>시간표 자동생성</div>
      <hr className="divider top-margin-20"/>
      <div className="create-buttons">
        <button className="button-blue top-margin-20 create-buttons-width" onClick={runWorker}>
          <span className="bold xlarge">시간표 생성하기</span>
        </button>
      </div>

      {
        scenarios.length > 0 &&
        <>
        <hr className="divider top-margin-20 bottom-margin-20"/>
        <div className='summary-row-container'>
          <div className='summary-row-container-left'>
            <img className='arrow-button' src={Left} alt="left-button" onClick={handleLeftButtonClick}/>
          </div>
          <div className='summary-row-container-center'>
            <p className='xlarge'>생성된 <strong>{scenarios.length}</strong>개의 시간표 중</p>
            <p className='xxlarge'><strong>{scenarioNumber + 1}</strong>번째 시간표</p>
          </div>
          <div className='summary-row-container-right'>
            <img className='arrow-button' src={Right} alt="right-button" onClick={handleRightButtonClick}/>
          </div>
        </div>

        <hr className="divider top-margin-20 bottom-margin-20"/>

        <div className='summary-row-container'>
          <table className='summary-table'>
            <tbody>
              <tr>
                <td className='table-key'>
                  <h4 className='priority-box large darkgray bold'>추천 정도</h4>
                </td>
                <td className='table-value'>
                  <p className="priority" style={
                    { backgroundColor: 
                      colors[(scenarios[scenarioNumber].priority - 1) <= 5 ? (scenarios[scenarioNumber].priority - 1) : 5] }}>
                    {scenarios[scenarioNumber].priority}순위 (총 {numPriorities[scenarios[scenarioNumber].priority - 1]}개)
                  </p>
                </td>
              </tr>


              <tr>
                <td className='table-key'>
                    <h4 className='priority-box large darkgray bold'>전체 학점</h4>
                  </td>
                  <td className='table-value'>
                    <p className='priority-box large gray'>
                      {creditSum(scenarios[scenarioNumber])}학점
                    </p>
                  </td>
              </tr>
              {(scenarios.length > 0) && (
                scenarios[scenarioNumber].warnings.filter(w => w.isCritical).map(
                  warning =>
                  <tr key={warning.warningType}>
                    <td colSpan={2}>
                      <WarningBox
                        warning={warning}
                        subjectIDs={lectureGroups.map(lectGroup => lectGroup.subjectID)}
                        />
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      }
      
    </div>
  )
}
