import "../../App.css";
import "./../preview/MobilePreviewMenu.css"
import leftIcon from "../../img/left.svg";
import plusIcon from "../../img/plus.png";
import rightIcon from "../../img/right.svg";

type propType = {
  toNextScenario: () => void;
  toBackScenario: () => void;
};

function MobileCreateMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", margin: "5px 10px 20px 10px" }}>
        <div className="option-button" onClick={() => {props.toBackScenario()}}>
          <img className="option-icon" src={leftIcon} alt={"left"} width={"15px"} height={"15px"}/>
          <span className="medium-title">{" 이전 시간표"}</span>
        </div>

        <div className="option-button" style={{ textAlign: "right" }} onClick={() => {props.toNextScenario()}}>
          <span className="medium-title">{"다음 시간표 "}</span>
          <img className="option-icon" src={rightIcon} alt={"right"} width={"15px"} height={"15px"}/>
        </div>
      </div>
    </div>
  )
}

export default MobileCreateMenu;