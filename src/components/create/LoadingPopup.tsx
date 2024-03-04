import "../popup/Popup.css";
import "./LoadingPopup.css";

const LoadingPopup = (props: { totalCombinations: number, currentCombination: number, validCombinations: number, }) => {
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='container-title'>가능한 모든 시간표 생성 중...</div>
        <table className='loading-table top-margin-20'>
          <tbody>
            <tr>
              <td className="loading-table-left extrabold">전체 경우의 수</td>
              <td className="loading-table-right" colSpan={2}>
                {
                  props.totalCombinations > 1 ?
                    <span>{props.totalCombinations.toLocaleString()}가지</span>
                  : <span className='value'>계산 중...</span>
                }
              </td>
            </tr>
            <tr>
              <td className="loading-table-left extrabold">검토한 시간표 수</td>
              <td className="loading-table-right" colSpan={2}>{props.currentCombination.toLocaleString()}개</td>
            </tr>
            <tr>
              <td className="loading-table-left extrabold" rowSpan={2}>검토 결과</td>
              <td className="loading-table-right-half bold blue">유효</td>
              <td className="loading-table-right-half bold red">무효</td>
            </tr>
            <tr>
              <td>{props.validCombinations.toLocaleString()}개</td>
              <td>{(props.currentCombination - props.validCombinations).toLocaleString()}개</td>
            </tr>
            <tr>
              <td className="padding-0 progress-bar-text " colSpan={3}>
                <div className="progress-bar-text bold">
                  {(100 * (props.currentCombination / props.totalCombinations)).toFixed(2)}%
                </div>

                <div className="progress-bar" style={{
                  width: `calc(100% * ${props.currentCombination / props.totalCombinations})`,
                  backgroundColor: "#47cc66",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                }}/>
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

export default LoadingPopup;