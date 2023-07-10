import { useContext } from 'react'
import { CreationContext } from "../../App";
import SearchFilterMenu from '../preview/SearchFilterMenu';

function AddSubjectSearch() {
  const data = useContext(CreationContext);

  const onClickFilter = () => {
    data.displayPopup("검색 필터 지정",
      <SearchFilterMenu
        searchText={data.addingSubjName}
        setSearchText={data.setAddingSubjName}
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
    <div style={{ alignItems: "center", position: "relative" }} className='app-creation-options'>
      <div style={{ marginBottom: "10px" }}>
        <p className="large-title">과목 검색하기</p>
        <div style={{ position: "relative", display: "flex", flexDirection: "row" }}>
          <input type="text" 
            placeholder='과목 이름 검색 (교수님, 약어 검색 가능)'
            onMouseOver={onInputHover}
            onMouseLeave={onInputExit}
            value={data.addingSubjName} onChange={data.handleAddInputChange} className="input-1"/>
          <button className='filter-button' onClick={onClickFilter}>필터 적용</button>
        </div>
      </div>
    </div>
  )
}

export default AddSubjectSearch;