import React, { useState } from 'react';
import "../App.css";
import "../css/AppTable.css";
import "./Add.css";
import AddedSubjectList from './add_components/AddedSubjectList';
import AddSubjectSearch from './add_components/AddSubjectSearch';
import AddSubjectSearchList from './add_components/AddSubjectSearchList';
import SubjectSearchList from '../components/SubjectSearchList';
import LectureSearchList from './add_components/LectureSearchList';

function Add(props) {
  return (
    <div className='app__mainContainer'>
      <div className='app__parentContainer' style={{ width: "25%" }}>
        <AddSubjectSearch
          handleInputChange={props.handleAddInputChange}
          subjName={props.addingSubjName}
          />
        <AddSubjectSearchList 
          subj_name          = {props.addingSubjName}
          clickedSubject     = {props.clickedSubject}
          setClickedSubject  = {props.setClickedSubject}
          displayPopup       = {props.displayPopup}
          />
      </div>
      <div className='app__parentContainer'>
        <LectureSearchList
          keyWord = {props.keyWord}
          handleKeywordChange = {props.handleKeywordChange}
          subj_id = {props.clickedSubject}

          addSubject      = {props.addSubject}
          popSubject      = {props.popSubject}

          setSubjHover    = {props.setSubjHover}
          setHoveredSubj  = {props.setHoveredSubj}
          
          isExistingSubj  = {props.isExistingSubj}

          displayPopup    = {props.displayPopup}
        />
      </div>
      <div className='app__parentContainer' style={{ width: "35%" }}>

      </div>
    </div>
  )
}

export default Add
