import { useContext, useEffect, useState } from 'react'
import { CreationContext } from "../App";
import "../App.css"
import TimeTable from '../components/preview/TimeTable';
import { blankLecture, getHoveredTimeTableSlots, getTimeTableSlots, lecture } from '../interfaces/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';
import Loading from '../components/global/Loading';
import MobileCreateMenu from '../components/create/MobileCreateMenu';
import MobileCreateOptionsMenu from '../components/create/MobileCreateOptionsMenu';
import MobileAddedLecturesMenu from '../components/create/MobileAddedLecturesMenu';

function Create() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [createMenuVisible, setCreateMenuVisible] = useState<boolean>(false);
  const [addedLecturesMenuVisible, setAddedLecturesMenuVisible] = useState<boolean>(false);

  const [totalCombinations, setTotalCombinations] = useState<number>(1);
  const [currentCombination, setCurrentCombination] = useState<number>(0);
  const [validCombinations, setValidCombinations] = useState<number>(0);

  const [updateCount, setUpdateCount] = useState<number>(0);
  const data = useContext(CreationContext);

  useEffect(() => {
    if (data.scenarios.length > 0) {
      let relatedLectures: lecture[] = [];
      for (let i = 0; i < data.scenarios[data.scenarioNumber].shareTimeLectures.length; i++) {
        relatedLectures.push(...data.scenarios[data.scenarioNumber].shareTimeLectures[i]);
      }
      data.setRelatedLectures(relatedLectures);
    }
  }, [data.scenarioNumber, data]);

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

  const toNextScenario = () => {
    if (data.scenarioNumber < data.scenarios.length - 1) {
      data.setScenarioNumber(data.scenarioNumber + 1);
    }
  }

  const toBackScenario = () => {
    if (data.scenarioNumber > 0) {
      data.setScenarioNumber(data.scenarioNumber - 1);
    }
  }

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
        <CreationViewPanel
          setIsLoading={setIsLoading}
          setScenarios={data.setScenarios}
          setCurrentCombination={setCurrentCombination}
          setTotalCombinations={setTotalCombinations}
          setValidCombinations={setValidCombinations}
        />
      </div>
      <div className='app-parent-container'>
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      </div>

      {
        isLoading && (
          <Loading
            currentCombination={currentCombination}
            totalCombinations={totalCombinations}
            validCombinations={validCombinations}
          />
        )
      }
    </div>
    :
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
      <MobileCreateMenu
        setCreateMenuVisible={setCreateMenuVisible}
        setHideHeader={data.setHideHeader}
        setAddedLecturesMenuVisible={setAddedLecturesMenuVisible}
        toNextScenario={toNextScenario}
        toBackScenario={toBackScenario}
      />
      </div>
      {
        createMenuVisible && 
        <MobileCreateOptionsMenu
          setCreateMenuVisible={setCreateMenuVisible}
          setHideHeader={data.setHideHeader}
          setIsLoading={setIsLoading}
          setScenarios={data.setScenarios}
          setCurrentCombination={setCurrentCombination}
          setTotalCombinations={setTotalCombinations}
          setValidCombinations={setValidCombinations}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      }
      {
        addedLecturesMenuVisible && 
        <MobileAddedLecturesMenu
          setCreateMenuVisible={setAddedLecturesMenuVisible}
          setHideHeader={data.setHideHeader}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      }
      {
        isLoading && (
          <Loading
            currentCombination={currentCombination}
            totalCombinations={totalCombinations}
            validCombinations={validCombinations}
          />
        )
      }
      

      {/* 

       */}
    </div>
  )
}

export default Create;