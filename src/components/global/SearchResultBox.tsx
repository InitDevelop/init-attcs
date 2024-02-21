import { useSelector } from 'react-redux';
import './SearchResultBox.css';
import { combinedStateType } from '../../reducers';
import { Lecture } from '../../types/Lecture';
import { useEffect, useState } from 'react';
import { LectureBox } from './LectureBox';
import { accuracy, checkRelatedLecture } from '../../util/checkRelatedLecture';
import { getAllTimeSlots, toTimeSlots } from '../../types/TimeSlot';
import { isTimeIntersect } from '../../util/timeManagement';

export const SearchResultBox = () => {
  const searchText = useSelector((state: combinedStateType) => state.searchReducer.searchText);
  const lectureDatabase = useSelector((state: combinedStateType) => state.lectureDatabaseReducer.lectures);
  const addedLectures = useSelector((state: combinedStateType) => state.addedLecturesReducer.addedLectures)

  const [lectureList, setLectureList] = useState<Lecture[]>([]);
  const [intersects, setIntersects] = useState<Map<Lecture, boolean>>(new Map());

  useEffect(() => {
    let newMap: Map<Lecture, boolean> = new Map();
    const timeSlots = getAllTimeSlots(addedLectures);
    for (const lect of lectureList) {
      let intersectFlag: boolean = false;
      if (addedLectures.includes(lect)) {
        continue;
      }
      loop:
      for (const ts of timeSlots) {
        for (const tsLect of toTimeSlots(lect, 0, true)) {
          if (ts.date !== tsLect.date) continue;
          if (isTimeIntersect(ts.startTime, ts.endTime, tsLect.startTime, tsLect.endTime)) {
            intersectFlag = true;
            break loop;
          }
        }
      }
      newMap.set(lect, intersectFlag);
    }
    setIntersects(newMap);
  }, [addedLectures, lectureList]);

  useEffect(
    () => {
      setLectureList(
        lectureDatabase.filter(
          (lect: Lecture) => {
            return ((searchText.replaceAll(" ", "").length > 1) && checkRelatedLecture(searchText, lect)); }
        ).sort((a, b) => `${a.subjectID} ${a.lectureNumber}`.localeCompare(`${b.subjectID} ${b.lectureNumber}`))
        .sort((a, b) => (accuracy(searchText, b.subjectTitle) - accuracy(searchText, a.subjectTitle)))
      );
    }
  , [searchText, lectureDatabase]);

  return (
    <div className='default-box search-result-box'>
      <div className='container-title'>강좌 검색 결과</div>
      <div className="search-result-container">
        <div className="search-result-scrollable">
          {
            lectureList.map(lecture => 
              <LectureBox
                lecture={lecture}
                intersects={intersects.get(lecture)}
                alreadyExists={addedLectures.filter(l => l.id === lecture.id).length > 0}
                />
            )
          }
        </div>
      </div>
    </div>
  )
}

