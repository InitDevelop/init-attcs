import './App.css';
import './AppMobile.css';

import lectureDataThis from "./db/data232.json";
import lectureDataThen from "./db/data231.json";
import React, { useState, useEffect, CSSProperties } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Add from './pages/Add';
import Preview from './pages/Preview';
import Create from './pages/Create';
import Popup from './components/global/Popup';

import logo from './img/logo.png';
import { blankLecture, CustomSchedule, Lecture, LectureGroup } from './util/Lecture';
import { Dictionary } from './util/Util';
import { previewContextTypes, creationContextTypes, defaultPreviewContext, defaultCreationContext } from './util/ContextTypes';
import MobileMenuButton from './components/global/MobileMenuButton';
import MobileMenu from './components/global/MobileMenu';
import { Scenario } from './util/Scenario';
import packageJson from '../package.json';
import Settings from './pages/Settings';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { downloadObjectAsJson } from './components/global/FileIO';
import { CheckRelatedLecture, accuracy } from './components/global/CheckRelatedLecture';
import Home from './pages/Home';

export const YEAR = 2023;
export const SEMESTER = 2;
export const SEASON = 1; // 정규학기는 1, 계절학기는 2
export const UPDATE = "2023. 07. 26.";

const currentSemester = "23-2";
const pastSemester = "23-1";

const appVersion: string = packageJson.version;

export const PreviewContext = React.createContext<previewContextTypes>(defaultPreviewContext);
export const CreationContext = React.createContext<creationContextTypes>(defaultCreationContext);


