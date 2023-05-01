import "../../css/SubjectList.css"

type propType = {
  selectedDates: number[];
  setSelectedDates: (param: number[]) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

export function SelectDate(props: propType) {
  return (
    <div>
      <div className="list__addedsubject" style={
        { width: "80%" }}>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer", whiteSpace: "pre-wrap" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
            className='checkbox-1'
            type="checkbox"
            checked={props.selectedDates.includes(0)}
            onChange={(event) => {
              if (!event.target.checked) {
                props.setSelectedDates(props.selectedDates.filter(a => a !== 0));
              } else {
                props.setSelectedDates(props.selectedDates.concat(0));
              }
            }}
        />{"\t"}월요일</label>
      </div>
      <div className="list__addedsubject" style={
        { width: "80%" }}>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer", whiteSpace: "pre-wrap" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
            className='checkbox-1'
            type="checkbox"
            checked={props.selectedDates.includes(1)}
            onChange={() => {
              if (props.selectedDates.includes(1)) {
                props.setSelectedDates(props.selectedDates.filter(a => a !== 1));
              } else {
                props.setSelectedDates(props.selectedDates.concat(1));
              }
            }}
        />{"\t"}화요일</label>
      </div>
      <div className="list__addedsubject" style={
        { width: "80%" }}>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer", whiteSpace: "pre-wrap" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
            className='checkbox-1'
            type="checkbox"
            checked={props.selectedDates.includes(2)}
            onChange={() => {
              if (props.selectedDates.includes(2)) {
                props.setSelectedDates(props.selectedDates.filter(a => a !== 2));
              } else {
                props.setSelectedDates(props.selectedDates.concat(2));
              }
            }}
        />{"\t"}수요일</label>
      </div>
      <div className="list__addedsubject" style={
        { width: "80%" }}>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer", whiteSpace: "pre-wrap" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
            className='checkbox-1'
            type="checkbox"
            checked={props.selectedDates.includes(3)}
            onChange={() => {
              if (props.selectedDates.includes(3)) {
                props.setSelectedDates(props.selectedDates.filter(a => a !== 3));
              } else {
                props.setSelectedDates(props.selectedDates.concat(3));
              }
            }}
        />{"\t"}목요일</label>
      </div>
      <div className="list__addedsubject" style={
        { width: "80%" }}>
        <label className='label-1' style={{ fontWeight: "normal", cursor: "pointer", whiteSpace: "pre-wrap" }}>
          <input style={{ cursor: "pointer", verticalAlign: "middle" }}
            className='checkbox-1'
            type="checkbox"
            checked={props.selectedDates.includes(4)}
            onChange={() => {
              if (props.selectedDates.includes(4)) {
                props.setSelectedDates(props.selectedDates.filter(a => a !== 4));
              } else {
                props.setSelectedDates(props.selectedDates.concat(4));
              }
            }}
        />{"\t"}금요일</label>
      </div>
    </div>
  )
}