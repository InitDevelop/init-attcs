import React, { useContext, useEffect, useState } from 'react';
import { CreationContext } from "../App";
import AddedSubjectList from '../components/add/AddedSubjectList';
import AddSubjectSearch from '../components/add/AddSubjectSearch';
import AddSubjectSearchList from '../components/add/AddSubjectSearchList';
import LectureSearchList from '../components/add/LectureSearchList';
import { lecture } from '../interfaces/Lecture';

function Add() {

  const [selectedLectures, setSelectedLectures] = useState<lecture[]>([]);
  const data = useContext(CreationContext);

  return (
    <div className='app__mainContainer'>
      <div className='app__parentContainer'>
        <AddSubjectSearch/>
        <AddSubjectSearchList/>
      </div>
      <div className='app__parentContainer'>
        <LectureSearchList
          selectedLectures={selectedLectures}
          setSelectedLectures={setSelectedLectures}
        />
      </div>
      <div className='app__parentContainer'>
        <AddedSubjectList/>
      </div>
    </div>
  )
}

export default Add;
