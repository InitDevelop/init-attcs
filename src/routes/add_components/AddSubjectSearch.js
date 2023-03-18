import React from 'react'

function AddSubjectSearch(props) {
  return (
    <div style={{ alignItems: "center" }} className="app__creationoptions">
      <div style={{ marginBottom: "10px" }}>
        <h2 className="mid_title">과목 검색하기</h2>
        <input type="text" 
          style={{ width: "90%", marginBottom: "10px" }}
          value={props.subjName} onChange={props.handleInputChange} className="input-1"></input>
      </div>
    </div>
  )
}

export default AddSubjectSearch