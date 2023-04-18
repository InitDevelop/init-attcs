import React, { useContext } from 'react'
import { CreationContext } from '../../App';
import TimeTable from '../preview/TimeTable';
import { blankLecture } from '../../interfaces/Lecture';
import "../../css/ScenariosDisplay.css"

function ScenariosDisplay() {
  const data = useContext(CreationContext);

  return (
    <div className='display__container'>

    </div>
  )
}

export default ScenariosDisplay;