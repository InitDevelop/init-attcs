import "../App.css";
import { useContext, useState } from 'react';
import { CreationContext } from "../App";
import AddedSubjectList from '../components/add/AddedSubjectList';
import AddSubjectSearch from '../components/add/AddSubjectSearch';
import AddSubjectSearchList from '../components/add/AddSubjectSearchList';
import LectureSearchList from '../components/add/LectureSearchList';
import { Lecture, getAllTimeSlots, toTimeSlots } from '../util/Lecture';
import TimeTable from '../components/preview/TimeTable';

function Add() {

  const [updateCount, setUpdateCount] = useState<number>(0);
  const [selectedLectures, setSelectedLectures] = useState<Lecture[]>([]);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [isAddMenuVisible, setAddMenuVisible] = useState<boolean>(true);

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
            mode="add"
            isMobile={data.isMobile}
            lectures={[...selectedLectures]}
            subjHover={data.subjHover}
            timeSlots={getAllTimeSlots([...selectedLectures])}
            hoveredTimeSlots={data.subjHover ? toTimeSlots(data.hoveredSubj, 0) : []}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}
            displayPopup={data.displayPopup}
            />
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
    <div className='app-main-container' style={{ height: "100vh" }}>    
      <div style={{ margin: "10px" }}>
        <AddSubjectSearch/>
      </div>
      <AddSubjectSearchList/>
      <br/>
      <div style={{ margin: "0px 10px", textAlign: "left" }}>
        <button className={isAddMenuVisible ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setAddMenuVisible(true)}>강좌 추가하기</button>
        <button className={!isAddMenuVisible ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setAddMenuVisible(false)}>담은 강좌</button>
      </div>
      {
        isAddMenuVisible ?
        <LectureSearchList
          selectedLectures={selectedLectures}
          setSelectedLectures={setSelectedLectures}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates} selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}/>
        :
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}/>
      }
      <br/>

    </div>
  )
}

export default Add;