function App() {
  
  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR GLOBAL USE
  ****************************************************************************/

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1000);
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [lectureDatabase, setLectureDatabase] = useState<Lecture[]>((lectureDataThis as { subjects: Lecture[] }).subjects);
  const [isCurrentSemester, setIsCurrentSemester] = useState<boolean>(true);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    const confirmationMessage = '새로고침을 하면 저장되지 않은 정보는 삭제됩니다. 계속하시겠습니까?';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE PREVIEW PAGE
  ****************************************************************************/

  // States related to data
  const [selSubj, setSelSubj] = useState<Array<Lecture>>([]);

  // States related to search options
  const [allowMult, setAllowMult] = useState<boolean>(true);
  const [keyWord, setKeyWord] = useState<string>("");
  const [searchText, setSearchText] = useState<string>(""); // Originally subjName
  const [shownLectures, setShownLectures] = useState<Lecture[]>([]);

  // States related to the tooltip
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // States related to hovered subjects
  const [subjHover, setSubjHover] = useState<boolean>(false);
  const [hoveredSubj, setHoveredSubj] = useState<Lecture>(blankLecture);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // This function checks if some lecture exists in the timetable
  const isExistingSubj = (lecture: Lecture) => {
    let ret: boolean = false;
    for (let i = 0; i < selSubj.length; i++) {
      if (selSubj[i].subjectID === lecture.subjectID) {
        if (allowMult) {
          if (selSubj[i].lectureNumber === lecture.lectureNumber) {
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
  const handleAllowMultChange = () => {
    setAllowMult(!allowMult);
    if (!allowMult) {
      let subj_id_list: Array<string> = [];
      for (let i = 0; i < selSubj.length; i++) {
        if (selSubj.filter(item => item.subjectID === selSubj[i].subjectID).length > 1) {
          subj_id_list.push(selSubj[i].subjectID);
        }
      }
      setSelSubj(selSubj.filter(item => !subj_id_list.includes(item.subjectID)));
      displayPopup("교과목명 중복 허용 해제", <>교과목명이 중복된 과목들은 제거되었습니다.</>);
    }
  };
 
  // Handles input change in the search box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    setShownLectures(
      lectureDatabase.filter(
        (lect: Lecture) => {
          return ((searchText.replaceAll(" ", "").length > 1) && CheckRelatedLecture(searchText, lect)); }
      ).sort((a, b) => `${a.subjectID} ${a.lectureNumber}`.localeCompare(`${b.subjectID} ${b.lectureNumber}`))
      .sort((a, b) => (accuracy(searchText, b.subjectTitle, b.lecturer) - accuracy(searchText, a.subjectTitle, a.lecturer)))
    );
  }, [searchText, lectureDatabase]);

  // Handles input change in the keyword box
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  };

  // Handles adding and popping subject to selSubj
  const addSubject = (subject: Lecture) => {
    setSelSubj(selSubj.concat(subject));
  };

  const popSubject = (subject: Lecture) => {
    setSelSubj(selSubj.filter((lect: Lecture) => subject !== lect));
  };

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR THE ADD PAGE AND CREATE PAGE
  ****************************************************************************/

  // State related to current pages

  // States related to searching subjects
  const [addingSubjName, setAddingSubjName] = useState<string>("");
  const [clickedSubject, setClickedSubject] = useState<string>("");
  const [addedSubjKeyWord, setAddedSubjKeyWord] = useState<string>("");
  const [matchingLectures, setMatchingLectures] = useState<Lecture[]>([]);
  const [matchingSubjects, setMatchingSubjects] = useState<Lecture[]>([]);

  // States related to custom lectures
  const [customLectures, setCustomLectures] = useState<CustomSchedule[]>([]);

  // States related to popups
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<React.ReactNode>(<></>);

  // State, Functions related to lectureGroups
  const [lectureGroups, setLectureGroups] = useState<LectureGroup[]>([]);

  // State related to the create page
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioNumber, setScenarioNumber] = useState<number>(0);
  const [relatedLectures, setRelatedLectures] = useState<Lecture[]>([]);
  const [priority, setPriority] = useState<Dictionary<number>>({
    "empty": 1, "time": 6, "morning": 3, "count": 4, "lunch": 5, "space": 2
  });

  const addLectureToGroup = (lect: Lecture) => {
    const IDs = lectureGroups.map((lg: LectureGroup) => lg.subjectID);
    let copy = lectureGroups;
    if (IDs.includes(lect.subjectID)) {
      const index = lectureGroups.findIndex((lg: LectureGroup) => lg.subjectID === lect.subjectID);
      copy[index].lectures.push(lect);
    } else {
      copy.push({
        subjectID: lect.subjectID,
        lectures: [lect],
        timeShareLectures: [],
        //mustInclude: true
      });
    }
    setLectureGroups(copy);
  }

  const removeLectureFromGroup = (lect: Lecture) => {
    const index = lectureGroups.findIndex((lg: LectureGroup) => lg.subjectID === lect.subjectID);
    let copy = lectureGroups;
    copy[index].lectures = lectureGroups[index].lectures.filter(l => l !== lect);
    if (copy[index].lectures.length === 0) {
      copy = copy.filter(lg => lg.subjectID !== lect.subjectID);
    }
    setLectureGroups(copy);
  }

  const includesLecture = (lect: Lecture) => {
    const IDs = lectureGroups.map((lg: LectureGroup) => lg.subjectID);
    if (IDs.includes(lect.subjectID)) {
      const index = lectureGroups.findIndex((lg: LectureGroup) => lg.subjectID === lect.subjectID);
      return lectureGroups[index].lectures.filter(l => l.lectureNumber === lect.lectureNumber).length > 0;
    } else {
      return false;
    }
  }

  // Displays popup with "title" and "content"
  const displayPopup = (title: string, content: React.ReactNode) => {
    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  }

  // Function that handles input in addSubjectSearch
  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddingSubjName(event.target.value);
    setClickedSubject("");
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Escape') {
        if (showPopup === true) {
          setShowPopup(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    let subjectsAdded: string[] = [];
    let matches: Lecture[] = [];

    let filtered = lectureDatabase.filter(
      subject => addingSubjName.length > 1 && CheckRelatedLecture(addingSubjName, subject)
    );

    let sorted = filtered.sort((a, b) => accuracy(addingSubjName, b.subjectTitle, "") - accuracy(addingSubjName, a.subjectTitle, ""));

    for (const subject of sorted) {
      if (!subjectsAdded.includes(subject.subjectID)) {
        subjectsAdded.push(subject.subjectID);
        matches.push(subject);
      }
    }

    setMatchingSubjects(matches);

    setMatchingLectures(
      filtered.filter(
        subject => subject.subjectID === clickedSubject
      ).sort((a, b) => `${a.subjectID} ${a.lectureNumber}`.localeCompare(`${b.subjectID} ${b.lectureNumber}`))
    );

  }, [addingSubjName, clickedSubject, lectureDatabase]);

  useEffect(() => {
    if (isCurrentSemester) {
      setLectureDatabase(((lectureDataThis as { subjects: Lecture[] }).subjects).concat(
        ...customLectures
      ));
    } else {
      setLectureDatabase(((lectureDataThen as { subjects: Lecture[] }).subjects).concat(
        ...customLectures
      ));
    }

  }, [customLectures, isCurrentSemester]);

  // Function that handles input in keyword box
  const handleAddKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddedSubjKeyWord(event.target.value);
  }

  const previewContextData: previewContextTypes = {
    lectureDatabase,
    isMobile,
    hideHeader,
    setHideHeader,

    selSubj, setSelSubj,

    allowMult, setAllowMult,
    keyWord, setKeyWord,
    searchText, setSearchText,
    shownLectures,

    showPopup, setShowPopup,
    popupTitle, setPopupTitle,
    popupContent, setPopupContent,

    showTooltip, setShowTooltip,
    tooltipStyle, setTooltipStyle,
    tooltipContent, setTooltipContent,
    scrollPosition, setScrollPosition,

    subjHover, setSubjHover,
    hoveredSubj, setHoveredSubj,

    isExistingSubj,
    handleAllowMultChange,
    displayPopup,
    handleInputChange,
    handleKeywordChange,
    addSubject,
    popSubject
  };

  const creationContextData: creationContextTypes = {
    lectureDatabase,
    isMobile,
    hideHeader,
    setHideHeader,

    setSelSubj,
    addingSubjName, setAddingSubjName,
    clickedSubject, setClickedSubject,
    addedSubjKeyWord, setAddedSubjKeyWord,
    matchingLectures,
    matchingSubjects,

    customLectures, setCustomLectures,

    showPopup, setShowPopup,
    popupTitle, setPopupTitle,
    popupContent, setPopupContent,

    displayPopup,
    handleAddInputChange,
    handleAddKeywordChange,
    isExistingSubj,
    
    relatedLectures, setRelatedLectures,

    subjHover, setSubjHover,
    hoveredSubj, setHoveredSubj,

    scenarios, setScenarios,
    scenarioNumber, setScenarioNumber,

    addLectureToGroup,
    removeLectureFromGroup,
    lectureGroups,
    setLectureGroups,
    includesLecture,
    showTooltip, setShowTooltip,
    tooltipStyle, setTooltipStyle,
    tooltipContent, setTooltipContent,

    priority, setPriority
  };

  if (!lectureDataThis || !lectureDataThen) {
    return <div>Loading...</div>;
  }

  const saveUserData = () => {
    let version = 0;
    const saveData = {
      version,
      selSubj,
      lectureGroups,
      priority,
      customLectures
    };
    downloadObjectAsJson(saveData, 'save_data');
  }

  const openUserData = () => {
    displayPopup("저장된 시간표 데이터 불러오기",
    <input type="file" className='button-0' onChange={
        (event) => {
        let tempData = { version: 0, selSubj: [], lectureGroups: [], priority: {}, customLectures: [] };
        
        if (event.target.files) {
          const file = event.target.files[0];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            if (e.target) {
              const contents: any = e.target.result;
              const parsedData = JSON.parse(contents);
              tempData = parsedData;
              console.log(tempData);
              setSelSubj(tempData.selSubj);
              setLectureGroups(tempData.lectureGroups);
              setPriority(tempData.priority);
              setCustomLectures(tempData.customLectures);
            }
          };
          
          reader.readAsText(file);
        }
      }
    }
    />)
  };

  const reportBug = () => {
    displayPopup("오류 신고 / 건의하기",
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc4z-f6_loBHHgqC5loLazQMvBrEAhV4uR7UZ6R5cGB58t2aQ/viewform?embedded=true"
        title='report'
        style={
          {
            width: "100%",
            height: "600px"
          }
        }
        frameBorder="0">로드 중…</iframe>
    );
  }

  return (
    <BrowserRouter>
      {/* Main container for the entire app */}

      <div className='app'>
        {/* The pages of this app */}
        <Routes>
          <Route path="/" element={
            <PreviewContext.Provider
              value = {previewContextData}
            >
              <Home scrollPosition={scrollPosition}/>
            </PreviewContext.Provider>
          }/>

          {/* The Preview (main) Page */}
          
          <Route path="/preview" element={
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
              <Create/>
            </CreationContext.Provider>
          }/>

          <Route path="/settings" element={
            <CreationContext.Provider value={creationContextData}>
              <Settings/>
            </CreationContext.Provider>
          }/>

        </Routes>

        {/* Header for the entire app */}
        
        { (!isMobile || (isMobile && !hideHeader)) &&
        <div className="app-header-container">
          <div className="app-header">

            {/* Links for the pages */}

            <div className='app-header-links'>
              { !isMobile && 
                <Link className="app-header-logo-link"
                  to="/" onClick = { () => {setCurrentPage("/")} }>
                  <img className="app-header-logo" src={logo} alt=""/>
                </Link>
              }
              { isMobile &&
                <Link className="app-header-logo"
                  to="/" onClick = { () => {setCurrentPage("/")} }>
                  <img height={"100%"} src={logo} alt=""/>
                </Link>
              }
              <Link className={ currentPage === "/" ? "link-current" : "links" }
                to="/" onClick = { () => {setCurrentPage("/")} }>홈</Link>
              <Link className={ currentPage === "/preview" ? "link-current" : "links" }
                to="/preview" onClick = { () => {setCurrentPage("/preview")} }>시간표</Link>
              <Link className={ currentPage === "/add" ? "link-current" : "links" } 
                to="/add" onClick = { () => {setCurrentPage("/add")} }>과목 담기</Link>
              <Link className={ currentPage === "/create" ? "link-current" : "links" } 
                to="/create" onClick = { () => {setCurrentPage("/create")} }>자동 생성</Link>
              <Link className={ currentPage === "/settings" ? "link-current" : "links" } 
                to="/settings" onClick = { () => {setCurrentPage("/settings")} }>설정</Link>
              <div className={"links"} 
                onClick = {saveUserData}>저장</div>
              <div className={"links"} 
                onClick = {openUserData}>열기</div>
              <div className={"links"} 
                onClick = {reportBug}>오류 신고</div>
              {
                !isMobile && 
                <select className='select' 
                onChange={(e) => { if (e.target.value === currentSemester) setIsCurrentSemester(true);
                                    else setIsCurrentSemester(false); }}
                value={ isCurrentSemester ? currentSemester : pastSemester }>
                  <option value={ currentSemester }>
                    {currentSemester}
                  </option>
                  <option value={ pastSemester }>
                    {pastSemester}
                  </option>
                </select>
              }

              <div className='for_testing'>
                <span style={
                  { color: "gray", fontSize: "larger",
                    marginLeft: "15px", whiteSpace: "nowrap" }
                }><strong>샤간표 v{appVersion}</strong></span>
                {/* <span style={
                  {
                    color: "white",
                    fontSize: "larger",
                    marginLeft: "15px",
                    backgroundColor: "#EC4E46",
                    padding: "3px 8px",
                    borderRadius: "3px",
                    whiteSpace: "nowrap"
                  }
                }><strong>2023년 2학기 기준!</strong></span> */}
              </div>
              <MobileMenuButton
                open={menuOpened}
                onClick={() => {
                  setMenuOpened(!menuOpened);
                }}/>
            </div>
          </div>
        </div>
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
        {
          menuOpened && (
            <MobileMenu
              toggleOpen={() => setMenuOpened(!menuOpened)}
              isOpened={menuOpened}
              saveData={saveUserData}
              openData={openUserData}
            />
          )
        }
      </div>
    </BrowserRouter>
  );
}

export default App;

