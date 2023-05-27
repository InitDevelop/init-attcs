import "../../App.css";
import "./../preview/MobilePreviewMenu.css"
import plusIcon from "../../img/plus.png";
import leftIcon from "../../img/left.svg";
import rightIcon from "../../img/right.svg";

type propType = {
  setCreateMenuVisible: (param: boolean) => void;
  setAddedLecturesMenuVisible: (param: boolean) => void;
  toNextScenario: () => void;
  toBackScenario: () => void;
};

function MobileCreateMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
        <div className="option-button" onClick={() => {props.toBackScenario()}}>
          <img className="option-icon" src={leftIcon} alt={"left"} width={"15px"} height={"15px"}/>
          <span className="medium-title">{" 이전 시간표"}</span>
        </div>

        <div className="option-button" style={{ textAlign: "right" }} onClick={() => {props.toNextScenario()}}>
          <span className="medium-title">{"다음 시간표 "}</span>
          <img className="option-icon" src={rightIcon} alt={"right"} width={"15px"} height={"15px"}/>
        </div>
      </div>
      <div className="option-button" onClick={() => {props.setCreateMenuVisible(true)}}>
        <img className="option-icon" src={plusIcon} alt={"add"} width={"15px"} height={"15px"}/>
        <span className="medium-title">{"자동 생성 및 시간표 정보"}</span>
      </div>
      <div className="option-button" onClick={() => {props.setAddedLecturesMenuVisible(true)}}>
        <img className="option-icon" src={plusIcon} alt={"add"} width={"15px"} height={"15px"}/>
        <span className="medium-title">{"담긴 강좌 정보"}</span>
      </div>
    </div>
  )
}

export default MobileCreateMenu;