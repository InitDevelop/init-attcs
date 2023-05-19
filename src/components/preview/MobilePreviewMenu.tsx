import "../../App.css";
import "./MobilePreviewMenu.css"
import plusIcon from "../../img/plus.png";
import minusIcon from "../../img/minus.png";

type propType = {
  //totalCredit: number;
  setAddMenuVisible: (param: boolean) => void;
  setRemoveMenuVisible: (param: boolean) => void;
};

function MobilePreviewMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <img className='plus-button' src={plusIcon} alt={"add"} width={"15px"} height={"15px"} onClick={() => props.setAddMenuVisible(true)}/>
      <img className='minus-button' src={minusIcon} alt={"add"} width={"15px"} height={"15px"} onClick={() => props.setRemoveMenuVisible(true)}/>
    </div>
  )
}

export default MobilePreviewMenu