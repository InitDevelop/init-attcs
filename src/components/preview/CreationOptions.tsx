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

  const onInputHover = () => {
    if (!data.isMobile) {
      data.setTooltipContent(
        <div style={{ fontWeight: "400" }}>
          <p><strong>과목명, 교수님, 과목명의 약칭</strong>뿐만 아니라,</p>
          <p><strong>요일</strong>, <strong>개설 단과대학/학과</strong>, <strong>학년</strong>, <strong>교양/전공 구분</strong>,</p>
          <p><strong>수강 분반 정보</strong>도 입력할 수 있습니다.</p>
          <br/>
          <p>ex. 4학년 컴공 전선 월요일</p>
          <p>ex. 공수1 전기</p>
        </div>
      );
      data.setShowTooltip(true);
    }
  }

  const onInputExit = () => {
    data.setShowTooltip(false);
  }


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
                onMouseOver={onInputHover}
                onMouseLeave={onInputExit}
                placeholder='강좌 이름 입력 (교수님, 약어 검색 가능)'
                onChange={data.handleInputChange} className="input-1"></input>
            </div>

            <button className='help-button' onClick={onClickFilter}>필터 적용</button>
            </div>
          )
        }
      }
    </PreviewContext.Consumer>
  )
}

export default CreationOptions;