import { useContext } from 'react';
import { CreationContext } from '../../App';

function CircleScenarios() {

  const data = useContext(CreationContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
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
          }}>이전</button>
        
        <h2 style={{ fontWeight: "200" }}>
        <strong>{data.scenarioNumber + 1}</strong>/<strong>{data.scenarios.length}</strong>
        </h2>

        <button className='button-0'
        style={{ margin: "0px 20px" }}
        onClick={() => {
            if (data.scenarioNumber < data.scenarios.length - 1) {
              data.setScenarioNumber(data.scenarioNumber + 1);
            }
          }}>다음</button>
        <br/>
      </div>
    </div>
  )
}

export default CircleScenarios;