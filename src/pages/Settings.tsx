import { PriorityPanel } from '../components/settings/PriorityPanel';
import './Settings.css';
import '../App.css';
import { CustomLecturePanel } from '../components/settings/CustomLecturePanel';
import { useSelector } from 'react-redux';
import { combinedStateType } from '../reducers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const Settings = () => {

  const customLectures = useSelector((state: combinedStateType) => state.customLectureReducer.customLectures);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      {
        type: "UPDATE_CUSTOM_LECTURES_TO_DATABASE",
        payload: {
          customLectures: customLectures,
        }
      }
    );
  // eslint-disable-next-line
  }, [customLectures]);

  return (
    <div className='settings-container'>
      <div className='settings-container-inner'>
        <PriorityPanel/>
      </div>
      <div className='settings-container-inner'>
        <CustomLecturePanel/>
      </div>
    </div>
  )
}
