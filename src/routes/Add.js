import React, { useState } from 'react';
import SubjectSelectList from '../components/SubjectSelectList'
import "../App.css";
import "../css/AppTable.css";
import "./Add.css";
import AddedSubjectList from './add_components/AddedSubjectList';
import AddSubjectSearch from './add_components/AddSubjectSearch';
import AddSubjectSearchList from './add_components/AddSubjectSearchList';

function Add(props) {
  return (
    <div className='app__mainContainer'>
      <div style={{width: "60%"}} className='app__parentbox'>
      </div>
      <div className='app__parentContainer'>
        <AddSubjectSearch
          handleInputChange={props.handleAddInputChange}
          subjName={props.addingSubjName}
          />
        <AddSubjectSearchList 
          subj_name={props.addingSubjName}
          />
      </div>

    </div>
  )
}

export default Add

/*
        <SubjectSearchList 
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
*/