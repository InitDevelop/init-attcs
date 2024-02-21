import { useSelector } from 'react-redux';
import './AddSearchResultBox.css';
import { combinedStateType } from '../../reducers';
import { Lecture } from '../../types/Lecture';
import { useEffect, useState } from 'react';
import { accuracy, checkRelatedLecture } from '../../util/checkRelatedLecture';
import { SubjectBox } from './SubjectBox';

export const AddSearchResultBox = () => {
  const subjectSearchText = useSelector((state: combinedStateType) => state.autoGeneratorReducers.subjectSearchText);
  const selectedSubjectID = useSelector((state: combinedStateType) => state.autoGeneratorReducers.selectedSubjectID);
  const lectureDatabase = useSelector((state: combinedStateType) => state.lectureDatabaseReducer.lectures);

  const [subjectList, setSubjectList] = useState<Lecture[]>([]);

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
    setSubjectList(
      filtered.filter(
        subject => subject.subjectID === selectedSubjectID
      ).sort((a, b) => `${a.subjectID} ${a.lectureNumber}`.localeCompare(`${b.subjectID} ${b.lectureNumber}`))
    );
  }, [subjectSearchText, selectedSubjectID, lectureDatabase]);


  return (
    <div className='default-box search-result-box'>
      <div className='container-title'>과목 검색 결과</div>
      <div className="search-result-container">
        <div className="search-result-scrollable">
          {
            subjectList.map(subject => 
              <SubjectBox/>
            )
          }
        </div>
      </div>
    </div>
  )
}

