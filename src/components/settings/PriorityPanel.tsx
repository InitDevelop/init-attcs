import { useSelector } from 'react-redux';
import { Dictionary } from '../../util/Util';
import { PriorityBox } from './PriorityBox';
import './PriorityPanel.css';
import { combinedStateType } from '../../reducers';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const messages: Dictionary<string> = {
  "time": "이동 동선 짧게",
  "lunch": "점심 시간 확보",
  "empty": "공강 있게",
  "morning": "이른 아침 수업 없게",
  "space": "연강 없게",
  "count": "강의 시간 고르게"
};

const messagesInv: Dictionary<string> = {
  "time": "이동 동선 길게",
  "lunch": "점심 시간 없게",
  "empty": "공강 없게",
  "morning": "이른 아침 수업 있게",
  "space": "연강 많게",
  "count": "강의 시간 편차가 심하게"
};

const extraInfo: Dictionary<string> = {
  "time": "인접한 두 강의의 강의 건물과 강의 사이 시간을 고려하여, 짧은 시간에 먼 거리를 이동해야 하는 경우를 후순위로 미룹니다.",
  "lunch": "대부분의 학생 식당의 운영 시간인 11시와 14시 사이에 30분 이상 식사를 할 수 있는 경우를 우선시합니다.",
  "empty": "공강(하루 종일 강의가 없는 날)이 가능한 경우를 우선시합니다.",
  "morning": "9시 45분 이전 아침 일찍 강의가 시작되는 경우를 후순위로 미룹니다.",
  "space": "연강(연달아 강의가 있는 것)이 적은 경우를 우선시합니다.",
  "count": "강의가 있는 날 각각의 하루 총 강의 시간에 큰 편차가 없는 경우를 우선시합니다."
};

const extraInfoInv: Dictionary<string> = {
  "time": "인접한 두 강의의 강의 건물과 강의 사이 시간을 고려하여, 짧은 시간에 먼 거리를 이동해야 하는 경우를 우선시합니다.",
  "lunch": "대부분의 학생 식당의 운영 시간인 11시와 14시 사이에 30분 이상 식사를 할 수 있는 경우를 후순위로 미룹니다.",
  "empty": "공강(하루 종일 강의가 없는 날)이 없는 경우를 우선시합니다.",
  "morning": "9시 45분 이전 아침 일찍 강의가 시작되는 경우를 우선시합니다.",
  "space": "연강(연달아 강의가 있는 것)이 많은 경우를 우선시합니다.",
  "count": "하루 총 강의 시간의 편차가 큰 경우를 우선시합니다. (ex. 탑 쌓기)"
};

export const PriorityPanel = () => {

  const priority = useSelector((state: combinedStateType) => state.priorityReducer.priority);
  const [priorityCounter, setPriorityCounter] = useState<number>(0);
  const dispatch = useDispatch();

  const setPriority = (priority: Dictionary<number>) => {
    dispatch({
      type: "SET_PRIORITY",
      payload: {
        priority: priority
      }
    });
    setPriorityCounter(priorityCounter + 1);
  }

  const handleLowerPriority = (warningType: string) => {
    if (Math.abs(priority[warningType]) < Object.keys(priority).length) {
      let copy = priority;
      let changeKey = Object.keys(priority).filter(key => Math.abs(priority[key]) === Math.abs(priority[warningType]) + 1)[0];
      copy[changeKey] = copy[changeKey] > 0 ? copy[changeKey] - 1 : copy[changeKey] + 1;
      copy[warningType] = copy[warningType] > 0 ? copy[warningType] + 1 : copy[warningType] - 1;
      setPriority(copy);
    }
  }

  const handleRaisePriority = (warningType: string) => {
    if (Math.abs(priority[warningType]) > 1) {
      let copy = priority;
      let changeKey = Object.keys(priority).filter(key => Math.abs(priority[key]) === Math.abs(priority[warningType]) - 1)[0];
      copy[changeKey] = copy[changeKey] > 0 ? copy[changeKey] + 1 : copy[changeKey] - 1;
      copy[warningType] = copy[warningType] > 0 ? copy[warningType] - 1 : copy[warningType] + 1;
      setPriority(copy);
    }
  }

  const handleToZero = (warningType: string) => {
    let copy = priority;
    if (Math.abs(priority[warningType]) > 0.5) {
      let cnt = 1;
      const keys = Object.keys(priority).sort((a, b) => Math.abs(priority[a]) - Math.abs(priority[b]));
      for (const key of keys) {
        if (key !== warningType && Math.abs(priority[key]) > 0.5) {
          if (priority[key] > 0) {
            copy[key] = cnt;
          } else {
            copy[key] = -cnt;
          }
          cnt++;
        }
      }
      copy[warningType] = copy[warningType] > 0 ? 0.1 : -0.1;
    } else {
      const keys = Object.keys(priority);
      for (const key of keys) {
        if (key !== warningType && Math.abs(priority[key]) > 0.5) {
          if (priority[key] > 0) {
            copy[key] = copy[key] + 1;
          } else {
            copy[key] = copy[key] - 1;
          }
        }
      }
      copy[warningType] = copy[warningType] > 0 ? 1 : -1;
    }
    setPriority(copy);
  }

  const handleInvertEvent = (warningType: string) => {
    let copy = priority;
    copy[warningType] = -copy[warningType];
    setPriority(copy);
  }

  return (
    <div className='default-box prioritypanel-box'>
      <div className='container-title'>자동생성 우선순위 규칙</div>
        <div className="search-result-container">
          <div className="search-result-scrollable">
            {
              Object.keys(priority).sort((a, b) => Math.abs(priority[a]) - Math.abs(priority[b])).map(
                key =>
                <PriorityBox
                  warningType={key}
                  handleInvertEvent={handleInvertEvent}
                  handleLowerPriority={handleLowerPriority}
                  handleRaisePriority={handleRaisePriority}
                  handleToZero={handleToZero}
                  message={priority[key] >= 0 ? messages[key] : messagesInv[key]}
                  extraInfo={priority[key] >= 0 ? extraInfo[key] : extraInfoInv[key]}
                  level={Math.floor(Math.abs(priority[key]))}
                  value={priority[key]}/>
              )
            }
          </div>
        </div>
    </div>
  )
}
