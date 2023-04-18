import React, { useContext } from 'react';
import "../../css/AppTable.css";
import "../../css/SubjectList.css";
import { CreationContext } from "../../App";
import { CreateScenarios } from './CreateScenarios';
import CreateAddedSubject from './CreateAddedSubject';
import { range } from '../../interfaces/Util';
import { lecture } from '../../interfaces/Lecture';
import Warning from './Warning';

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

      <h2 className="mid_title" style={{ margin: "20px 10px" }}>생성 결과 확인하기</h2>
      <h2 style={{ fontWeight: "200", marginBottom: "20px" }}>
        <strong>{data.scenarios.length}</strong>
        개의 시나리오 중 <strong>{data.scenarioNumber + 1}</strong>번째
      </h2>

      <div style={
        {
          display: "flex",
          flexDirection: "row",
          fontSize: "large",
          marginBottom: "10px"
        }
      }>
        <button className='button-0'
        style={{ margin: "0px 20px" }}
        onClick={() => {
            if (data.scenarioNumber > 0) {
              data.setScenarioNumber(data.scenarioNumber - 1);

              let relatedLectures: lecture[] = [];
              for (let i = 0; i < data.scenarios[data.scenarioNumber - 1].shareTimeLectures.length; i++) {
                relatedLectures.push(...data.scenarios[data.scenarioNumber - 1].shareTimeLectures[i]);
              }
              data.setRelatedLectures(relatedLectures);
            }
          }}>이전 시나리오</button>
        
        {/* <h2 style={{ fontWeight: "200" }}>
        <strong>{data.scenarioNumber + 1}</strong>/<strong>{data.scenarios.length}</strong>
        </h2> */}

        <button className='button-0'
        style={{ margin: "0px 20px" }}
        onClick={() => {
            if (data.scenarioNumber < data.scenarios.length - 1) {
              data.setScenarioNumber(data.scenarioNumber + 1);

              let relatedLectures: lecture[] = [];
              for (let i = 0; i < data.scenarios[data.scenarioNumber + 1].shareTimeLectures.length; i++) {
                relatedLectures.push(...data.scenarios[data.scenarioNumber + 1].shareTimeLectures[i]);
              }
              data.setRelatedLectures(relatedLectures);
            }
          }}>다음 시나리오</button>
        <br/>
      </div>

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
          data.scenarios[data.scenarioNumber].warnings.map(
            warning =>
            <Warning
            warningType={warning.warningType}
            />
          )
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

/*

        {
          (data.scenarios.length > 0) &&

          range(0, data.scenarios[data.scenarioNumber].lectures.length).map(
            (index: number) => {
              return (
                <CreateAddedSubject
                  subject={data.scenarios[data.scenarioNumber].lectures[index]}
                  displayPopup={data.displayPopup}
                  timeShareLect={data.scenarios[data.scenarioNumber].shareTimeLectures[index]}
                />
              )
            }
          )
        }


*/