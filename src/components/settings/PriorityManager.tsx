import { useContext } from 'react'
import '../../css/AppTable.css';
import '../../App.css';
import '../../AppMobile.css';
import { CreationContext } from "../../App";
import PriorityBox from "./PriorityBox";
import { Dictionary } from '../../util/Util';

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

const moreInfo: Dictionary<string> = {
  "time": "인접한 두 강의의 강의 건물과 강의 사이 시간을 고려하여, 짧은 시간에 먼 거리를 이동해야 하는 경우를 후순위로 미룹니다.",
  "lunch": "대부분의 학생 식당의 운영 시간인 11시와 14시 사이에 60분 이상 식사를 할 수 있는 경우를 우선시합니다.",
  "empty": "공강(하루 종일 강의가 없는 날)이 가능한 경우를 우선시합니다.",
  "morning": "9시 45분 이전 아침 일찍 강의가 시작되는 경우를 후순위로 미룹니다.",
  "space": "연강(연달아 강의가 있는 것)이 적은 경우를 우선시합니다.",
  "count": "강의가 있는 날 각각의 하루 총 강의 시간에 큰 편차가 없는 경우를 우선시합니다."
};

const moreInfoInv: Dictionary<string> = {
  "time": "인접한 두 강의의 강의 건물과 강의 사이 시간을 고려하여, 짧은 시간에 먼 거리를 이동해야 하는 경우를 우선시합니다.",
  "lunch": "대부분의 학생 식당의 운영 시간인 11시와 14시 사이에 60분 이상 식사를 할 수 있는 경우를 후순위로 미룹니다.",
  "empty": "공강(하루 종일 강의가 없는 날)이 없는 경우를 우선시합니다.",
  "morning": "9시 45분 이전 아침 일찍 강의가 시작되는 경우를 우선시합니다.",
  "space": "연강(연달아 강의가 있는 것)이 많은 경우를 우선시합니다.",
  "count": "하루 총 강의 시간의 편차가 큰 경우를 우선시합니다. (ex. 탑 쌓기)"
};

type propType = {
  updateCount: number;
  setUpdateCount: (param: number) => void;
};

function PriorityManager(props: propType) {
  const data = useContext(CreationContext);

  return (
    <div className="appTable__container" style={{ whiteSpace: "pre-wrap" }}>
      {!data.isMobile && <p className="large-title">자동생성 우선순위 규칙</p>}
      <div className={!data.isMobile ?
        "appTable__scrollContainer" : "appTable__scrollContainer-no-title"}>
        <div className="prioritybox"><p style={{ color: "darkred", fontWeight: "800" }}>
          "시간표 자동 생성하기" 버튼을 다시 클릭해야 변경사항이 반영됩니다.</p></div>
        {
          Object.keys(data.priority).sort((a, b) => Math.abs(data.priority[a]) - Math.abs(data.priority[b])).map(
            key => (
              <PriorityBox
                key={key}
                updateCount={props.updateCount}
                setUpdateCount={props.setUpdateCount}
                message={data.priority[key] >= 0 ? messages[key] : messagesInv[key]}
                moreInfo={data.priority[key] >= 0 ? moreInfo[key] : moreInfoInv[key]}
                priorities={data.priority}
                warningType={key}
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