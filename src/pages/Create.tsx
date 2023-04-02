import React, { useContext } from 'react'
import { CreationContext } from "../App.tsx";
import AddedSubjectList from '../components/add/AddedSubjectList.tsx';

function Create() {

  const data = useContext(CreationContext);

  return (
    <div className='app__mainContainer'>
      <div className='app__parentContainer'>
        <AddedSubjectList/>
      </div>
      <div className='app__parentContainer'>

      </div>
      <div className='app__parentContainer'>

      </div>
    </div>
  )
}

export default Create;