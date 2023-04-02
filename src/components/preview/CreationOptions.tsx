import React, { useContext } from 'react'
import "../../App.css"
import { PreviewContext } from "../../App.tsx";

function CreationOptions() {

  const data = useContext(PreviewContext);

  return (
    <PreviewContext.Consumer>
      { () => {
        return (
          <div style={{ alignItems: "center" }} className="app__creationoptions">
          <div style={{ marginBottom: "10px" }}>
            <h2 className="mid_title">강좌 검색하기</h2>
            <input type="text" 
              style={{ width: "90%", marginBottom: "10px" }}
              value={data.searchText} onChange={data.handleInputChange} className="input-1"></input>
          </div>
          </div>
        )
      } }
    </PreviewContext.Consumer>
  )
}

export default CreationOptions;