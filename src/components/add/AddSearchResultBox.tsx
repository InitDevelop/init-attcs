import './AddSearchResultBox.css';
import { Lecture } from '../../types/Lecture';
import { SubjectBox } from './SubjectBox';

export const AddSearchResultBox = ( props: { subjectList: Lecture[], selectedSubjectID: string } ) => {

  return (
    <div className='default-box search-result-box'>
      <div className='container-title'>과목 검색 결과</div>
      <div className="search-result-container">
        <div className="search-result-scrollable">
          {
            props.subjectList.map(subject => 
              <SubjectBox subject={subject} isSelected={props.selectedSubjectID === subject.subjectID} />
            )
          }
        </div>
      </div>
    </div>
  )
}

