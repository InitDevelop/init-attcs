import "./Warning.css"

type propType = {
  warningType: string;
}

function getComponent(warningType: string) {
  if (warningType === "time") {
    return (
      <div className="time-warning-box">
        <strong>[동선 주의!]</strong> 강의실 사이 거리가 멀어요!🏃‍♂️⌚
      </div>
    )
  } else if (warningType === "empty") {
    return (
      <div className="empty-warning-box">
        <strong>[공강!]</strong> 와! 공강이 있어요! 😀
      </div>
    )
  }
}

function Warning(props: propType) {
  return (
    <>{getComponent(props.warningType)}</>
  )
}

export default Warning