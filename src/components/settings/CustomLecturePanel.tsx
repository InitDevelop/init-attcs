import { useSelector } from 'react-redux';
import { blankLecture } from '../../types/Lecture';
import { CustomLectureBox } from './CustomLectureBox';
import './CustomLecturePanel.css';
import { combinedStateType } from '../../reducers';
import { useDispatch } from 'react-redux';

export const CustomLecturePanel = () => {
  const customLectures = useSelector((state: combinedStateType) => state.customLectureReducer.customLectures);
  const editingLectureID = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureID);
  const isEditingLecture = useSelector((state: combinedStateType) => state.customLectureReducer.isEditingLecture);

  const dispatch = useDispatch();

  const handleAddCustomLecture = () => {
    dispatch(
      {
        type: "CREATE_NEW_LECTURE",
        payload: {}
      }
    );
  }

  return (
    <div className='default-box customlecture-box'>
      <div className='container-title'>나만의 일정</div>
        <div className="search-result-container">
          <div className="search-result-scrollable">
            {
              customLectures.map(
                lecture => 
                <CustomLectureBox lecture={lecture} isEditing={isEditingLecture && (lecture.id === editingLectureID)}/>
              )
            }
            <div className='customlecturebox-outer'>
              <div className='customlecturebox-inner' style={{ justifyContent: "center" }}>
                <button className="button-blue" onClick={handleAddCustomLecture}>추가하기</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
