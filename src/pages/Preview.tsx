import React, { useContext } from 'react';
import Popup from '../components/global/Popup.tsx';
import SubjTooltip from '../components/global/SubjTooltip.tsx';
import CreationOptions from '../components/preview/CreationOptions.tsx';
import SubjectSearchList from '../components/preview/SubjectSearchList.tsx';
import SubjectSelectList from '../components/preview/SubjectSelectList.tsx';
import TimeTable from '../components/preview/TimeTable.tsx';
import { PreviewContext } from "../App.tsx";


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