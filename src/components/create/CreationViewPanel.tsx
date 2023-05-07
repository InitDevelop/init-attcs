import { useContext } from 'react';
import "../../css/AppTable.css";
import "../add/SubjectList.css";
import { CreationContext } from "../../App";
import { CreateScenarios } from './CreateScenarios';
import { lecture } from '../../interfaces/Lecture';
import Warning from './Warning';
import ScenarioSummary from './ScenarioSummary';

const warningSign = '⚠';

/*
const getIndex = (n: number, d: number) => {
  if (n >= 0) {
    return n % d;
  } else {
    return Math.abs(n) % d + (n % d);
  }
}
*/

function CreationViewPanel() {

  const data = useContext(CreationContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>

      <button className='button-0'
      style={
        {
          marginTop: "20px",
          marginBottom: "20px",
          width: "70%",
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

      <hr style={
        {
          border: "none",
          borderTop: "1px solid #ccc",
          height: "1px",
          margin: "10px 0"
        }
      }/>

      <br/>
      
      {
        (data.scenarios.length > 0) && (
          <ScenarioSummary/>
        )
      }


      
      <div
      style={
        {
          overflow: "auto",
          position: "absolute",
          height: "40%",
          left: "20px",
          right: "20px",
          bottom: "20px"
        }
      }>
        
      </div>


    </div>
  );
}

export default CreationViewPanel;