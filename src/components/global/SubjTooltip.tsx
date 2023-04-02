import React from 'react'
import "../../css/Tooltip.css"

function SubjTooltip(props) {
  return (
    <div className='tooltip'
        style={{
          backgroundColor: "white",
          position: "absolute",
          left: props.tooltipPosition.x + 15,
          top: props.tooltipPosition.y + props.scrollPosition + 20
        }}
      >
      {props.tooltipContent}
      <br></br>
      {
        (props.mode === "preview") && (props.tooltipContent.split("\n").length > 1) && (
          <span style={{color: "darkred"}}>강좌의 시간이 겹칩니다!</span>
        )
      }
    </div>
  )
}

export default SubjTooltip;