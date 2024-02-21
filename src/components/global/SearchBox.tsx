import { SearchBar } from './SearchBar';
import './SearchBox.css';

export const SearchBox = ( props: { searchText: string, handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void } ) => {
  return (
    <div className='default-box search-box'>
      <div className='container-title'>강좌 검색하기</div>
      <div className="search-bar-container">
        <SearchBar searchText={props.searchText} handleInputChange={props.handleInputChange}/>
      </div>
    </div>
  )
}
