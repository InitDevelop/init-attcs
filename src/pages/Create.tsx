import { useEffect, useState } from 'react';
import { AddedLectureGroupList } from '../components/add/AddedLectureGroupList';
import { AutoCreatePanel } from '../components/create/AutoCreatePanel';
import { Timetable } from '../components/global/Timetable';
import { Lecture, blankLecture } from '../types/Lecture';
import './Create.css';
import { Scenario } from '../types/Scenario';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { combinedStateType } from '../reducers';

export const Create = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCombinations, setTotalCombinations] = useState<number>(1);
  const [currentCombination, setCurrentCombination] = useState<number>(0);
  const [validCombinations, setValidCombinations] = useState<number>(0);

  const scenarios = useSelector((state: combinedStateType) => state.scenarioReducer.scenarios);
  const scenarioNumber = useSelector((state: combinedStateType) => state.scenarioReducer.scenarioNumber);
  const dispatch = useDispatch();

  const setScenarios = (scenarios: Scenario[]) => {
    dispatch(
      {
        type: "SET_SCENARIOS",
        payload: {
          scenarios: scenarios,
        }
      }
    );
  }

  const setScenarioNumber = (value: number) => {
    dispatch(
      {
        type: "SET_SCENARIO_NUMBER",
        payload: {
          scenarioNumber: value,
        }
      }
    );
  }

  const setRelatedLectures = (lectures: Lecture[]) => {
    dispatch(
      {
        type: "SET_RELATED_LECTURES",
        payload: {
          relatedLectures: lectures,
        }
      }
    );
  }

  useEffect(() => {
    if (scenarios.length > 0) {
      let relatedLectures: Lecture[] = [];
      for (let i = 0; i < scenarios[scenarioNumber].shareTimeLectures.length; i++) {
        relatedLectures.push(...scenarios[scenarioNumber].shareTimeLectures[i]);
      }
      setRelatedLectures(relatedLectures);
    }
  }, [scenarioNumber, isLoading]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'ArrowRight') {
        if (scenarioNumber < scenarios.length - 1) {
          setScenarioNumber(scenarioNumber + 1);
        }
      } else if (event.key === 'ArrowLeft') {
        if (scenarioNumber > 0) {
          setScenarioNumber(scenarioNumber - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className='create-container'>
      <div className='create-container-inner with-left-padding'>
        <AddedLectureGroupList/>
      </div>
      <div className='create-container-inner'>
        <AutoCreatePanel
          setCurrentCombination={setCurrentCombination}
          setIsLoading={setIsLoading}
          setTotalCombinations={setTotalCombinations}
          setValidCombinations={setValidCombinations}
          setScenarios={setScenarios}/>
      </div>
      <div className='create-container-inner'>
        {
          scenarios.length > 0 ?
          <Timetable lectures={scenarios[scenarioNumber].lectures} hoveredLecture={blankLecture} isHovered={false}/> :
          <Timetable lectures={[]} hoveredLecture={blankLecture} isHovered={false}/>
        }
      </div>
    </div>
  )
}
