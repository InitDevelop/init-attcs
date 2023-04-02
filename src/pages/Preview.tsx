import { useContext } from 'react';
import CreationOptions from '../components/preview/CreationOptions';
import SubjectSearchList from '../components/preview/SubjectSearchList';
import SubjectSelectList from '../components/preview/SubjectSelectList';
import TimeTable from '../components/preview/TimeTable';
import { PreviewContext } from "../App";


function Preview() {

  const data = useContext(PreviewContext);

  return (
    <div className="app__mainContainer" onMouseMove={ (event) => {
      data.setTooltipPosition({ x: event.clientX, y: event.clientY }); }}>
      <div className='app__parentContainer'>
        <CreationOptions/>
        <SubjectSearchList/>
      </div>

      <div className='app__parentContainer'>
        <SubjectSelectList/>
      </div>

      <div className='app__parentContainer'>
        <TimeTable/>
      </div>
    </div>
  );
}

export default Preview;