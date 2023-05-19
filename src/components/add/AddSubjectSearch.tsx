import { useContext } from 'react'
import { CreationContext } from "../../App";

function AddSubjectSearch() {

  const data = useContext(CreationContext);

  return (
    <div style={{ alignItems: "center" }} className='app-creation-options'>
      <div style={{ marginBottom: "10px" }}>
        <p className="large-title">과목 검색하기</p>
        <input type="text" 
          style={{ width: "90%", marginBottom: "10px" }}
          value={data.addingSubjName} onChange={data.handleAddInputChange} className="input-1"></input>
      </div>
    </div>
  )
}

export default AddSubjectSearch;