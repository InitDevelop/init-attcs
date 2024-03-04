import { useDispatch } from "react-redux";
import { Warning } from "../../util/Util"
import { WarningInformationTable } from "../global/WarningInformationTable";
import "./WarningBox.css"

type propType = {
  warning: Warning,
  subjectIDs: string[]
}

function getComponent(warning: Warning) {
  if (warning.warningType === "time") {
    return (
      <div className="time-warning-box" onClick={() => {}}>
      </div>
    )
  } else if (warning.warningType === "empty") {
    return (
      <div className="empty-warning-box">
        
      </div>
    )
  } else if (warning.warningType === "count") {
    return (
      <div className="count-warning-box">
        ⌛ 요일별 총 수업 시간의 편차가 커요!
      </div>
    )
  } else if (warning.warningType === "morning") {
    return (
      <div className="morning-warning-box">
        🥱 이른 아침수업이 있어요!
      </div>
    )
  } else if (warning.warningType === "lunch") {
    return (
      <div className="lunch-warning-box">
        🍚 점심 먹을 시간이 부족해요!
      </div>
    )
  } else if (warning.warningType === "space") {
    return (
      <div className="space-warning-box">
        🕒 연강이 많아요! 힘들지 않을까요?
      </div>
    )
  }
}

const getWarningText = (warningType: string) => {
  switch (warningType) {
    case "time":
      return "🏃‍♂️ 동선 주의";
    case "empty":
      return "😀 공강 존재함";
    case "count":
      return "⌛ 수업 시간 편차 큼";
    case "morning":
      return "🥱 아침 수업 존재";
    case "lunch":
      return "🍚 점심 시간 부족";
    case "space":
      return "🕒 연강 과다";
    default:
      return "";
  }
}

const WarningBox = (props: propType) => {

  const dispatch = useDispatch();

  return (
    <div className={props.warning.warningType + "-warning-box"}
      onClick={() => {
        
        dispatch({
          type: "SHOW_POPUP",
          payload: {
            popupTitle: getWarningText(props.warning.warningType),
            popupType: 'warning',
            useCloseButton: true,
            popupContent: WarningInformationTable(props.warning, props.subjectIDs),
          }
        });}
        
        
        }>
      {getWarningText(props.warning.warningType)}
    </div>
  )
}

export default WarningBox