import { Lecture } from '../../types/Lecture';
import { AddLectureBox } from './AddLectureBox';
import './SubjectBox.css';
import './AddSearchResultBox.css';
import { useSelector } from 'react-redux';
import { combinedStateType } from '../../reducers';
import { useDispatch } from 'react-redux';

export const AddSearchLectureList = (
  props: {
    selectedSubjectID: string,
    lectureList: Lecture[],
    selectedLectureList: Lecture[],
    removeLectureFromList: (param: Lecture) => void,
    addLectureToList: (param: Lecture) => void,
    setSelectedLectureList: (param: Lecture[]) => void,
  } ) => {

  const addedLectureGroups = useSelector((state: combinedStateType) => state.autoGeneratorReducers.addedLectureGroups);
  const dispatch = useDispatch();

  const isIncludedInGroups = (lecture: Lecture) => {
    for (const lg of addedLectureGroups) {
      if (lg.subjectID === lecture.subjectID) {
        for (const l of lg.lectures) {
          if (l.lectureNumber === lecture.lectureNumber)
            return true;
        }
      }
    }
    return false;
  }

  const isIncludedInList = (lecture: Lecture) => {
    for (const l of props.selectedLectureList) {
      if (l.id === lecture.id)
        return true;
    }
    return false;
  }

  const handleSelectButtonClick = () => {
    if ((props.selectedLectureList.length === props.lectureList.length) && props.lectureList.length > 0) {
      props.setSelectedLectureList([]);
    } else {
      props.setSelectedLectureList(props.lectureList);
    }
  }

  const handleAddButtonClick = () => {
    for (let i = 0; i < props.selectedLectureList.length; i++) {
      dispatch(
        {
          type: "ADD_LECTURE_TO_LECTURE_GROUPS",
          payload: {
            lecture: props.selectedLectureList[i]
          }
        }
      );
    }
    props.setSelectedLectureList([]);
  }

  return (
    <div className='default-box search-result-box left-margin-0'>
      <div className='container-title'>강좌 목록</div>
      <div className="search-result-container">
        <div className="search-result-scrollable">
          {
            props.lectureList.map(lecture => 
              <AddLectureBox
                lecture={lecture}
                selectedLectureList={props.selectedLectureList}
                addLectureToList={props.addLectureToList}
                removeLectureFromList={props.removeLectureFromList}
                isIncludedInGroups={isIncludedInGroups}
                isIncludedInList={isIncludedInList}
                />
            )
          }
        </div>
      </div>
      <div className='select-lectures-box'>
        <div className='select-lectures-box-left'>
          <button className={'button-gray extralarge top-margin-10'} onClick={handleSelectButtonClick}>
            {
              ((props.selectedLectureList.length === props.lectureList.length) && props.lectureList.length > 0) ?
              "전체 선택 해제" : "전체 선택하기"
            }
          </button>
        </div>
        <div className='select-lectures-box-right'>
          <button className={'button-blue extralarge top-margin-10'}
            disabled={props.selectedLectureList.filter(item => !isIncludedInGroups(item)).length === 0}
            onClick={handleAddButtonClick}>
            <span>선택한 강좌 <strong>{props.selectedLectureList.filter(item => !isIncludedInGroups(item)).length}개</strong> 모두 담기</span>
          </button>
        </div>
      </div>
    </div>
  )
}
