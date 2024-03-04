import { useDispatch } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import './CustomLectureBox.css';
import { useSelector } from 'react-redux';
import { combinedStateType } from '../../reducers';
import { getTimeNumber } from '../../util/getDateValue';

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const dates = ["월", "화", "수", "목", "금", "토"];

export const CustomLectureBox = (props: { lecture: Lecture, isEditing: boolean } ) => {

  const editingLectureTitle = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureTitle);
  const editingLectureDate = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureDate);
  const editingLectureRoom = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureRoom);
  const editingLectureStartHour = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureStartHour);
  const editingLectureStartMinute = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureStartMinute);
  const editingLectureEndHour = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureEndHour);
  const editingLectureEndMinute = useSelector((state: combinedStateType) => state.customLectureReducer.editingLectureEndMinute);
  const dispatch = useDispatch();

  const setTitle = (data: string) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureTitle: data,
          editingLectureDate: editingLectureDate,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndHour: editingLectureEndHour,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const setStartHour = (data: number) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureStartHour: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureDate: editingLectureDate,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndHour: editingLectureEndHour,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const setStartMin = (data: number) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureStartMinute: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureDate: editingLectureDate,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureEndHour: editingLectureEndHour,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const setEndHour = (data: number) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureEndHour: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureDate: editingLectureDate,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const setEndMin = (data: number) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureEndMinute: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureDate: editingLectureDate,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndHour: editingLectureEndHour,
        }
      }
    );
  }

  const setDate = (data: string) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureDate: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureRoom: editingLectureRoom,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndHour: editingLectureEndHour,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const setRoom = (data: string) => {
    dispatch(
      {
        type: "CHANGE_CUSTOM_LECTURE_DATA",
        payload: {
          editingLectureRoom: data,
          editingLectureTitle: editingLectureTitle,
          editingLectureDate: editingLectureDate,
          editingLectureStartHour: editingLectureStartHour,
          editingLectureStartMinute: editingLectureStartMinute,
          editingLectureEndHour: editingLectureEndHour,
          editingLectureEndMinute: editingLectureEndMinute,
        }
      }
    );
  }

  const handleEditOrFinishCustomLecture = () => {
    if (props.isEditing) {
      if (getTimeNumber(editingLectureStartHour, editingLectureStartMinute) >= getTimeNumber(editingLectureEndHour, editingLectureEndMinute)) {
        dispatch(
          {
            type: "SHOW_POPUP",
            payload: {
              popupTitle: "나만의 일정 설정 불가",
              popupType: "warning",
              popupContent: <span className='large'>'나만의 일정' 시작 시각은 종료 시각보다 빨라야 합니다.</span>,
              useCloseButton: true,
            }
          }
        );
      } else {
        dispatch(
          {
            type: "FINISH_EDIT_MODE",
            payload: {
              editingLectureID: props.lecture.id,
            }
          }
        );
      }
    } else {
      dispatch(
        {
          type: "SET_THIS_LECTURE_TO_EDIT_MODE",
          payload: {
            editingLectureID: props.lecture.id,
          }
        }
      );
    }
  }

  const handleDeleteCustomLecture = () => {
    dispatch(
      {
        type: "REMOVE_CUSTOM_LECTURE",
        payload: {
          lectureID: props.lecture.id,
        }
      }
    );
  }


  return (
    <div className='customlecturebox-outer'>
      <div className='customlecturebox-inner'>
        <div className='customlecturebox-inner-column'>
          <div className='customlecturebox-inner baseline'>
            <div className="darkergray bold large right-margin-10">이름</div>
            {
              props.isEditing ? 
              <input
                className='input-1'
                type='text'
                value={editingLectureTitle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='예) 스터디 / 동아리 / 과외'/>
              :
              <div className="regular large right-margin-15">{props.lecture.subjectTitle}</div>
            }
          </div>
          <div className='customlecturebox-inner top-margin-10 baseline'>
            <div className="darkergray bold large right-margin-10">시간</div>
            {
              props.isEditing ? 
              <>
                <select className='select right-margin-10' value={editingLectureDate} onChange={(e) => setDate(e.target.value)}>
                  {
                    dates.map(date => <option className='large' value={date}>{date}</option>)
                  }
                </select>
                <span className='regular large right-margin-10'>요일</span>
                <select className='select right-margin-10' value={editingLectureStartHour} onChange={(e) => setStartHour(parseInt(e.target.value))}>
                  {
                    hours.map(hour => <option className='large' value={hour}>{hour}</option>)
                  }
                </select>
                <span className='regular large right-margin-10'>시</span>
                <select className='select right-margin-10' value={editingLectureStartMinute} onChange={(e) => setStartMin(parseInt(e.target.value))}>
                  {
                    minutes.map(minute => <option className='large' value={minute}>{minute}</option>)
                  }
                </select>
                <span className='regular large right-margin-10'>분부터</span>
                <select className='select right-margin-10' value={editingLectureEndHour} onChange={(e) => setEndHour(parseInt(e.target.value))}>
                  {
                    hours.map(hour => <option className='large' value={hour}>{hour}</option>)
                  }
                </select>
                <span className='regular large right-margin-10'>시</span>
                <select className='select right-margin-10' value={editingLectureEndMinute} onChange={(e) => setEndMin(parseInt(e.target.value))}>
                  {
                    minutes.map(minute => <option className='large' value={minute}>{minute}</option>)
                  }
                </select>
                <span className='regular large right-margin-10'>분까지</span>
              </>
              :
              <div className="regular large right-margin-10">{props.lecture.time}</div>
            }
          </div>
          <div className='customlecturebox-inner top-margin-10 baseline'>
            <div className="darkergray bold large right-margin-10">장소</div>
            {
              props.isEditing ? 
              <input
                className='input-1'
                type='text'
                value={editingLectureRoom}
                onChange={(e) => setRoom(e.target.value)}
                placeholder='예) 301-108'/>
              :
              <div className="regular large right-margin-15">{props.lecture.lectureRoom}</div>
            }
          </div>
        </div>
        <div className='customlecturebox-right'>
          <button className="button-blue tiny-button right-margin-10" onClick={handleEditOrFinishCustomLecture}>
            {props.isEditing ? "수정 완료" : "수정하기"}
          </button>
          {
            !props.isEditing && <button className="button-red tiny-button" onClick={handleDeleteCustomLecture}>제거하기</button>
          }
        </div>
      </div>
    </div>
  )
}
