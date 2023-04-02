import React, { useContext } from 'react';
import { CreationContext } from "../App.tsx";
import AddedSubjectList from '../components/add/AddedSubjectList.tsx';
import AddSubjectSearch from '../components/add/AddSubjectSearch.tsx';
import AddSubjectSearchList from '../components/add/AddSubjectSearchList.tsx';
import LectureSearchList from '../components/add/LectureSearchList.tsx';

function Add() {

  const data = useContext(CreationContext);

  return (
    <div className='app__mainContainer'>
      <div className='app__parentContainer'>
        <AddSubjectSearch/>
        <AddSubjectSearchList/>
      </div>
      <div className='app__parentContainer'>
        <LectureSearchList/>
      </div>
      <div className='app__parentContainer'>
        <AddedSubjectList/>
      </div>
    </div>
  )
}

export default Add;
