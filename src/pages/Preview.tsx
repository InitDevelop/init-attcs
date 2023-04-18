import { useContext } from 'react';
import CreationOptions from '../components/preview/CreationOptions';
import SubjectSearchList from '../components/preview/SubjectSearchList';
import SubjectSelectList from '../components/preview/SubjectSelectList';
import TimeTable from '../components/preview/TimeTable';
import { PreviewContext } from "../App";


function Preview() {

  const data = useContext(PreviewContext);

  return (
    <div className="app__mainContainer">
      <div className='app__parentContainer'>
        <TimeTable
          lectures={data.selSubj}
          subjHover={data.subjHover}
          hoveredSubj={data.hoveredSubj}
          setShowTooltip={data.setShowTooltip}
          setTooltipContent={data.setTooltipContent}     
          displayPopup={data.displayPopup}   
        />
      </div>

      <div className='app__parentContainer'>
        <CreationOptions/>
        <SubjectSearchList/>
      </div>

      <div className='app__parentContainer'>
        <SubjectSelectList/>
      </div>
    </div>
  );
}

export default Preview;