import './App.css';
import './AppMobile.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Add from './pages/Add';
import Preview from './pages/Preview';
import Create from './pages/Create';
import SubjTooltip from './components/global/SubjTooltip';
import Popup from './components/global/Popup';

import logo from './img/logo.png';
import inst1 from './img/inst1.png';
import { blankLecture, lecture } from './interfaces/Lecture';
import { xyTuple } from './interfaces/Util';
import { previewContextTypes, creationContextTypes } from './interfaces/ContextTypes';

const appVersion: string = "0.5.0";

export const PreviewContext = React.createContext<previewContextTypes>({
  selSubj: [],
  setSelSubj: function (lect: lecture[]): void {
    throw new Error('Function not implemented.');
  },
  allowMult: false,
  setAllowMult: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  keyWord: '',
  setKeyWord: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  searchText: '',
  setSearchText: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  showPopup: false,
  setShowPopup: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  popupTitle: '',
  setPopupTitle: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  popupContent: <></>,
  setPopupContent: function (param: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  showTooltip: false,
  setShowTooltip: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  tooltipPosition: {x: 0, y: 0},
  setTooltipPosition: function (param: xyTuple): void {
    throw new Error('Function not implemented.');
  },
  tooltipContent: "",
  setTooltipContent: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  scrollPosition: 0,
  setScrollPosition: function (param: number): void {
    throw new Error('Function not implemented.');
  },
  subjHover: false,
  setSubjHover: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  hoveredSubj: {
    lect_type: '',
    lect_col: '',
    lect_dept: '',
    grad: '',
    grade: '',
    subj_id: '',
    lect_no: '',
    subj_name: '',
    subj_subname: '',
    credit: '',
    cred_lect: '',
    cred_lab: '',
    time: '',
    lect_form: '',
    lect_room: '',
    prof: '',
    student_count: '',
    extra_info: '',
    lang: ''
  },
  setHoveredSubj: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  isExistingSubj: function (lecture: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  handleAllowMultChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  handlePopSubject: function (subject: lecture): void {
    throw new Error('Function not implemented.');
  },
  displayPopup: function (title: string, content: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  handleInputChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  handleKeywordChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  addSubject: function (subject: lecture): void {
    throw new Error('Function not implemented.');
  },
  popSubject: function (subject: lecture): void {
    throw new Error('Function not implemented.');
  }
});
export const CreationContext = React.createContext<creationContextTypes>({
  addingSubjName: '',
  setAddingSubjName: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  clickedSubject: "",
  setClickedSubject: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  addedSubjKeyWord: '',
  setAddedSubjKeyWord: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  addedLectureList: [],
  setAddedLectureList: function (param: lecture[]): void {
    throw new Error('Function not implemented.');
  },
  addedLectures: [],
  setAddedLectures: function (param: lecture[]): void {
    throw new Error('Function not implemented.');
  },
  addedSubjectIDs: [],
  setAddedSubjectIDs: function (param: string[]): void {
    throw new Error('Function not implemented.');
  },
  addedSubj: [],
  setAddedSubj: function (param: lecture[]): void {
    throw new Error('Function not implemented.');
  },
  showPopup: false,
  setShowPopup: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  popupTitle: '',
  setPopupTitle: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  popupContent: undefined,
  setPopupContent: function (param: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  displayPopup: function (title: string, content: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  popAddedLecture: function (lectureToPop: lecture): void {
    throw new Error('Function not implemented.');
  },
  isExistingAddedLect: function (subject: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  addAddSubject: function (lecture: lecture): void {
    throw new Error('Function not implemented.');
  },
  handleAddInputChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  handleAddKeywordChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  isExistingSubj: function (lecture: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  subjHover: false,
  setSubjHover: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  hoveredSubj: {
    lect_type: '',
    lect_col: '',
    lect_dept: '',
    grad: '',
    grade: '',
    subj_id: '',
    lect_no: '',
    subj_name: '',
    subj_subname: '',
    credit: '',
    cred_lect: '',
    cred_lab: '',
    time: '',
    lect_form: '',
    lect_room: '',
    prof: '',
    student_count: '',
    extra_info: '',
    lang: ''
  },
  setHoveredSubj: function (param: lecture): void {
    throw new Error('Function not implemented.');
  }
});

function App() {

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE PREVIEW PAGE
  ****************************************************************************/

  // States related to data
  const [selSubj, setSelSubj] = useState<Array<lecture>>([]);

  // States related to search options
  const [allowMult, setAllowMult] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [searchText, setSearchText] = useState<string>(""); // Originally subjName

  // States related to the tooltip
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<xyTuple>({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // States related to hovered subjects
  const [subjHover, setSubjHover] = useState<boolean>(false);
  const [hoveredSubj, setHoveredSubj] = useState<lecture>(blankLecture);

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
  const isExistingSubj = (lecture: lecture) => {
    let ret: boolean = false;
    for (let i = 0; i < selSubj.length; i++) {
      if (selSubj[i].subj_id === lecture.subj_id) {
        if (allowMult) {
          if (selSubj[i].lect_no === lecture.lect_no) {
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
  const handleAllowMultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowMult(event.target.checked);
    if (!event.target.checked) {
      let subj_id_list: Array<string> = [];
      for (let i = 0; i < selSubj.length; i++) {
        if (selSubj.filter(item => item.subj_id === selSubj[i].subj_id).length > 1) {
          subj_id_list.push(selSubj[i].subj_id);
        }
      }
      setSelSubj(selSubj.filter(item => !subj_id_list.includes(item.subj_id)));
      displayPopup("교과목명 중복 허용 해제", <>교과목명이 중복된 과목들은 제거되었습니다.</>);
    }
  };

  // Pops a certain subject out of the selSubj list
  const handlePopSubject = (subject: lecture) => {
    setSelSubj(selSubj.filter(
      item => (item.subj_id !== subject.subj_id) 
        || (item.lect_no !== subject.lect_no)));
  };

  // Handles input change in the search box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Handles input change in the keyword box
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  // Handles adding and popping subject to selSubj
  const addSubject = (subject: lecture) => {
    setSelSubj(selSubj.concat(subject));
  };

  const popSubject = (subject: lecture) => {
    setSelSubj(selSubj.filter((lect: lecture) => subject !== lect));
  };

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE ADD PAGE AND CREATE PAGE
  ****************************************************************************/

  // State related to current pages
  const [currentPage, setCurrentPage] = useState<string>("preview");

  // States related to searching subjects
  const [addingSubjName, setAddingSubjName] = useState<string>("");
  const [clickedSubject, setClickedSubject] = useState<string>("");
  const [addedSubjKeyWord, setAddedSubjKeyWord] = useState<string>("");

  // State related to added subjects and lectures
  const [addedLectureList, setAddedLectureList] = useState<Array<lecture>>([]);
  const [addedLectures, setAddedLectures] = useState<Array<lecture>>([]);
  const [addedSubjectIDs, setAddedSubjectIDs] = useState<Array<string>>([]);
  const [addedSubj, setAddedSubj] = useState<Array<lecture>>([]);

  // States related to popups
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<React.ReactNode>(<></>);

  // Displays popup with "title" and "content"
  const displayPopup = (title: string, content: React.ReactNode) => {
    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  }

  // Pops added lecture in the added lectures list
  const popAddedLecture = (lectureToPop: lecture) => {
    let filteredLength = addedLectures.filter(
      (lecture) => {return lecture.subj_id === lectureToPop.subj_id}
    ).length;
    setAddedLectures(addedLectures.filter(
      (lecture) => {return lecture !== lectureToPop}
    ));
    if (filteredLength === 1) {
      setAddedSubjectIDs(addedSubjectIDs.filter(
        (id) => (id) !== (lectureToPop.subj_id)
      ));
    }
  };

  // Function that checks if some subject already exists
  const isExistingAddedLect = (subject: lecture) => {
    let ret: boolean = false;
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
  const addAddSubject = (lecture: lecture) => {
    setAddedLectureList(addedLectureList.concat(lecture));
  };

  // Function that handles input in addSubjectSearch
  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddingSubjName(event.target.value);
  };

  // Function that handles input in keyword box
  const handleAddKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddedSubjKeyWord(event.target.value);
  }

  const previewContextData: previewContextTypes = {
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
    addSubject,
    popSubject
  };

  const creationContextData: creationContextTypes = {
    addingSubjName, setAddingSubjName,
    clickedSubject, setClickedSubject,
    addedSubjKeyWord, setAddedSubjKeyWord,

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
    handleAddKeywordChange,
    isExistingSubj,

    subjHover, setSubjHover,
    hoveredSubj, setHoveredSubj
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

          <Route path="/" element={
            <PreviewContext.Provider
              value = {previewContextData}
            >
              <Preview />
            </PreviewContext.Provider>
          }/>

          {/* The Add Page */}

          <Route path="/add" element={
            <CreationContext.Provider value={creationContextData}>
              <Add />
            </CreationContext.Provider>
          }/>

          {/* The Create Page */}

          <Route path="/create" element={
            <CreationContext.Provider value={creationContextData}>
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
