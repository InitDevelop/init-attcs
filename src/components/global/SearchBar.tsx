export const SearchBar = ( props: { searchText: string, handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void } ) => {
  return (
    <input
      className='input-1'
      type='text'
      placeholder='과목 / 강좌 이름 검색 (교수님, 약어, 수강반, 개설 단과대학 또는 학과/학부, 강의 언어, 강의 요일 등으로 검색 가능)'
      value={props.searchText}
      onChange={props.handleInputChange}
    />
  )
}
