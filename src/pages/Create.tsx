import { useContext, useEffect, useRef, useState } from 'react'
import { CreationContext } from "../App";
import "../App.css"
import TimeTable from '../components/preview/TimeTable';
import { blankLecture, getHoveredTimeTableSlots, getTimeTableSlots, lecture } from '../interfaces/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';

function Create() {
  const [updateCount, setUpdateCount] = useState<number>(0);
  const data = useContext(CreationContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const prevPropsRef = useRef(data.scenarioNumber);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    if (prevProps !== data.scenarioNumber) {
      let relatedLectures: lecture[] = [];
      for (let i = 0; i < data.scenarios[data.scenarioNumber].shareTimeLectures.length; i++) {
        relatedLectures.push(...data.scenarios[data.scenarioNumber].shareTimeLectures[i]);
      }
      data.setRelatedLectures(relatedLectures);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'ArrowRight') {
        if (data.scenarioNumber < data.scenarios.length - 1) {
          data.setScenarioNumber(data.scenarioNumber + 1);
        }
      } else if (event.key === 'ArrowLeft') {
        if (data.scenarioNumber > 0) {
          data.setScenarioNumber(data.scenarioNumber - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    !data.isMobile ?
    <div className='app-main-container'>
      <div className='app-parent-container'>
      {
        (data.scenarios.length > 0) ? (
          <TimeTable
            isMobile={data.isMobile}
            lectures={data.scenarios[data.scenarioNumber].lectures}
            subjHover={false}
            timeSlots={getTimeTableSlots(data.scenarios[data.scenarioNumber].lectures)}
            hoveredTimeSlots={getHoveredTimeTableSlots(data.subjHover, blankLecture)}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}  
            displayPopup={data.displayPopup} 
          />
        ) : (
          <div className="appTable__container">
            <p className='large-title'>시간표가 아직 생성되지 않았습니다.</p>
          </div>
        )
      }
      </div>
      <div className='app-parent-container'>
        <CreationViewPanel/>
      </div>
      <div className='app-parent-container'>
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      </div>
    </div>
    :
    <div className='app-main-container'>
      
    </div>
  )
}

export default Create;