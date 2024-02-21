import { CSSProperties } from 'react';
import { Lecture } from '../../types/Lecture';
import { getAllTimeSlots } from '../../types/TimeSlot';
import './Timetable.css';
import './TimeSlotBox.css';
import { useDispatch } from 'react-redux';

let times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
export const colors = [
  "#EC4E46",
  "#EC7946",
  "#ECB546",
  "#53B42C",
  "#0EAA94",
  "#13B5E7",
  "#1987E1",
  "#4656CE",
  "#8A57D5",
  "#BC61D9",
  "#E36DB0"
];

const getStyle = (date: number, startHour: number, startMin: number, endHour: number, endMin: number, slotOrder: number, isHovered: boolean) : CSSProperties => {
  return {
    position: 'absolute',
    backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.3)' : colors[slotOrder % colors.length],
    color: 'white',

    // borderRadius: 4,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",

    backdropFilter: isHovered ? 'blur(5px)' : '',

    boxSizing: "border-box",
    
    padding: 3,

    width: `${100 / 5.3}%`,
    left: `${100 * (date + 0.3) / 5.3}%`,
    top: `${100 * (startHour - 9 + startMin / 60 + 0.5) / 13.5}%`,
    height: `${100 * (endHour - startHour + (endMin - startMin) / 60) / 13.5}%`,
  };
}

export const Timetable = (props: {lectures: Lecture[], hoveredLecture: Lecture, isHovered: boolean}) => {
  const dispatch = useDispatch();

  const showPopup = (lecture: Lecture) => {
    dispatch({
      type: "SHOW_POPUP_LECTURES",
      payload: {
        popupTitle: lecture.subjectTitle + " (" + lecture.lectureNumber + ")",
        popupType: 'lectures remove',
        useCloseButton: true,
        popupLectures: [lecture],
      }
    });
  }
  
  return (
    <div className='default-box timetable-container'>
      <div className='table'>
        <div className='date-row'>
          <div className='corner-cell'/>
          <div className='date-cell'><span className='date-inner-text'>월</span></div>
          <div className='date-cell'><span className='date-inner-text'>화</span></div>
          <div className='date-cell'><span className='date-inner-text'>수</span></div>
          <div className='date-cell'><span className='date-inner-text'>목</span></div>
          <div className='date-cell'><span className='date-inner-text'>금</span></div>
        </div>
        {
          times.map(
            time =>
            <div key={"timerow_" + time}  className='row'>
              <div className='time-cell'><span className='inner-text'>{time}</span></div>
              <div className='cell'/>
              <div className='cell'/>
              <div className='cell'/>
              <div className='cell'/>
              <div className='cell'/>
            </div>
          )
        }
        {
          getAllTimeSlots(props.lectures, false).map(
            timeSlot =>
            <div className='timeslot-box' key={'slot_' + timeSlot.displayOrder + '_' + timeSlot.slotOrder} style={getStyle(timeSlot.date,
              timeSlot.startHour, timeSlot.startMin, timeSlot.endHour, timeSlot.endMin,
              timeSlot.displayOrder, false)} onClick={() => showPopup(timeSlot)}>
                <span className="slot-text">{timeSlot.subjectTitle}</span>
                {
                  (timeSlot.endHour - timeSlot.startHour + (timeSlot.endMin - timeSlot.startMin) / 60) > 1 &&
                  <span className="slot-text-light">{timeSlot.slotRoom}</span>
                }
            </div>
          )
        }
        {
          props.isHovered &&
          getAllTimeSlots([props.hoveredLecture], false).map(
            timeSlot =>
            <div className='timeslot-box' key={'hoveredslot_' + timeSlot.slotOrder} style={getStyle(timeSlot.date,
              timeSlot.startHour, timeSlot.startMin, timeSlot.endHour, timeSlot.endMin,
              timeSlot.displayOrder, true)}>
                <span className="slot-text">{timeSlot.subjectTitle}</span>
                {
                  (timeSlot.endHour - timeSlot.startHour + (timeSlot.endMin - timeSlot.startMin) / 60) > 1 &&
                  <span className="slot-text-light">{timeSlot.slotRoom}</span>
                }
            </div>
          )
        }
      </div>
    </div>
  )
}
