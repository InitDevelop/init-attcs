import React, { useContext } from 'react';
import "../../css/AppTable.css";
import "../../css/SubjectList.css";
import { CreationContext } from "../../App";
import { CreateScenarios } from './CreateScenarios';
import CreateAddedSubject from './CreateAddedSubject';

/*
const getIndex = (n: number, d: number) => {
  if (n >= 0) {
    return n % d;
  } else {
    return Math.abs(n) % d + (n % d);
  }
}
*/

function range(start: number, end: number, step: number = 1): number[] {
  return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}

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


      <br/>

      <div style={
        {
          display: "flex",
          flexDirection: "row",
          fontSize: "large"
        }
      }>
        <button className='button-0'
        style={{ margin: "0px 20px" }}
        onClick={() => {
            if (data.scenarioNumber > 0) {
              data.setScenarioNumber(data.scenarioNumber - 1);
            }
          }}>이전 시나리오</button>
        <button className='button-0'
        style={{ margin: "0px 20px" }}
        onClick={() => {
            if (data.scenarioNumber < data.scenarios.length - 1) {
              data.setScenarioNumber(data.scenarioNumber + 1);
            }
          }}>다음 시나리오</button>
        <br/>
      </div>

      <hr style={
        {
          border: "none",
          borderTop: "1px solid #ccc",
          height: "1px",
          margin: "30px 0"
        }
      }/>


      <div
      style={
        {
          width: "100%"
        }
      }>
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
      </div>


    </div>
  );
}

export default CreationViewPanel;