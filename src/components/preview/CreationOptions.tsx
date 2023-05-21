import { useContext } from 'react'
import "../../App.css"
import { PreviewContext } from "../../App";
import { PreviewSearchLectureHelp } from '../global/Information';

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
                style={{ width: "90%", marginBottom: "10px" }}
                value={data.searchText} onChange={data.handleInputChange} className="input-1"></input>
            </div>
            </div>
          )
        }
      }
    </PreviewContext.Consumer>
  )
}

export default CreationOptions;