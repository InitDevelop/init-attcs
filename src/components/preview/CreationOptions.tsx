import { useContext } from 'react'
import "../../App.css"
import "../../css/AppTable.css"
import { PreviewContext } from "../../App";
import SearchFilterMenu from './SearchFilterMenu';

function CreationOptions() {
  const data = useContext(PreviewContext);

  const onClickFilter = () => {
    data.displayPopup("검색 필터 지정",
      <SearchFilterMenu
        searchText={data.searchText}
        setSearchText={data.setSearchText}
      />
    );
  }

  return (
    <PreviewContext.Consumer>
      {
        () => {
          return (
            <div style={{ alignItems: "center", position: "relative" }} className='app-creation-options'>
              <p className="large-title">강좌 검색하기</p>
              <div style={{ position: "relative", display: "flex", flexDirection: "row" }}>
                <input type="text" 
                  value={data.searchText}
                  placeholder='강좌 이름 입력 (교수님, 약어 검색 가능)'
                  onChange={data.handleInputChange} className="input-1"></input>
                <button className='filter-button' onClick={onClickFilter}>필터 적용</button>
              </div>
            </div>
          )
        }
      }
    </PreviewContext.Consumer>
  )
}

export default CreationOptions;