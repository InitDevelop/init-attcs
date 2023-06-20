import { NumberPair } from "../../util/Util";
import "./Tooltip.css"

type propType = {
  tooltipPosition: NumberPair;
  scrollPosition: number;
  tooltipContent: React.ReactNode;
  mode: string;
}

function SubjTooltip(props: propType) {
  return (
    <div className='tooltip'
        style={{
          backgroundColor: "white",
          position: "absolute",
          left: props.tooltipPosition.x + 15,
          top: props.tooltipPosition.y + props.scrollPosition - 90
        }}
      >
      {props.tooltipContent}
    </div>
  )
}

export default SubjTooltip;