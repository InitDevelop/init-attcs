import { useSelector } from "react-redux"
import { TimeSlot } from "../../types/TimeSlot"
import { combinedStateType } from "../../reducers"
import { isTimeIntersect } from "../../types/Scenario"


const getTooltipStyle = (item: TimeSlot, containsSaturday: boolean): React.CSSProperties => {
  if (item.startHour >= 16) {
    if (item.date >= 3) {
      return (
        {
          position: "absolute",
          bottom: `calc(100% - ${item.topPosition})`,
          right: containsSaturday ? `calc(100% - ${item.leftPosition} - 16%)` : `calc(100% - ${item.leftPosition} - 18.5%)`,
        }
      )
    } else {
      return (
        {
          position: "absolute",
          bottom: `calc(100% - ${item.topPosition})`,
          left: item.leftPosition,
        }
      )
    }
  } else {
    if (item.date >= 3) {
      return (
        {
          position: "absolute",
          top: `calc(${item.topPosition} + ${item.height})`,
          right: containsSaturday ? `calc(100% - ${item.leftPosition} - 16%)` : `calc(100% - ${item.leftPosition} - 18.5%)`,
        }
      )
    } else {
      return (
        {
          position: "absolute",
          top: `calc(${item.topPosition} + ${item.height})`,
          left: item.leftPosition,
        }
      )
    }
  }
}

export const PreviewTooltip = (props: { item: TimeSlot, timeSlots: TimeSlot[] }) => {
  const addedLectures = useSelector((state: combinedStateType) => state.addedLecturesReducer.addedLectures);
  const containsSaturday = addedLectures.filter(l => l.time.includes("토")).length > 0;

  let intersectFlag: boolean = false;
  let content = props.item.subjectTitle;
  for (let i = 0; i < props.timeSlots.length; i++) {
    if (props.item.id === props.timeSlots[i].id) {
      continue;
    }
    if (props.item.date === props.timeSlots[i].date) {
      if (isTimeIntersect(
        props.item.startTime, props.item.endTime, props.timeSlots[i].startTime, props.timeSlots[i].endTime)) {
          content += ("\n" + props.timeSlots[i].subjectTitle);
          intersectFlag = true;
      }
    }
  }
  return (
    <div style={{ textAlign: props.item.date >= 3 ? "right" : "left"}}>
      {content + "\n"}
      {!intersectFlag && <span style={{ fontWeight: "400" }}>{props.item.slotRoom}</span>}
      {intersectFlag && (
        <span style={{ color: "darkred", fontWeight: "800" }}>{"\n"}강좌의 시간이 겹칩니다!</span>
      )}
    </div>
  );
}

export const CreateTooltip = () => {
  const scenarios = useSelector((state: combinedStateType) => state.scenarioReducer.scenarios);
  const scenarioNumber = useSelector((state: combinedStateType) => state.scenarioReducer.scenarioNumber);
  const containsSaturday = scenarios[scenarioNumber].lectures.filter(l => l.time.includes("토")).length > 0;
}