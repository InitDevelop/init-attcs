import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from '../components/global/SearchBox';
import { combinedStateType } from '../reducers';
import './Add.css';
import { AddSearchResultBox } from '../components/add/AddSearchResultBox';

export const Add = () => {

  const subjectSearchText = useSelector((state: combinedStateType) => state.autoGeneratorReducers.subjectSearchText);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_SUBJECT_SEARCH_TEXT",
      payload: {
        subjectSearchText: event.target.value,
      }
    });
  }
  
  return (
    <div className='add-container'>
      <div className='add-container-left'>
        <SearchBox searchText={subjectSearchText} handleInputChange={handleInputChange}/>
        <div className='add-container-left-inner'>
          <AddSearchResultBox/>
          <AddSearchResultBox/>
        </div>
      </div>
      <div className='add-container-right'>

      </div>
    </div>
  )
}
