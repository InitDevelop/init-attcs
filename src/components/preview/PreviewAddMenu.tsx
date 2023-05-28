import "./PreviewMenu.css";
import "../../App.css";
import CreationOptions from './CreationOptions';
import SubjectSearchList from './SubjectSearchList';
import MobileCloseButton from "../global/MobileCloseButton";

type propType = {
  setAddMenuVisible: (param: boolean) => void;
  setHideHeader: (param: boolean) => void;
}

function PreviewAddMenu(props: propType) {
  return (
    <div className='preview-menu-screen'>
      <CreationOptions/>
      <SubjectSearchList/>
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
          setVisible={props.setAddMenuVisible}
          setHideHeader={props.setHideHeader}
        />
      </div>
    </div>
  )
}

export default PreviewAddMenu