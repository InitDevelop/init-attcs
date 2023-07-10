import { useState } from 'react';
import data from "../../db/departments.json"
import "./SearchFilterMenu.css"

type propType = {
  searchText: string;
  setSearchText: (param: string) => void;
}

const collegeList = [
  "인문대학",
  "사회과학대학",
  "자연과학대학",
  "간호대학",
  "경영대학",
  "공과대학",
  "농업생명과학대학",
  "미술대학",
  "사범대학",
  "생활과학대학",
  "수의과대학",
  "약학대학",
  "음악대학",
  "의과대학",
  "자유전공학부",
  "치의학대학원"
];

const dates = [
  "월요일", "화요일", "수요일", "목요일", "금요일"
];

const year = [
  "1학년", "2학년", "3학년", "4학년", "5학년", "6학년"
];

const classifications = [
  "교양", "전필", "전선", "교직", "논문", "공통", "일선"
];

function SearchFilterMenu(props: propType) {
  const [college, setCollege] = useState<string>("인문대학");
  const [department, setDeparment] = useState<string>("");
  const [date, setDate] = useState<string>("월요일");
  const [keyword, setKeyWord] = useState<string>("");
  const [classification, setClassification] = useState<string>("교양");
  const [schoolYear, setSchoolYear] = useState<string>("1학년");

  const applyCollegeFilter = () => {
    if (college !== "") {
      if (props.searchText === "") {
        props.setSearchText(college);
      } else {
        props.setSearchText(props.searchText + " " + college);
      }
    }
  }

  const applyDepartmentFilter = () => {
    if (department !== "") {
      if (props.searchText === "") {
        props.setSearchText(department);
      } else {
        props.setSearchText(props.searchText + " " + department);
      }
    }
  }

  const applyDateFilter = () => {
    if (date !== "") {
      if (props.searchText === "") {
        props.setSearchText(date);
      } else {
        props.setSearchText(props.searchText + " " + date);
      }
    }
  }

  const applyKeywordFilter = () => {
    if (keyword !== "") {
      if (props.searchText === "") {
        props.setSearchText("/r" + keyword);
      } else {
        props.setSearchText(props.searchText + " /r" + keyword);
      }
    }
  }

  const applyClassificationFilter = () => {
    if (classification !== "") {
      if (props.searchText === "") {
        props.setSearchText(classification);
      } else {
        props.setSearchText(props.searchText + " " + classification);
      }
    }
  }

  const applyYearFilter = () => {
    if (schoolYear !== "") {
      if (props.searchText === "") {
        props.setSearchText(schoolYear);
      } else {
        props.setSearchText(props.searchText + " " + schoolYear);
      }
    }
  }

  return (
    <table className='filter-table'>
      <tbody>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>단과대학</h4>
          </td>
          <td>
            <select className='select'
              onChange={(e) => {setCollege(e.target.value)}}
              value={college}>
              {
                collegeList.map(
                  college => <option value={college}>
                    {college}
                  </option>
                )
              }
            </select>
          </td>
          <td>
            <button className='button-0' onClick={applyCollegeFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>학과(부)</h4>
          </td>
          <td>
            <select className='select'
              onChange={(e) => e.target.value.includes("-") ? "" : setDeparment(e.target.value)}
              value={department}>
              {
                data.departments.map(
                  department => <option 
                      value={department}
                      style={{  backgroundColor: department.includes("-") ? "lightgray" : "white",
                                fontWeight: department.includes("-") ? "700" : "400" }}>
                    {department}
                  </option>
                )
              }
            </select>
          </td>
          <td>
            <button className='button-0' onClick={applyDepartmentFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>수업 요일</h4>
          </td>
          <td>
            <select className='select'
              onChange={(e) => setDate(e.target.value)}
              value={date}>
              {
                dates.map(
                  date => <option value={date}>
                    {date}
                  </option>
                )
              }
            </select>
          </td>
          <td>
            <button className='button-0' onClick={applyDateFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>교양/전공 구분</h4>
          </td>
          <td>
            <select className='select'
              onChange={(e) => setClassification(e.target.value)}
              value={classification}>
              {
                classifications.map(
                  classification => <option value={classification}>
                    {classification}
                  </option>
                )
              }
            </select>
          </td>
          <td>
            <button className='button-0' onClick={applyClassificationFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>학년</h4>
          </td>
          <td>
            <select className='select'
              onChange={(e) => setSchoolYear(e.target.value)}
              value={schoolYear}>
              {
                year.map(
                  y => <option value={y}>
                    {y}
                  </option>
                )
              }
            </select>
          </td>
          <td>
            <button className='button-0' onClick={applyYearFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
        <tr>
          <td>
            <h4>수강반 키워드</h4>
          </td>
          <td>
            <input type="text" 
              style={{ width: "80%" }}
              value={keyword}
              placeholder='수강반 입력'
              onChange={(e) => setKeyWord(e.target.value)} className="input-1"></input>
          </td>
          <td>
            <button className='button-0' onClick={applyKeywordFilter}>적용</button>
          </td>
        </tr>
        {/*************************************************************************************/}
      </tbody>
    </table>
  )
}

export default SearchFilterMenu;