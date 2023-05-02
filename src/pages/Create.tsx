import { useContext, useEffect, useState } from 'react'
import { CreationContext } from "../App";
import TimeTable from '../components/preview/TimeTable';
import { blankLecture, lecture } from '../interfaces/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';

function Create() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [updateCount, setUpdateCount] = useState<number>(0);
  const data = useContext(CreationContext);

  return (
    data.isMobile ?
    <div className='app-main-container'
      onKeyDown={
        (event) => {
          if (event.key === 'ArrowRight') {
            if (data.scenarioNumber < data.scenarios.length - 1) {
              data.setScenarioNumber(data.scenarioNumber + 1);

              let relatedLectures: lecture[] = [];
              for (let i = 0; i < data.scenarios[data.scenarioNumber + 1].shareTimeLectures.length; i++) {
                relatedLectures.push(...data.scenarios[data.scenarioNumber + 1].shareTimeLectures[i]);
              }
              data.setRelatedLectures(relatedLectures);
            }
          } else if (event.key === 'ArrowLeft') {
            if (data.scenarioNumber > 0) {
              data.setScenarioNumber(data.scenarioNumber - 1);

              let relatedLectures: lecture[] = [];
              for (let i = 0; i < data.scenarios[data.scenarioNumber - 1].shareTimeLectures.length; i++) {
                relatedLectures.push(...data.scenarios[data.scenarioNumber - 1].shareTimeLectures[i]);
              }
              data.setRelatedLectures(relatedLectures);
            }
          }
        }
      }
    >
      <div className='app-parent-container'>
      {
        (data.scenarios.length > 0) ? (
          <TimeTable
            isMobile={data.isMobile}
            lectures={data.scenarios[data.scenarioNumber].lectures}
            subjHover={false}
            hoveredSubj={blankLecture}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}  
            displayPopup={data.displayPopup} 
          />
        ) : (
          <div className='app-parent-container'>
            <h2 style={{ fontWeight: "400" }}>시간표가 아직 생성되지 않았습니다.</h2>
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