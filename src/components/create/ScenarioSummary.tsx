import { useContext } from 'react';
import './ScenarioSummary.css';
import '../../App.css'
import { CreationContext } from '../../App';
import { lecture } from '../../interfaces/Lecture';
import Left from '../../img/left.svg';
import Right from '../../img/right.svg';
import { colors } from '../preview/TimeTable';

function ScenarioSummary() {
  const data = useContext(CreationContext);
  return (
    <div className='scenario-summary-container'>
      <div className='scenario-summary-row-container'>
        <div style={{ width: "15%", verticalAlign: "middle" }}>
          <img className='arrow-button' src={Left}
            onClick={
              () => {
                if (data.scenarioNumber > 0) {
                  data.setScenarioNumber(data.scenarioNumber - 1);
    
                  let relatedLectures: lecture[] = [];
                  for (let i = 0; i < data.scenarios[data.scenarioNumber - 1].shareTimeLectures.length; i++) {
                    relatedLectures.push(...data.scenarios[data.scenarioNumber - 1].shareTimeLectures[i]);
                  }
                  data.setRelatedLectures(relatedLectures);
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
          <p className="priority" style={
            { backgroundColor: colors[(data.scenarios[data.scenarioNumber].priority - 1) % colors.length] }}>
            {data.scenarios[data.scenarioNumber].priority}순위
          </p>
        </div>

        <div style={{ width: "15%", verticalAlign: "middle" }}>
          <img className='arrow-button' src={Right}
            onClick={
              () => {
                if (data.scenarioNumber < data.scenarios.length - 1) {
                  data.setScenarioNumber(data.scenarioNumber + 1);
    
                  let relatedLectures: lecture[] = [];
                  for (let i = 0; i < data.scenarios[data.scenarioNumber + 1].shareTimeLectures.length; i++) {
                    relatedLectures.push(...data.scenarios[data.scenarioNumber + 1].shareTimeLectures[i]);
                  }
                  data.setRelatedLectures(relatedLectures);
                }
              }
            }
          />
        </div>
      </div>

      <div className='scenario-summary-row-container'>

      </div>
    </div>
  )
}

export default ScenarioSummary