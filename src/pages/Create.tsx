import { useContext, useState } from 'react'
import { CreationContext } from "../App";
import TimeTable from '../components/preview/TimeTable';
import { blankLecture } from '../interfaces/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';

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

  const [updateCount, setUpdateCount] = useState<number>(0);
  const data = useContext(CreationContext);

  return (
    <div className='app__mainContainer'
      onKeyDown={
        (event) => {
          if (event.key === 'ArrowRight') {
            if (data.scenarioNumber < data.scenarios.length - 1) {
              data.setScenarioNumber(data.scenarioNumber + 1);
            }
          } else if (event.key === 'ArrowLeft') {
            if (data.scenarioNumber > 0) {
              data.setScenarioNumber(data.scenarioNumber - 1);
            }
          }
        }
      }
    >
      <div className='app__parentContainer'>
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      </div>
      <div className='app__parentContainer'>
        {
          (data.scenarios.length > 0) ? (
            <TimeTable
            lectures={data.scenarios[data.scenarioNumber].lectures}
            subjHover={false}
            hoveredSubj={blankLecture}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}   
            />
          ) : (
            <div className='appTable__container'>
              <h1 style={{ fontWeight: "400" }}>시간표가 아직 생성되지 않았습니다.</h1>
              <h1>생성 버튼을 눌러주세요!</h1>
            </div>
          )
        }
      </div>
      <div className='app__parentContainer'>
        <CreationViewPanel/>
      </div>
    </div>
  )
}

export default Create;