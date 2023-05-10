import React, { createContext, useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import { CreationContext, PreviewContext } from "../../App";
import PriorityBox from "./PriorityBox";

const messages = [
  ["time", "이동 동선 짧게"],
  ["lunch", "점심 시간 확보"],
  ["empty", "공강 있게"],
  ["morning", "이른 아침 수업 없게"],
  ["space", "우주공강 없게"],
  ["count", "하루 총 수업시간 짧게"]
];

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;
};

function PriorityManager(props: propType) {
  const data = useContext(CreationContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      <span className="large-title">자동생성 우선순위 설정</span>
      <div className="appTable__scrollContainer">
        {
          [0, 1, 2, 3, 4, 5].map(
            n => (
              <PriorityBox
                updateCount={props.updateCount}
                setUpdateCount={props.setUpdateCount}
                message={messages.filter(obj => obj[0] === data.priority[n])[0][1]}
                priorities={data.priority}
                warningType={data.priority[n]}
                setPriority={data.setPriority}
              />
            )
          )
        }
      </div>
    </div>
    )
}

export default PriorityManager;