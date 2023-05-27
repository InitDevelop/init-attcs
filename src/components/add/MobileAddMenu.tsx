import "../../App.css";
import "../preview/MobilePreviewMenu.css"
import plusIcon from "../../img/plus.png";

type propType = {
  setAddMenuVisible: (param: boolean) => void;
};

function MobileAddMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <div className="option-button" onClick={() => props.setAddMenuVisible(true)}>
        <img className="option-icon" src={plusIcon} alt={"add"} width={"15px"} height={"15px"}/>
        <span className="medium-title">{" 강좌 추가하기"}</span>
      </div>
    </div>
  )
}

export default MobileAddMenu;