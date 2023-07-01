import { useContext, useEffect, useState } from 'react'
import { CreationContext } from "../App";
import "../App.css"
import TimeTable from '../components/preview/TimeTable';
import { blankLecture, getAllTimeSlots, Lecture, toTimeSlots } from '../util/Lecture';
import CreationViewPanel from '../components/create/CreationViewPanel';
import AddedSubjectList from '../components/add/AddedSubjectList';
import Loading from '../components/global/Loading';
import MobileCreateMenu from '../components/create/MobileCreateMenu';
import ScenarioSummary from '../components/create/ScenarioSummary';
import Warning from '../components/create/Warning';

function Create() {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [totalCombinations, setTotalCombinations] = useState<number>(1);
  const [currentCombination, setCurrentCombination] = useState<number>(0);
  const [validCombinations, setValidCombinations] = useState<number>(0);

  const [updateCount, setUpdateCount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<number>(0);

  const data = useContext(CreationContext);

  useEffect(() => {
    if (data.scenarios.length > 0) {
      let relatedLectures: Lecture[] = [];
      for (let i = 0; i < data.scenarios[data.scenarioNumber].shareTimeLectures.length; i++) {
        relatedLectures.push(...data.scenarios[data.scenarioNumber].shareTimeLectures[i]);
      }
      data.setRelatedLectures(relatedLectures);
    }
  }, [data.scenarioNumber, isLoading]);

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
            mode='create'
            isMobile={data.isMobile}
            lectures={data.scenarios[data.scenarioNumber].lectures}
            subjHover={false}
            timeSlots={getAllTimeSlots(data.scenarios[data.scenarioNumber].lectures)}
            hoveredTimeSlots={toTimeSlots(blankLecture, 0)}
            setShowTooltip={data.setShowTooltip}
            setTooltipContent={data.setTooltipContent}  
            displayPopup={data.displayPopup}
          />
        ) : (
          <div className="appTable__container">
            <p className='large-title'>시간표가 아직 생성되지 않았거나,</p>
            <p className='large-title'>시간표 중 가능한 경우가 없습니다.</p>
            <p className='large-text'>"시간표 자동 생성하기"를 누르세요.</p>
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
    <div className='app-main-container' style={{ height: "120vh" }}>
      <MobileCreateMenu
        toNextScenario={toNextScenario}
        toBackScenario={toBackScenario}
      />
      {
        (data.scenarios.length > 0) &&
        <div style={{ marginBottom: "7px" }}>
          <p className="x-large-text" style={{ marginBottom: "5px" }}>
            <strong>{data.scenarioNumber + 1}</strong> / <strong>{data.scenarios.length}</strong>
          </p>
        </div>
      }
      <div style={{ margin: "0px 10px", textAlign: "left" }}>
        <button className={viewMode === 0 ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setViewMode(0)}>시간표</button>
        <button className={viewMode === 1 ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setViewMode(1)}>시간표 상세 정보</button>
        <button className={viewMode === 2 ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setViewMode(2)}>담은 강좌</button>
      </div>
      {
        viewMode === 0 ?
        <>
          {
            (data.scenarios.length > 0) ? (
              <TimeTable
                mode='create'
                isMobile={data.isMobile}
                lectures={data.scenarios[data.scenarioNumber].lectures}
                subjHover={false}
                timeSlots={getAllTimeSlots(data.scenarios[data.scenarioNumber].lectures)}
                hoveredTimeSlots={toTimeSlots(blankLecture, 0)}
                setShowTooltip={data.setShowTooltip}
                setTooltipContent={data.setTooltipContent}  
                displayPopup={data.displayPopup} 
              />
            ) : (
              <div className="appTable__container">
                <br/>
                <p className='large-title'>시간표가 아직 생성되지 않았거나,</p>
                <p className='large-title'>시간표 중 가능한 경우가 없습니다.</p>
                {
                  data.isMobile &&
                  <p className='large-text'>"시간표 상세 정보"에서</p>
                }
                <p className='large-text'>"시간표 자동 생성하기"를 누르세요.</p>
              </div>
            )
          }
        </>
        :
        viewMode === 1 ?
          <CreationViewPanel
            setIsLoading={setIsLoading}
            setScenarios={data.setScenarios}
            setCurrentCombination={setCurrentCombination}
            setTotalCombinations={setTotalCombinations}
            setValidCombinations={setValidCombinations}
          />
        :
        <AddedSubjectList
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}/>
      }
      <br/>
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
  )
}

export default Create;