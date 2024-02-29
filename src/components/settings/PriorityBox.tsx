import './PriorityBox.css';
import upIcon from '../../img/arrow-thin-up-svgrepo-com.svg';
import downIcon from '../../img/arrow-thin-down-svgrepo-com.svg';

export const PriorityBox = (
  props: {
    warningType: string,
    handleLowerPriority: (param: string) => void,
    handleRaisePriority: (param: string) => void,
    handleToZero: (param: string) => void,
    handleInvertEvent: (param: string) => void,
    message: string,
    extraInfo: string,
    level: number,
    value: number,
  }
) => {

  return (
    <div className='prioritybox-outer'>
      <div className='prioritybox-inner'>
        <div className='prioritybox-horizontal-container'>
          <div className="extrabold large prioritybox-message" style={{ color: props.value < 0 ? "red" : "black" }}>
            {props.message}
          </div>
        </div>
        <div className='prioritybox-horizontal-container top-margin-20'>
          <div className="regular large">{props.extraInfo}</div>
        </div>
        <div className='prioritybox-horizontal-container top-margin-20'>
          <div className={ 'bold flex-1 right-margin-10 filled-' + props.warningType + '-warning-box right-margin-10'}>
            {props.level}순위
          </div>
          <button className="button-gray-invert flex-1 right-margin-10" onClick={() => props.handleRaisePriority(props.warningType)}>순위 ↑</button>
          <button className="button-gray-invert flex-1 right-margin-10" onClick={() => props.handleLowerPriority(props.warningType)}>순위 ↓</button>
          <button className="button-gray-invert flex-1 right-margin-10" onClick={() => props.handleToZero(props.warningType)}>
            {Math.abs(props.value) > 0.5 ? "0순위로" : "원래대로"}
          </button>
          <button className="button-gray-invert flex-1" onClick={() => props.handleInvertEvent(props.warningType)}>반전</button>
        </div>

      </div>
    </div>
  )
}
