import '../../App.css'
import '../../AppMobile.css';
import './PriorityBox.css';
import { Dictionary } from '../../interfaces/Util';

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;

  message: string;
  moreInfo: string;

  warningType: string;

  priorities: Dictionary<number>;
  setPriority: (param: Dictionary<number>) => void;
}

function PriorityBox(props: propType) {

  const handleLowerPriority = () => {
    if (Math.abs(props.priorities[props.warningType]) < Object.keys(props.priorities).length) {
      let copy = props.priorities;
      let changeKey = Object.keys(props.priorities).filter(key => Math.abs(props.priorities[key]) === Math.abs(props.priorities[props.warningType]) + 1)[0];
      copy[changeKey] = copy[changeKey] > 0 ? copy[changeKey] - 1 : copy[changeKey] + 1;
      copy[props.warningType] = copy[props.warningType] > 0 ? copy[props.warningType] + 1 : copy[props.warningType] - 1;
      props.setPriority(copy);
    }
    props.setUpdateCount(props.updateCount + 1);
  }

  const handleRaisePriority = () => {
    if (Math.abs(props.priorities[props.warningType]) > 1) {
      let copy = props.priorities;
      let changeKey = Object.keys(props.priorities).filter(key => Math.abs(props.priorities[key]) === Math.abs(props.priorities[props.warningType]) - 1)[0];
      copy[changeKey] = copy[changeKey] > 0 ? copy[changeKey] + 1 : copy[changeKey] - 1;
      copy[props.warningType] = copy[props.warningType] > 0 ? copy[props.warningType] - 1 : copy[props.warningType] + 1;
      props.setPriority(copy);
    }
    props.setUpdateCount(props.updateCount + 1);
  }

  const handleToZero = () => {
    let copy = props.priorities;
    if (Math.abs(props.priorities[props.warningType]) > 0.5) {
      let cnt = 1;
      const keys = Object.keys(props.priorities).sort((a, b) => Math.abs(props.priorities[a]) - Math.abs(props.priorities[b]));
      for (const key of keys) {
        if (key !== props.warningType && Math.abs(props.priorities[key]) > 0.5) {
          if (props.priorities[key] > 0) {
            copy[key] = cnt;
          } else {
            copy[key] = -cnt;
          }
          cnt++;
        }
      }
      copy[props.warningType] = copy[props.warningType] > 0 ? 0.1 : -0.1;
    } else {
      const keys = Object.keys(props.priorities);
      for (const key of keys) {
        if (key !== props.warningType && Math.abs(props.priorities[key]) > 0.5) {
          if (props.priorities[key] > 0) {
            copy[key] = copy[key] + 1;
          } else {
            copy[key] = copy[key] - 1;
          }
        }
      }
      copy[props.warningType] = copy[props.warningType] > 0 ? 1 : -1;
    }
    props.setPriority(copy);
    props.setUpdateCount(props.updateCount + 1);
  }

  const handleInvertEvent = () => {
    let copy = props.priorities;
    copy[props.warningType] = -copy[props.warningType];
    props.setPriority(copy);
    props.setUpdateCount(props.updateCount + 1);
  }

  return (
    <div className='prioritybox'>
      <table className='prioritybox-table'>
        <tbody>
          <tr>
            <td style={{ width: "15%" }}>
              <p className={ 'filled-' + props.warningType + '-warning-box'}>
                {Math.floor(Math.abs(props.priorities[props.warningType]))}순위</p>
            </td>
            <td style={{ width: "85%" }}>
              <strong style={{ color: props.priorities[props.warningType] < 0 ? "red" : "black" }}>{props.message}</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td style={{ padding: "7px", textAlign: "justify" }}>
              {props.moreInfo}
            </td>
          </tr>
          <tr>
            <td></td>
            <td style={{ padding: "7px", display: "flex", flexDirection: "row" }}>
              <button className='button-0' onClick={handleRaisePriority} disabled={Math.abs(props.priorities[props.warningType]) < 0.5}>순위 ↑</button>
              <button className='button-0' onClick={handleLowerPriority} disabled={Math.abs(props.priorities[props.warningType]) < 0.5}>순위 ↓</button>
              <button className='button-0' onClick={handleToZero}>
                {Math.abs(props.priorities[props.warningType]) > 0.5 ? "0순위로" : "원래대로"}</button>
              <button className='button-0' onClick={handleInvertEvent}>반전</button>
            </td>
          </tr>
          {
            Math.abs(props.priorities[props.warningType]) < 0.5 && (
              <tr>
                <td></td>
                <td style={{ padding: "7px", textAlign: "justify" }}>
                  <p style={{ color: "darkred", fontWeight: "800", border: "2px solid darkred" }}>이 규칙을 만족하지 않는 시간표는 표시되지 않습니다.</p>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default PriorityBox;