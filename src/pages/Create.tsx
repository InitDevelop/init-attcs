import React, { useContext } from 'react'
import { CreationContext } from "../App";
import AddedSubjectList from '../components/add/AddedSubjectList';
import { printScenarios } from '../components/create/CreateScenarios';
import TimeTable from '../components/preview/TimeTable';

function Create() {

  const data = useContext(CreationContext);

  return (
    <div className='app__mainContainer'>
      <div className='app__parentContainer'>
        <button className='button-0' onClick={() => {printScenarios(data.lectureGroups)}}>Create</button>
      </div>
      <div className='app__parentContainer'>
      </div>
      <div className='app__parentContainer'>

      </div>
    </div>
  )
}

export default Create;