import { useContext, useEffect, useState } from 'react'
import { CreationContext } from "../App";
import TimeTable from '../components/preview/TimeTable';
import { blankLecture, lecture } from '../interfaces/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';
import ScenariosDisplay from '../components/create/ScenariosDisplay';

/*
const getIndex = (n: number, d: number) => {
  if (n >= 0) {
    return n % d;
  } else {
    return Math.abs(n) % d + (n % d);
  }
}
*/

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
    <div className='app__mainContainer'
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
      <div className='app__parentContainer'>
      {
        (data.scenarios.length > 0) ? (
          <TimeTable
          lectures={data.scenarios[data.scenarioNumber].lectures}
          subjHover={false}
          hoveredSubj={blankLecture}
          setShowTooltip={data.setShowTooltip}
          setTooltipContent={data.setTooltipContent}  
          displayPopup={data.displayPopup} 
          />
        ) : (
          <div className='appTable__container'>
            <h2 style={{ fontWeight: "400" }}>시간표가 아직 생성되지 않았습니다.</h2>
            <h2>생성 버튼을 눌러주세요!</h2>
          </div>
        )
      }
      </div>
      <div className='app__parentContainer'>
        <CreationViewPanel/>
      </div>
      <div className='app__parentContainer'>
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      </div>
    </div>
  )
}

export default Create;