import "./../preview/PreviewMenu.css";
import "../../App.css";
import MobileCloseButton from "../global/MobileCloseButton";
import AddSubjectSearch from "./AddSubjectSearch";
import AddSubjectSearchList from "./AddSubjectSearchList";
import LectureSearchList from "./LectureSearchList";
import { lecture } from "../../interfaces/Lecture";

type propType = {
  setAddMenuVisible: (param: boolean) => void;
  setHideHeader: (param: boolean) => void;
  selectedLectures: lecture[];
  setSelectedLectures: (param: lecture[]) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
  selectedDates: number[];
  setSelectedDates: (param: number[]) => void;
  selectedOption: string;
  setSelectedOption: (param: string) => void;
}

function MobileAddLectureMenu(props: propType) {
  return (
    <div className='add-menu-screen'>
      <div className='app-parent-container'>
        <AddSubjectSearch/>
        <AddSubjectSearchList/>
      </div>
      <div style={{ marginTop: "20px" }}/>
      <div className='app-parent-container'>
        <LectureSearchList
          selectedLectures={props.selectedLectures}
          setSelectedLectures={props.setSelectedLectures}
          updateCount={props.updateCount}
          setUpdateCount={props.setUpdateCount}
          setSelectedDates={props.setSelectedDates}
          selectedDates={props.selectedDates}
          selectedOption={props.selectedOption}
          setSelectedOption={props.setSelectedOption}/>
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
          setVisible={props.setAddMenuVisible}
          setHideHeader={props.setHideHeader}
        />
      </div>
    </div>
  )
}

export default MobileAddLectureMenu;