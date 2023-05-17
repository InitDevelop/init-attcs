import "./Warning.css"

type propType = {
  warningType: string;
}

function getComponent(warningType: string) {
  if (warningType === "time") {
    return (
      <div className="time-warning-box">
        🏃‍♂️ 강의실 사이 동선이 걱정돼요!
      </div>
    )
  } else if (warningType === "empty") {
    return (
      <div className="empty-warning-box">
        😀 공강이 있어요!
      </div>
    )
  } else if (warningType === "count") {
    return (
      <div className="count-warning-box">
        ⌛ 강의가 많은 날이 있어요!
      </div>
    )
  } else if (warningType === "morning") {
    return (
      <div className="morning-warning-box">
        🥱 이른 아침수업이 있어요!
      </div>
    )
  } else if (warningType === "lunch") {
    return (
      <div className="lunch-warning-box">
        🍚 점심 먹을 시간이 부족해요!
      </div>
    )
  } else if (warningType === "space") {
    return (
      <div className="space-warning-box">
        🕒 3시간 이상 우주공강이 있어요!
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