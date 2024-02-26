import { PriorityPanel } from '../components/settings/PriorityPanel';
import './Settings.css';
import '../App.css';
import { CustomLecturePanel } from '../components/settings/CustomLecturePanel';

export const Settings = () => {
  return (
    <div className='settings-container'>
      <div className='settings-container-inner'>
        <PriorityPanel/>
      </div>
      <div className='settings-container-inner'>
        <CustomLecturePanel/>
      </div>
      <div className='settings-container-inner'>

      </div>
    </div>
  )
}
