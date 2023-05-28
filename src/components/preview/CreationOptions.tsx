import { useContext } from 'react'
import "../../App.css"
import "../../css/AppTable.css"
import { PreviewContext } from "../../App";

function CreationOptions() {
  const data = useContext(PreviewContext);
  return (
    <PreviewContext.Consumer>
      {
        () => {
          return (
            <div style={{ alignItems: "center", position: "relative" }} className='app-creation-options'>
            <div style={{ marginBottom: "10px" }}>
              <p className="large-title">강좌 검색하기</p>
              <input type="text" 
                style={{  width: "100%",
                          marginBottom: "10px" }}
                value={data.searchText}
                placeholder='강좌 이름 입력 (교수님, 약어 검색 가능)'
                onChange={data.handleInputChange} className="input-1"></input>
            </div>
            </div>
          )
        }
      }
    </PreviewContext.Consumer>
  )
}

export default CreationOptions;