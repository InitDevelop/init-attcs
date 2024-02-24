import { useState } from 'react';
import { AddedLectureGroupList } from '../components/add/AddedLectureGroupList';
import { AutoCreatePanel } from '../components/create/AutoCreatePanel';
import { Timetable } from '../components/global/Timetable';
import { blankLecture } from '../types/Lecture';
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
