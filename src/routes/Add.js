import React, { useState } from 'react';
import SubjectSelectList from '../components/SubjectSelectList'
import "../App.css";
import "./Add.css";
import AddedSubjectList from './add_components/AddedSubjectList';

function Add(props) {

  let subjectIDs = [];

  //Get Subject List
  for (let i = 0; i < props.addedSubj.length; i++) {
    if (!subjectIDs.includes(props.addedSubj[i].subj_id)) {
      subjectIDs.push(props.addedSubj[i].subj_id);
    }
  }

  return (
    <div className='app__maincontainer'>
      <div style={{width: "60%"}} className='app__parentbox'>
        <AddedSubjectList
          subjectIDs = {subjectIDs}
          addedSubj = {props.addedSubj}
        />
      </div>
      <div className='app__parentbox'>
        <SubjectSelectList 
          list_show={props.listShow}
          subj_name={props.subjName}
          addSelSubj={props.addSelSubj}
          selSubj={props.selSubj}
          handlePopSubject={props.handlePopSubject}
          isExistingSubj={props.isExistingSubj}
          allowMult={props.allowMult}
          handleKeywordChange={props.handleKeywordChange}
          keyWord={props.keyWord}
          displayPopup={props.displayPopup}
          setSubjHover={props.setSubjHover}
          setHoveredSubj={props.setHoveredSubj}
          />
      </div>

    </div>
  )
}

export default Add