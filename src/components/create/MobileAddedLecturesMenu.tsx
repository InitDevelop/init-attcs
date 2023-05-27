import "./../preview/PreviewMenu.css";
import "../../App.css";
import MobileCloseButton from "../global/MobileCloseButton";
import AddedSubjectList from "../add/AddedSubjectList";

type propType = {
  setCreateMenuVisible: (param: boolean) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function MobileAddedLecturesMenu(props: propType) {
  return (
    <div className='create-menu-screen'>
      <div className='app-parent-container'>
        <AddedSubjectList
          updateCount={props.updateCount}
          setUpdateCount={props.setUpdateCount}/>
      </div>
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
          setVisible={props.setCreateMenuVisible}
        />
      </div>
    </div>
  )
}

export default MobileAddedLecturesMenu;