import React, { useState } from 'react'
import "../App.css"

function CreationOptions(props) {

  return (
    <div>
      <h2 className="mid_title">강좌 검색하기</h2>
      <input type="text" value={props.subjName} onChange={props.handleInputChange} className="input-1"></input>
      {"\t\t"}
      <input 
        className='checkbox-1'
        type="checkbox"
        checked={props.allowMult}
        onChange={props.handleAllowMultChange}
      />
      <label className='label-1'> 교과목명 중복 허용</label>
      <div style={{ marginTop: "10px" }}></div>
      <label className='label-1'>수강반 제한 키워드&nbsp;&nbsp;</label>
      <input className="input-1" type="text" value={props.keyWord} onChange={props.handleKeywordChange}></input>
    </div>
  )
}

export default CreationOptions;