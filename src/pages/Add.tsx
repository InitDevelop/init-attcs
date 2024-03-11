import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from '../components/global/SearchBox';
import { combinedStateType } from '../reducers';
import './Add.css';
import { AddSearchResultBox } from '../components/add/AddSearchResultBox';
import { useEffect, useState } from 'react';
import { Lecture, blankLecture } from '../types/Lecture';
import { accuracy, checkRelatedLecture } from '../util/checkRelatedLecture';
import { AddSearchLectureList } from '../components/add/AddSearchLectureList';
import { Timetable } from '../components/global/Timetable';
import { AddedLectureGroupList } from '../components/add/AddedLectureGroupList';

export const Add = () => {

  const addedLectures = useSelector((state: combinedStateType) => state.addedLecturesReducer.addedLectures);
  const hoveredLecture = useSelector((state: combinedStateType) => state.addedLecturesReducer.hoveredLecture);
  const hovered = useSelector((state: combinedStateType) => state.addedLecturesReducer.hovered);

  const subjectSearchText = useSelector((state: combinedStateType) => state.autoGeneratorReducers.subjectSearchText);
  const selectedSubjectID = useSelector((state: combinedStateType) => state.autoGeneratorReducers.selectedSubjectID);
  const addedLectureGroups = useSelector((state: combinedStateType) => state.autoGeneratorReducers.addedLectureGroups);
  const lectureDatabase = useSelector((state: combinedStateType) => state.lectureDatabaseReducer.lectures);

  const [subjectList, setSubjectList] = useState<Lecture[]>([]);
  const [lectureList, setLectureList] = useState<Lecture[]>([]);
  const [selectedLectureList, setSelectedLectureList] = useState<Lecture[]>([]);
  
  const dispatch = useDispatch();

  const addLectureToList = (lecture: Lecture) => {
    setSelectedLectureList(selectedLectureList.concat(lecture));
  }

  const removeLectureFromList = (lecture: Lecture) => {
    setSelectedLectureList(selectedLectureList.filter(l => l.id !== lecture.id));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_SUBJECT_SEARCH_TEXT",
      payload: {
        subjectSearchText: event.target.value,
      }
    });
  }

  useEffect(() => {
    let subjectsAdded: string[] = [];
    let matches: Lecture[] = [];
    let filtered = lectureDatabase.filter(
      subject => subjectSearchText.length > 1 && checkRelatedLecture(subjectSearchText, subject)
    );
    let sorted = filtered.sort((a, b) => accuracy(subjectSearchText, b.subjectTitle) - accuracy(subjectSearchText, a.subjectTitle));

    for (const subject of sorted) {
      if (!subjectsAdded.includes(subject.subjectID)) {
        subjectsAdded.push(subject.subjectID);
        matches.push(subject);
      }
    }

    setSubjectList(matches);
    setSelectedLectureList([]);
    setLectureList(
      filtered.filter(
        subject => subject.subjectID === selectedSubjectID
      ).sort((a, b) => `${a.subjectID} ${a.lectureNumber}`.localeCompare(`${b.subjectID} ${b.lectureNumber}`))
    );
  }, [subjectSearchText, selectedSubjectID, lectureDatabase]);
  

  return (
    <div className='add-container'>
      <div className='add-container-left'>
        <SearchBox searchText={subjectSearchText} handleInputChange={handleInputChange}/>
        <div className='add-container-left-inner'>
          <AddSearchResultBox subjectList={subjectList} selectedSubjectID={selectedSubjectID}/>
          <AddSearchLectureList
            lectureList={lectureList}
            selectedLectureList={selectedLectureList}
            selectedSubjectID={selectedSubjectID}
            addLectureToList={addLectureToList}
            removeLectureFromList={removeLectureFromList}
            setSelectedLectureList={setSelectedLectureList}
            />
        </div>
      </div>
      <div className='add-container-right'>
        {
          hovered ?
          <Timetable
            lectures={[hoveredLecture]}
            hoveredLecture={blankLecture}
            isHovered={false}
            includesSaturday={true}
            mode='add'/>
          :
          <AddedLectureGroupList/>
        }
      </div>
    </div>
  )
}
