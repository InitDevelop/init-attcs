type propType = {
  totalCombinations: number;
  currentCombination: number;
  validCombinations: number;
}

function Loading(props: propType) {
  return (
    <div className="loading">
      <div style={{whiteSpace:'pre-wrap'}} className="loading-inner">
        <h2 className="loading-title" style={{marginBottom: "20px"}}>가능한 모든 시간표 생성 중...</h2>
        <table className='loading-table'>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                <h4 className='key'>전체 경우의 수</h4>
              </td>
              <td style={{ width: "70%" }}>
                {
                  props.totalCombinations > 1 ?
                    <h4 className='value'>{props.totalCombinations.toLocaleString()}가지</h4>
                  : <h4 className='value'>계산 중...</h4>
                }
                
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>
                <h4 className='key'>검토한 시간표 수</h4>
              </td>
              <td style={{ width: "70%" }}>
                <h4 className='value'>{props.currentCombination.toLocaleString()}개</h4>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>
                <h4 className='key'>검토 결과</h4>
              </td>
              <td style={{ width: "70%" }}>
                <h4 className='value'>
                  <strong style={{color: "#519ead"}}>유효</strong> {props.validCombinations.toLocaleString()}개
                </h4>
                <h4 className='value'>
                  <strong style={{color: "#de6b54"}}>무효</strong> {(props.currentCombination - props.validCombinations).toLocaleString()}개
                </h4>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ position: "relative", padding: 0, height: "35px" }}>
                <div style = {
                  {
                    position: "relative",
                    width: "100%",
                    zIndex: 2
                  }}>
                  <strong>{(100 * (props.currentCombination / props.totalCombinations)).toFixed(2)}%</strong>
                </div>
                <div
                  style = {
                  {
                    backgroundColor: "#47cc66",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: `calc(100% * ${props.currentCombination / props.totalCombinations})`,
                    zIndex: 1
                  }
                }
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      
        {
          props.totalCombinations > 1000 && (
            <p style={{ color: "darkred", fontWeight: "800", marginTop: "20px" }}>
              {"만들 수 있는 시간표의 경우의 수가 매우 많습니다.\n담은 강좌 일부를 제거하거나,\n설정에서 0순위 규칙을 지정할 것을 권장합니다."}
            </p>
          )
        }
        
      </div>
    </div>
  );
}

export default Loading;