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
                style={{  width: data.isMobile ? "100%" : "90%",
                          marginBottom: "10px" }}
                value={data.searchText}
                placeholder='과목명 / 교수님 성함 / 과목 약칭 등 입력'
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