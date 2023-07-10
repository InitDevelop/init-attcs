import { useContext, useEffect, useState } from 'react';
import CreationOptions from '../components/preview/CreationOptions';
import SubjectSearchList from '../components/preview/SubjectSearchList';
import SubjectSelectList from '../components/preview/SubjectSelectList';
import TimeTable from '../components/preview/TimeTable';
import { PreviewContext } from "../App";

import "../AppMobile.css";
import { getAllTimeSlots, toTimeSlots } from '../util/Lecture';

function Preview() {
  const data = useContext(PreviewContext);

  const [isAddMenuVisible, setAddMenuVisible] = useState<boolean>(true);
  const [containsSaturday, setContainsSaturday] = useState<boolean>(false);

  useEffect(() => {
    if (data.selSubj.concat(
        data.subjHover ? data.hoveredSubj : []
      ).filter(lect => lect.time.includes("토")).length > 0) {
      setContainsSaturday(true);
    } else {
      setContainsSaturday(false);
    }
  }, [data]);


  return (
    !data.isMobile ?
    <div className="app-main-container">
      <div className='app-parent-container'>
        <TimeTable
          mode='preview'
          isMobile={data.isMobile}
          lectures={data.selSubj}
          subjHover={data.subjHover}
          timeSlots={getAllTimeSlots(data.selSubj, containsSaturday)}
          hoveredTimeSlots={data.subjHover ? toTimeSlots(data.hoveredSubj, 0, containsSaturday) : []}
          setShowTooltip={data.setShowTooltip}
          setTooltipContent={data.setTooltipContent}     
          displayPopup={data.displayPopup}
          containsSaturday={containsSaturday}
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
      <div style={{ margin: "10px" }}>
        <CreationOptions/>
      </div>
      <br/>
      <div style={{ margin: "0px 10px", textAlign: "right" }}>
        <button className={isAddMenuVisible ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setAddMenuVisible(true)}>강좌 추가하기</button>
        <button className={!isAddMenuVisible ? 'flat-button-selected' : 'flat-button'}
          onClick={() => setAddMenuVisible(false)}>담은 강좌</button>
      </div>
      {
        isAddMenuVisible ?
        <SubjectSearchList/>
        :
        <SubjectSelectList/>
      }
      <br/>
      <TimeTable
        mode='preview'
        isMobile={data.isMobile}
        lectures={data.selSubj}
        subjHover={data.subjHover}
        timeSlots={getAllTimeSlots(data.selSubj, containsSaturday)}
        hoveredTimeSlots={data.subjHover ? toTimeSlots(data.hoveredSubj, 0, containsSaturday) : []}
        setShowTooltip={data.setShowTooltip}
        setTooltipContent={data.setTooltipContent}
        displayPopup={data.displayPopup}        
        containsSaturday={containsSaturday}
      />
      <br/>
    </div>
  );
}

export default Preview;