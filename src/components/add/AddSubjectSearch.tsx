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

  return (
    <div style={{ alignItems: "center", position: "relative" }} className='app-creation-options'>
      <div style={{ marginBottom: "10px" }}>
        <p className="large-title">과목 검색하기</p>
        <div style={{ position: "relative", display: "flex", flexDirection: "row" }}>
          <input type="text" 
            placeholder='과목 이름 검색 (교수님, 약어 검색 가능)'
            value={data.addingSubjName} onChange={data.handleAddInputChange} className="input-1"/>
          <button className='filter-button' onClick={onClickFilter}>필터 적용</button>
        </div>
      </div>
    </div>
  )
}

export default AddSubjectSearch;