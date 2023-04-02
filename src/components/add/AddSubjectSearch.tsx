import React, { useContext } from 'react'
import { CreationContext } from "../../App";

function AddSubjectSearch() {

  const data = useContext(CreationContext);

  return (
    <div style={{ alignItems: "center" }} className="app__creationoptions">
      <div style={{ marginBottom: "10px" }}>
        <h2 className="mid_title">과목 검색하기</h2>
        <input type="text" 
          style={{ width: "90%", marginBottom: "10px" }}
          value={data.addingSubjName} onChange={data.handleAddInputChange} className="input-1"></input>
      </div>
    </div>
  )
}

export default AddSubjectSearch;