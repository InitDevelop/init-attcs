import React from 'react'
import "../App.css"

function CreationOptions(props) {
  return (
    <div style={{ alignItems: "center" }} className="app__creationoptions">
      <div style={{ marginBottom: "10px" }}>
        <h2 className="mid_title">강좌 검색하기</h2>
        <input type="text" value={props.subjName} onChange={props.handleInputChange} className="input-1"></input>
      </div>
      
      <label className='label-1'>
        <input 
          className='checkbox-1'
          type="checkbox"
          checked={props.allowMult}
          onChange={props.handleAllowMultChange}
        /> 중복 허용</label><label className='label-1'> | 수강반 키워드 </label>
      <input className="input-1" style={{width: "20%"}} type="text" value={props.keyWord} onChange={props.handleKeywordChange}></input>
    </div>
  )
}

export default CreationOptions;