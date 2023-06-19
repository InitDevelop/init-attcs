import { useContext } from 'react';
import './ScenarioSummary.css';
import '../../App.css'
import { CreationContext } from '../../App';
import Left from '../../img/left.svg';
import Right from '../../img/right.svg';
import { scenario } from '../../interfaces/Scenario';
import Warning from './Warning';

const creditSum = (sc: scenario) => {
  let returnValue = 0;
  for (const lect of sc.lectures) {
    returnValue += parseInt(lect.credit);
  }
  return returnValue;
}

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

const colors: string[] 
  = ["#39709D", "#5997c9", "#f5c764", "#F19B61", "#F3825F", "#F96859"];



function ScenarioSummary() {
  const data = useContext(CreationContext);
  const prioritiesCount = data.scenarios.map(sc => sc.priority);
  const numPriorities = getNumPriorities(prioritiesCount);

  return (
    <div className='scenario-summary-container'>

      <hr style={
        {
          border: "none",
          borderTop: "1px solid #ccc",
          height: "1px",
          margin: "10px 0"
        }
      }/>

      <div className='scenario-summary-row-container'>
        <div style={{ width: "15%", verticalAlign: "middle" }}>
          <img className='arrow-button' src={Left} alt="left-button"
            onClick={
              () => {
                if (data.scenarioNumber > 0) {
                  data.setScenarioNumber(data.scenarioNumber - 1);
                }
              }
            }
          />
        </div>

        <div style={{ width: "70%" }}>
          <p className="large-text" style={{ marginBottom: "5px" }}>생성된 <strong>{data.scenarios.length}</strong>개의 시간표 중</p>
          <p className="x-large-text">
            <strong>{data.scenarioNumber + 1}</strong>번째 시간표
          </p>

        </div>

        <div style={{ width: "15%", verticalAlign: "middle" }}>
          <img className='arrow-button' src={Right} alt="right-button"
            onClick={
              () => {
                if (data.scenarioNumber < data.scenarios.length - 1) {
                  data.setScenarioNumber(data.scenarioNumber + 1);
                }
              }
            }
          />
        </div>
      </div>
      
      <hr style={
        {
          border: "none",
          borderTop: "1px solid #ccc",
          height: "1px",
          margin: "10px 0"
        }
      }/>

      <div className='scenario-summary-row-container' style={{ overflow: "auto", bottom: "0px" }}>
        <table className='summary-table'>
          <tbody>
            <tr>
              <td className='table-key'>
                <h4 className='item-square-key'>추천 정도</h4>
              </td>
              <td className='table-value'>
                <p className="priority" style={
                  { backgroundColor: 
                    colors[(data.scenarios[data.scenarioNumber].priority - 1) <= 5 ? (data.scenarios[data.scenarioNumber].priority - 1) : 5] }}>
                  {data.scenarios[data.scenarioNumber].priority}순위 (총 {numPriorities[data.scenarios[data.scenarioNumber].priority - 1]}개)
                </p>
              </td>
            </tr>


            <tr>
              <td className='table-key'>
                  <h4 className='item-square-key'>전체 학점</h4>
                </td>
                <td className='table-value'>
                  <p className='item-square'>
                    {creditSum(data.scenarios[data.scenarioNumber])}학점
                  </p>
                </td>
            </tr>


            {
              (data.scenarios.length > 0) && (
                data.scenarios[data.scenarioNumber].warnings.filter(w => w.isCritical).map(
                  warning =>
                  <tr key={warning.warningType}>
                    <td colSpan={2}>
                      <Warning
                        key={warning.warningType}
                        warningType={warning.warningType}
                        />
                    </td>
                  </tr>
                )
              )
            }
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScenarioSummary