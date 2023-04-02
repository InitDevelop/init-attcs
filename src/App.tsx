import './App.css';
import './AppMobile.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Add from './pages/Add.tsx';
import Preview from './pages/Preview.tsx';
import Create from './pages/Create.tsx';
import SubjTooltip from './components/global/SubjTooltip.tsx';
import Popup from './components/global/Popup.tsx';

import logo from './img/logo.png';
import inst1 from './img/inst1.png';

export const PreviewContext = React.createContext();
export const CreationContext = React.createContext();

const appVersion = "0.4.1";

function App() {

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE PREVIEW PAGE
  ****************************************************************************/

  // States related to data
  const [selSubj, setSelSubj] = useState([]);

  // States related to search options
  const [allowMult, setAllowMult] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [searchText, setSearchText] = useState(""); // Originally subjName

  // States related to the tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("content");
  const [scrollPosition, setScrollPosition] = useState(0);

  // States related to hovered subjects
  const [subjHover, setSubjHover] = useState(false);
  const [hoveredSubj, setHoveredSubj] = useState([]);

  // useEffect for following scroll
  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This function checks if some lecture exists in the timetable
  const isExistingSubj = (subject) => {
    let ret = false;
    for (let i = 0; i < selSubj.length; i++) {
      if (selSubj[i].subj_id === subject.subj_id) {
        if (allowMult) {
          if (selSubj[i].lect_no === subject.lect_no) {
            ret = true;
            break;
          }
        } else {
          ret = true;
          break;
        }
      }
    }
    return ret;
  };

  // This function handles change in the allowMult option
  // If this option gets unchecked, then some lectures get deleted
  const handleAllowMultChange = (event) => {
    setAllowMult(event.target.checked);
    if (!event.target.checked) {
      let subj_id_list = [];
      for (let i = 0; i < selSubj.length; i++) {
        if (selSubj.filter(item => item.subj_id === selSubj[i].subj_id).length > 1) {
          subj_id_list.push(selSubj[i].subj_id);
        }
      }
      setSelSubj(selSubj.filter(item => !subj_id_list.includes(item.subj_id)));
      displayPopup("교과목명 중복 허용 해제", "교과목명이 중복된 과목들은 제거되었습니다.");
    }
  };

  // Pops a certain subject out of the selSubj list
  const handlePopSubject = (subject) => {
    setSelSubj(selSubj.filter(
      item => (item.subj_id !== subject.subj_id) 
        || (item.lect_no !== subject.lect_no)));
  };

  // Handles input change in the search box
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Handles input change in the keyword box
  const handleKeywordChange = (event) => {
    setKeyWord(event.target.value);
  };

  // Handles adding subject to selSubj
  const addSubject = (subject) => {
    setSelSubj(selSubj.concat(subject));
  };

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE ADD PAGE AND CREATE PAGE
  ****************************************************************************/

  // State related to current pages
  const [currentPage, setCurrentPage] = useState("preview");

  // States related to searching subjects
  const [addingSubjName, setAddingSubjName] = useState("");
  const [clickedSubject, setClickedSubject] = useState([]);
  const [addedSubjKeyWord, setAddedSubjKeyWord] = useState("");

  // State related to added subjects and lectures
  const [lectureGroups, setLectureGroups] = useState([]);

  const [addedLectureList, setAddedLectureList] = useState([]);
  const [addedLectures, setAddedLectures] = useState([]);
  const [addedSubjectIDs, setAddedSubjectIDs] = useState([]);
  const [addedSubj, setAddedSubj] = useState([]);

  // States related to popups
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

  // Displays popup with "title" and "content"
  const displayPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  }

  // Pops added lecture in the added lectures list
  const popAddedLecture = (lectureToPop) => {
    let filteredLength = addedLectures.filter(
      (lecture) => {return lecture.subj_id === lectureToPop.subj_id}
    ).length;
    setAddedLectures(addedLectures.filter(
      (lecture) => {return lecture !== lectureToPop}
    ));
    if (filteredLength === 1) {
      setAddedSubjectIDs(addedSubjectIDs.filter(
        id => id !== lectureToPop.subj_id
      ));
    }
  };

  // Function that checks if some subject already exists
  const isExistingAddedLect = (subject) => {
    let ret = false;
    for (let i = 0; i < addedSubj.length; i++) {
      if (addedSubj[i].subj_id === subject.subj_id) {
        if (addedSubj[i].lect_no === subject.lect_no) {
          ret = true;
          break;
        }
      }
    }
    return ret;
  };

  // Function that adds subjects to added lecture list
  const addAddSubject = (lecture) => {
    setAddedLectureList(addedLectureList.concat(lecture));
  };

  // Function that handles input in addSubjectSearch
  const handleAddInputChange = (event) => {
    setAddingSubjName(event.target.value);
  };

  // Function that handles input in keyword box
  const handleAddKeywordChange = (event) => {
    setAddedSubjKeyWord(event.target.value);
  }

  const data = {
    addingSubjName, setAddingSubjName,
    clickedSubject, setClickedSubject,
    addedSubjKeyWord, setAddedSubjKeyWord,

    lectureGroups, setLectureGroups,
    
    addedLectureList, setAddedLectureList,
    addedLectures, setAddedLectures,
    addedSubjectIDs, setAddedSubjectIDs,
    addedSubj, setAddedSubj,

    showPopup, setShowPopup,
    popupTitle, setPopupTitle,
    popupContent, setPopupContent,

    displayPopup,
    popAddedLecture,
    isExistingAddedLect,
    addAddSubject,
    handleAddInputChange,
    handleAddKeywordChange
  };
  
  return (
    <BrowserRouter>

      {/* Main container for the entire app */}

      <div className='app'>
        
        {/* Header for the entire app */}
        
        <div className="app__header_container">
          <div className="app__header">
            <img className="app_header_logo" src={logo}/>

            {/* Links for the pages */}

            <div className='app__header_links'>
              <Link className={ currentPage === "preview" ? "link_current" : "links" }
                to="/" onClick = { () => {setCurrentPage("preview")} }>시간표</Link>
              <Link className={ currentPage === "add" ? "link_current" : "links" } 
                to="/add" onClick = { () => {setCurrentPage("add")} }>과목 담기</Link>
              <Link className={ currentPage === "create" ? "link_current" : "links" } 
                to="/create" onClick = { () => {setCurrentPage("create")} }>자동 생성</Link>
              <div className='for_testing'>
                <span style={
                  { color: "gray", "fontWeight": "400", fontSize: "larger",
                    marginLeft: "15px", marginRight: "15px" }
                }>ATTCS v{appVersion} (beta){"\n"}</span>
                <button className='button-0' style={{ fontSize: "larger" }}
                  onClick={() => {displayPopup(
                    "설명",
                    <div>
                      <img src={inst1}
                      style={{width: "100%"}}
                      />
                      ATTCS v{appVersion} (for beta testing) Developed by Gong_Zak_So
                    </div>
                  )}}>
                  설명
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The pages of this app */}

        <Routes>

          {/* The Preview (main) Page */}

          <Route exact path="/" element={
            <PreviewContext.Provider
              value = {
                {
                  selSubj, setSelSubj,
        
                  allowMult, setAllowMult,
                  keyWord, setKeyWord,
                  searchText, setSearchText,
        
                  showPopup, setShowPopup,
                  popupTitle, setPopupTitle,
                  popupContent, setPopupContent,
        
                  showTooltip, setShowTooltip,
                  tooltipPosition, setTooltipPosition,
                  tooltipContent, setTooltipContent,
                  scrollPosition, setScrollPosition,
        
                  subjHover, setSubjHover,
                  hoveredSubj, setHoveredSubj,
        
                  isExistingSubj,
                  handleAllowMultChange,
                  handlePopSubject,
                  displayPopup,
                  handleInputChange,
                  handleKeywordChange,
                  addSubject
                }
              }
            >
              <Preview />
            </PreviewContext.Provider>
          }/>

          {/* The Add Page */}

          <Route path="/add" element={
            <CreationContext.Provider value={data}>
              <Add />
            </CreationContext.Provider>
          }/>

          {/* The Create Page */}

          <Route path="/create" element={
            <CreationContext.Provider value={data}>
              <Create />
            </CreationContext.Provider>
          }/>

        </Routes>

        {
          showTooltip && (
          <SubjTooltip
            mode = "preview"
            tooltipContent = {tooltipContent}
            tooltipPosition = {tooltipPosition}
            scrollPosition = {scrollPosition}
          />
          )
        }

        {
          showPopup && (
            <Popup
              title = {popupTitle}
              content = {popupContent}
              onClose = {() => {setShowPopup(false)}}
            />
          )
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
