import { useDispatch } from 'react-redux';
import { Lecture } from '../../types/Lecture';
import './SubjectBox.css';

export const SubjectBox = ( props: { subject: Lecture, isSelected: boolean }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      {
        type: "SET_SELECTED_SUBJECT_ID",
        payload: {
          selectedSubjectID: props.subject.subjectID,
        }
      }
    );
  }

  return (
    <div className={ props.isSelected ? 'selected' : 'subjectbox' } onClick={handleClick}>
      <span className="darkergray bold large right-margin-10">{props.subject.credit}학점</span>
      <span className="darkgray regular large right-margin-10">{props.subject.classification}</span>
      <span className="large bold right-margin-10">{props.subject.subjectTitle}</span>
      <span className="large regular">({props.subject.subjectID})</span>
    </div>
  )
}
