import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from '../components/global/SearchBox';
import { SearchResultBox } from '../components/global/SearchResultBox';
import { Timetable } from '../components/global/Timetable';
import './Home.css';
import { combinedStateType } from '../reducers';
import { WarningPanel } from '../components/global/WarningPanel';

export const Home = () => {
  const addedLectures = useSelector((state: combinedStateType) => state.addedLecturesReducer.addedLectures);
  const hoveredLecture = useSelector((state: combinedStateType) => state.addedLecturesReducer.hoveredLecture);
  const hovered = useSelector((state: combinedStateType) => state.addedLecturesReducer.hovered);

  const searchText = useSelector((state: combinedStateType) => state.searchReducer.searchText);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_SEARCH_TEXT",
      payload: {
        content: event.target.value,
      }
    });
  }

  return (
    <div className='home-container'>
      <div className='home-container-left'>
        <SearchBox searchText={searchText} handleInputChange={handleInputChange} />
        <div className='home-container'>
          <div className='home-container-left'>
            <SearchResultBox/>
          </div>
          <div className='home-container-right'>
            <WarningPanel/>
          </div>
        </div>
      </div>
      <div className='home-container-right'>
        <Timetable lectures={addedLectures} hoveredLecture={hoveredLecture} isHovered={hovered}/>
      </div>
    </div>
  )
}
