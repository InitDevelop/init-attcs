import "../App.css";
import { useContext, useState } from 'react';
import { CreationContext } from "../App";
import AddedSubjectList from '../components/add/AddedSubjectList';
import AddSubjectSearch from '../components/add/AddSubjectSearch';
import AddSubjectSearchList from '../components/add/AddSubjectSearchList';
import LectureSearchList from '../components/add/LectureSearchList';
import { getHoveredTimeTableSlots, getTimeTableSlots, lecture } from '../interfaces/Lecture';
import TimeTable from '../components/preview/TimeTable';
import MobileAddMenu from "../components/add/MobileAddMenu";
import MobileAddLectureMenu from "../components/add/MobileAddLectureMenu";

function Add() {

  const [updateCount, setUpdateCount] = useState<number>(0);
  const [selectedLectures, setSelectedLectures] = useState<lecture[]>([]);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [isAddMenuVisible, setAddMenuVisible] = useState<boolean>(false);

  const data = useContext(CreationContext);

  return (
    !data.isMobile ?
    <div className='app-main-container'>    
      <div className='app-parent-container'>
        <AddSubjectSearch/>
        <AddSubjectSearchList/>
      </div>
      <div className='app-parent-container'>
        <LectureSearchList
          selectedLectures={selectedLectures}
          setSelectedLectures={setSelectedLectures}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates} selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}/>
      </div>
      {
        data.subjHover ?
          <div className='app-parent-container'>
          <TimeTable
            isMobile={data.isMobile}
            lectures={[...selectedLectures]}
            subjHover={data.subjHover}
            timeSlots={getTimeTableSlots([...selectedLectures])}
            hoveredTimeSlots={getHoveredTimeTableSlots(data.subjHover, data.hoveredSubj)}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}
            displayPopup={data.displayPopup}/>
          </div>
          :
          <div className='app-parent-container'>
            <AddedSubjectList
              updateCount={updateCount}
              setUpdateCount={setUpdateCount}/>
          </div>
      }
    </div>
    :
    <div className='app-main-container'>    
      <div className='app-parent-container'>
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}/>
        <MobileAddMenu
          setAddMenuVisible={setAddMenuVisible}
          setHideHeader={data.setHideHeader}
        />
      </div>
      {
        isAddMenuVisible &&
        <MobileAddLectureMenu
          selectedLectures={selectedLectures}
          setHideHeader={data.setHideHeader}
          setSelectedLectures={setSelectedLectures}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setAddMenuVisible={setAddMenuVisible}
        />
      }
    </div>


  )
}

export default Add;
