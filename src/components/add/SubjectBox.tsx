import '../global/LectureBox.css'
import '../../css/AppTable.css'

type propType = {
  subj_id: string;
  subj_name: string;
  clickedSubject: string;
  setClickedSubject: (param: string) => void;
}

function SubjectBox(props: propType) {

  return (
    <div className={(props.subj_id === props.clickedSubject) ? "clicked-lecturebox" : "lecturebox"} style={
      { 
        cursor: "pointer",
        padding: "10px",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
      onClick={() => {
        props.setClickedSubject(props.subj_id);
      }}
      >
      <p style={{textAlign: "start"}}>
        <strong>
          {props.subj_name + "  "}
        </strong>
          ({props.subj_id})
      </p>
    </div>
  )
}

export default SubjectBox