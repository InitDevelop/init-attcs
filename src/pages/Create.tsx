import { AddedLectureGroupList } from '../components/add/AddedLectureGroupList';
import { Timetable } from '../components/global/Timetable';
import { blankLecture } from '../types/Lecture';
import './Create.css';

export const Create = () => {

  return (
    <div className='create-container'>
      <div className='create-container-inner with-left-padding'>
        <AddedLectureGroupList/>
      </div>
      <div className='create-container-inner'>

      </div>
      <div className='create-container-inner with-left-padding'>
        <Timetable lectures={[]} hoveredLecture={blankLecture} isHovered={false}/>
      </div>
    </div>
  )
}
