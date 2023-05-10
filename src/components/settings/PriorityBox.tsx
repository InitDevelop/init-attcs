import React from 'react'
import '../../App.css'
import '../../AppMobile.css';
import './PriorityBox.css';
import { lecture, lectureGroup } from '../../interfaces/Lecture';

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;
  message: string;
  warningType: string;
  priorities: string[];
  setPriority: (param: string[]) => void;
}

function PriorityBox(props: propType) {
  return (
    <div className='prioritybox'>
      <button className='button-tiny'
        onClick={
          () => {
            let index = props.priorities.indexOf(props.warningType);
            if (index > 0) {
              let temp = props.priorities[index - 1];
              props.priorities[index - 1] = props.priorities[index];
              props.priorities[index] = temp;
            }
            props.setUpdateCount(props.updateCount + 1);
          }
        }
      >↑</button>
      <button className='button-tiny'
        onClick={
          () => {
            let index = props.priorities.indexOf(props.warningType);
            if (index < props.priorities.length - 1) {
              let temp = props.priorities[index + 1];
              props.priorities[index + 1] = props.priorities[index];
              props.priorities[index] = temp;
            }
            props.setUpdateCount(props.updateCount + 1);
          }
        }
      >↓</button>
      <div className="priority-info">
        <div className={props.warningType + '-warning-box'}>
          <strong> [{props.priorities.indexOf(props.warningType) + 1}순위]</strong> {props.message}
        </div>
      </div>
    </div>
  );
}

export default PriorityBox;