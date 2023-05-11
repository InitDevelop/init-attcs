import { useContext, useState } from 'react';
import CreationOptions from '../components/preview/CreationOptions';
import SubjectSearchList from '../components/preview/SubjectSearchList';
import SubjectSelectList from '../components/preview/SubjectSelectList';
import TimeTable from '../components/preview/TimeTable';
import { PreviewContext } from "../App";

import "../AppMobile.css";
import MobilePreviewMenu from '../components/preview/MobilePreviewMenu';
import PreviewAddMenu from '../components/preview/PreviewAddMenu';
import PreviewRemoveMenu from '../components/preview/PreviewRemoveMenu';
import { getHoveredTimeTableSlots, getTimeTableSlots } from '../interfaces/Lecture';

function Preview() {

  const [isAddMenuVisible, setAddMenuVisible] = useState<boolean>(false);
  const [isRemoveMenuVisible, setRemoveMenuVisible] = useState<boolean>(false);

  const data = useContext(PreviewContext);

  return (
    !data.isMobile ?
    <div className="app-main-container">
      <div className='app-parent-container'>
        <TimeTable
          isMobile={data.isMobile}
          lectures={data.selSubj}
          subjHover={data.subjHover}
          timeSlots={getTimeTableSlots(data.selSubj)}
          hoveredTimeSlots={getHoveredTimeTableSlots(data.subjHover, data.hoveredSubj)}
          setShowTooltip={data.setShowTooltip}
          setTooltipContent={data.setTooltipContent}     
          displayPopup={data.displayPopup}   
        />
      </div>

      <div className='app-parent-container'>
        <CreationOptions/>
        <SubjectSearchList/>
      </div>

      <div className='app-parent-container'>
        <SubjectSelectList/>
      </div>
    </div>
    :
    <div className="app-main-container">
      <div className='app-parent-container'>
        <TimeTable
          isMobile={data.isMobile}
          lectures={data.selSubj}
          subjHover={data.subjHover}
          timeSlots={getTimeTableSlots(data.selSubj)}
          hoveredTimeSlots={getHoveredTimeTableSlots(data.subjHover, data.hoveredSubj)}
          setShowTooltip={data.setShowTooltip}
          setTooltipContent={data.setTooltipContent}     
          displayPopup={data.displayPopup}   
        />
        <MobilePreviewMenu
          setAddMenuVisible={setAddMenuVisible}
          setRemoveMenuVisible={setRemoveMenuVisible}
        />
      </div>
      {
        isAddMenuVisible &&
        <PreviewAddMenu
          setAddMenuVisible={setAddMenuVisible}
        />
      }
      {
        isRemoveMenuVisible &&
        <PreviewRemoveMenu
          setRemoveMenuVisible={setRemoveMenuVisible}
        />
      }
    </div>
  );
}

export default Preview;