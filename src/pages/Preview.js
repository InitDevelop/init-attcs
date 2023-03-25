import React, { useContext } from 'react';
import Popup from '../components/global/Popup';
import SubjTooltip from '../components/global/SubjTooltip';
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

      {
        data.showTooltip && (
        <SubjTooltip
          mode = "preview"
          tooltipContent = {data.tooltipContent}
          tooltipPosition = {data.tooltipPosition}
          scrollPosition = {data.scrollPosition}
        />
        )
      }

      {
        data.showPopup && (
          <Popup
            title = {data.popupTitle}
            content = {data.popupContent}
            onClose = {() => {data.setShowPopup(false)}}
          />
        )
      }

    </div>
  );
}

export default Preview;