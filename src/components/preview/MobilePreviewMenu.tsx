import "../../App.css";
import "./MobilePreviewMenu.css"
import plusIcon from "../../img/plus.png";
import minusIcon from "../../img/minus.png";

type propType = {
  setAddMenuVisible: (param: boolean) => void;
  setRemoveMenuVisible: (param: boolean) => void;
};

function MobilePreviewMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <div className="option-button" onClick={() => props.setAddMenuVisible(true)}>
        <img className="option-icon" src={plusIcon} alt={"add"} width={"15px"} height={"15px"}/>
        <span className="medium-title">{" 강좌 추가하기"}</span>
      </div>

      <div className="option-button" onClick={() => props.setRemoveMenuVisible(true)}>
        <img className="option-icon" src={minusIcon} alt={"add"} width={"15px"} height={"15px"}/>
        <span className="medium-title">{" 강좌 제거하기"}</span>
      </div>
    </div>
  )
}

export default MobilePreviewMenu