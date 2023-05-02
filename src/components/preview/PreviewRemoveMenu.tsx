import "./PreviewMenu.css";
import "../../App.css";
import MobileCloseButton from "../global/MobileCloseButton";
import SubjectSelectList from "./SubjectSelectList";

type propType = {
  setRemoveMenuVisible: (param: boolean) => void;
}

function PreviewRemoveMenu(props: propType) {
  return (
    <div className='preview-menu-screen'>
      <SubjectSelectList/>
      <div
        style = {
          {
            position: "absolute",
            top: "15px",
            right: "20px"
          }
        }
      >
        <MobileCloseButton
          setVisible={props.setRemoveMenuVisible}
        />
      </div>
    </div>
  )
}

export default PreviewRemoveMenu