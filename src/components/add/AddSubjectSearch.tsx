import { useContext } from 'react'
import { CreationContext } from "../../App";

function AddSubjectSearch() {

  const data = useContext(CreationContext);

  return (
    <div style={{ alignItems: "center", position: "relative" }} className='app-creation-options'>
      <div style={{ marginBottom: "10px" }}>
        <p className="large-title">과목 검색하기</p>
        <input type="text" 
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder='과목 이름 검색 (교수님, 약어 검색 가능)'
          value={data.addingSubjName} onChange={data.handleAddInputChange} className="input-1"></input>
      </div>
    </div>
  )
}

export default AddSubjectSearch;