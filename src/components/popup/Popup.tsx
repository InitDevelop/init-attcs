import React from 'react';
import './Popup.css';
import '../../App.css';
import { useDispatch } from 'react-redux';
import { LectureInformationTable } from './LectureInformationTable';
import { Lecture } from '../../types/Lecture';

const Popup = (props: { title: string, content: React.ReactNode, displayCloseButton: boolean, type: string, lectures: Lecture[] }) => {
  
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch({
      type: "SET_DISPLAY_POPUP",
      payload: {
        displayPopup: false,
      }
    });
    dispatch({
      type: "SET_DISPLAY_POPUP",
      payload: {
        useCloseButton: true,
      }
    });
  }

  return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='container-title'>{props.title}</div>
        {
          (props.type === 'lectures add' || props.type === 'lectures remove' || props.type === 'lectures') &&
          props.lectures.map(
            lecture =>
            <div className='top-margin-20' style={{ width: "100%" }}>
              <LectureInformationTable lecture={lecture} useRemove={props.type === 'lectures remove'} useAdd={props.type === 'lectures add'}/>
            </div>
          )
        }
        <div className='top-margin-20'>{props.content}</div>
        {
          props.displayCloseButton &&
          <button className='button-blue top-margin-20' onClick={handleButtonClick}>닫기</button>
        }
      </div>
    </div>
  );
}

export default Popup