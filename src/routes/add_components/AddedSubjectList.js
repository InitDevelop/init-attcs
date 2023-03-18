import React from 'react'
import './SubjectList.css'
import '../../App.css'
import SubjectGroup from './SubjectGroup'

function AddedSubjectList(props) {

  return (
    <div className='list__subjectlist'>
      <h2 className="mid_title">담은 과목</h2>
        <div className="table__scroll_container">
          <table className="table_borderless">
            <tbody>
              {
                props.subjectIDs.map(
                  id => {
                  <SubjectGroup
                    id = {id}
                    addedSubj = {props.addedSubj}
                    />
                  }
                )
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AddedSubjectList