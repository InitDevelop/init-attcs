import { useSelector } from 'react-redux';
import './AddedLectureGroupList.css';
import { combinedStateType } from '../../reducers';
import { LectureGroupBox } from './LectureGroupBox';
import { useDispatch } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import { useState } from 'react';

export const AddedLectureGroupList = () => {
  const addedLectureGroups = useSelector((state: combinedStateType) => state.autoGeneratorReducers.addedLectureGroups);
  const lectureListShownList = useSelector((state: combinedStateType) => state.autoGeneratorReducers.lectureListShownList);
  const dispatch = useDispatch();

  const [removeCount, setRemoveCount] = useState<number>(0);

  const toggleShow = (subjectID: string) => {
    dispatch(
      {
        type: "TOGGLE_SHOW",
        payload: {
          subjectID: subjectID,
        }
      }
    );
  }

  const removeLectureFromGroup = (lecture: Lecture) => {
    dispatch({
      type: "REMOVE_LECTURE_FROM_LECTURE_GROUPS",
      payload: {
        lecture: lecture,
      }
    });
    setRemoveCount(removeCount + 1);
  }

  return (
    <div className='default-box lecturegroups-container left-margin-0'>
      <div className='container-title'>담은 강좌 목록</div>
      <div className="search-result-container">
        <div className="search-result-scrollable">
          {
            addedLectureGroups.map(
              lectureGroup =>
              <LectureGroupBox
                lectureGroup={lectureGroup}
                showLectures={lectureListShownList.includes(lectureGroup.subjectID)}
                toggleShow={toggleShow}
                removeLectureFromGroup={removeLectureFromGroup}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
