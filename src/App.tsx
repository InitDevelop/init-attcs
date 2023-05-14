import './App.css';
import './AppMobile.css';
import lectureData from "./db/data.json"
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Add from './pages/Add';
import Preview from './pages/Preview';
import Create from './pages/Create';
import SubjTooltip from './components/global/SubjTooltip';
import Popup from './components/global/Popup';

import logo from './img/logo.png';
import inst1 from './img/inst1.png';
import { blankLecture, lecture, lectureGroup } from './interfaces/Lecture';
import { Dictionary, StringNumberPair, xyTuple } from './interfaces/Util';
import { previewContextTypes, creationContextTypes, defaultPreviewContext, defaultCreationContext } from './interfaces/ContextTypes';
import MobileMenuButton from './components/global/MobileMenuButton';
import MobileMenu from './components/global/MobileMenu';
import { scenario } from './interfaces/Scenario';
import packageJson from '../package.json';
import Settings from './pages/Settings';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { downloadObjectAsJson } from './components/global/FileIO';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk7TcB-NxrG7OSTs5NqwHJhLweAx6_tA8",
  authDomain: "shaganpyo.firebaseapp.com",
  projectId: "shaganpyo",
  storageBucket: "shaganpyo.appspot.com",
  messagingSenderId: "283150565834",
  appId: "1:283150565834:web:c14e1df0d1858a430c8f33",
  measurementId: "G-CH9KXLYSTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const appVersion: string = packageJson.version;

export const PreviewContext = React.createContext<previewContextTypes>(defaultPreviewContext);
export const CreationContext = React.createContext<creationContextTypes>(defaultCreationContext);


function App() {
  
  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR GLOBAL USE
  ****************************************************************************/

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900);
  /* 
  const isMobile = resolution >= 320 && resolution <= 480;
  const isTablet = resolution >= 768 && resolution <= 1024;
  const isDesktop = !isMobile && !isTablet;
  */
  const [lectureDatabase, setLectureDatabase] = useState<lecture[]>((lectureData as { subjects: lecture[] }).subjects);

  // useEffect(() => {
  //   fetch('data.json')
  //     .then((response) => response.json())
  //     .then((data) => setLectureData(data))
  //     .catch((error) => console.log(error));
  //   if (lectureData) {
  //     setLectureDatabase((lectureData as { subjects: lecture[] }).subjects);
  //   }
  // }, []);
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
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode>("");
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

  useEffect(() => {
    window.addEventListener('resize', () => {setIsMobile(window.innerWidth <= 900)});
    return () => {
      window.removeEventListener('resize', () => {setIsMobile(window.innerWidth <= 900)});
    }
  });

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
  const handleAllowMultChange = () => {
    setAllowMult(!allowMult);
    if (!allowMult) {
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
  /*
  const handlePopSubject = (subject: lecture) => {
    setSelSubj(selSubj.filter(
      item => (item.subj_id !== subject.subj_id) 
        || (item.lect_no !== subject.lect_no)));
  };
  */
 
  // Handles input change in the search box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setKeyWord("");
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

  // States related to searching subjects
  const [addingSubjName, setAddingSubjName] = useState<string>("");
  const [clickedSubject, setClickedSubject] = useState<string>("");
  const [addedSubjKeyWord, setAddedSubjKeyWord] = useState<string>("");

  // States related to popups
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<React.ReactNode>(<></>);

  // State, Functions related to lectureGroups
  const [lectureGroups, setLectureGroups] = useState<lectureGroup[]>([]);

  // State related to the create page
  const [scenarios, setScenarios] = useState<scenario[]>([]);
  const [scenarioNumber, setScenarioNumber] = useState<number>(0);
  const [relatedLectures, setRelatedLectures] = useState<lecture[]>([]);
  const [priority, setPriority] = useState<Dictionary<number>>({
    "empty": 1, "time": 2, "morning": 3, "count": 4, "lunch": 5, "space": 6
  });

  const addLectureToGroup = (lect: lecture) => {
    const IDs = lectureGroups.map((lg: lectureGroup) => lg.subj_id);
    let copy = lectureGroups;
    if (IDs.includes(lect.subj_id)) {
      const index = lectureGroups.findIndex((lg: lectureGroup) => lg.subj_id === lect.subj_id);
      copy[index].lectures.push(lect);
    } else {
      copy.push({
        subj_id: lect.subj_id,
        lectures: [lect],
        timeShareLectures: [],
        mustInclude: true
      });
    }
    setLectureGroups(copy);
  }

  const removeLectureFromGroup = (lect: lecture) => {
    const index = lectureGroups.findIndex((lg: lectureGroup) => lg.subj_id === lect.subj_id);
    let copy = lectureGroups;
    copy[index].lectures = lectureGroups[index].lectures.filter(l => l !== lect);
    if (copy[index].lectures.length === 0) {
      copy = copy.filter(lg => lg.subj_id !== lect.subj_id);
    }
    setLectureGroups(copy);
  }

  const includesLecture = (lect: lecture) => {
    const IDs = lectureGroups.map((lg: lectureGroup) => lg.subj_id);
    if (IDs.includes(lect.subj_id)) {
      const index = lectureGroups.findIndex((lg: lectureGroup) => lg.subj_id === lect.subj_id);
      return lectureGroups[index].lectures.includes(lect);
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
  };

  // Function that handles input in keyword box
  const handleAddKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddedSubjKeyWord(event.target.value);
  }

  const previewContextData: previewContextTypes = {
    lectureDatabase,
    isMobile,

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
    displayPopup,
    handleInputChange,
    handleKeywordChange,
    addSubject,
    popSubject
  };

  const creationContextData: creationContextTypes = {
    lectureDatabase,
    isMobile,

    setSelSubj,
    addingSubjName, setAddingSubjName,
    clickedSubject, setClickedSubject,
    addedSubjKeyWord, setAddedSubjKeyWord,

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
    tooltipPosition, setTooltipPosition,
    tooltipContent, setTooltipContent,

    priority, setPriority
  };

  if (!lectureData) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {/* Main container for the entire app */}

      <div className='app' onMouseMove={ (event) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY }); }}>
        
        {/* Header for the entire app */}
        
        <div className="app-header-container">
          <div className="app-header">
            <img className="app-header-logo" src={logo} alt=""/>

            {/* Links for the pages */}

            <div className='app-header-links'>
              <Link className={ currentPage === "/" ? "link-current" : "links" }
                to="/" onClick = { () => {setCurrentPage("/")} }>시간표</Link>
              <Link className={ currentPage === "/add" ? "link-current" : "links" } 
                to="/add" onClick = { () => {setCurrentPage("/add")} }>과목 담기</Link>
              <Link className={ currentPage === "/create" ? "link-current" : "links" } 
                to="/create" onClick = { () => {setCurrentPage("/create")} }>자동 생성</Link>
              <Link className={ currentPage === "/settings" ? "link-current" : "links" } 
                to="/settings" onClick = { () => {setCurrentPage("/settings")} }>설정 및 도움말</Link>
              <div className={"links"} 
                onClick = { () => {
                  const saveData = {
                    selSubj,
                    lectureGroups,
                    scenarios,
                    priority
                  };
                  downloadObjectAsJson(saveData, 'save_data');
                } }>저장</div>
              
              <div className={"links"} 
                onClick = { () => {
                  displayPopup("저장된 시간표 데이터 불러오기",
                  <input type="file" className='button-0' onChange={
                    (event) => {
                      let tempData = { selSubj: [], lectureGroups: [], scenarios: [], priority: {} };

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
                            setScenarios(tempData.scenarios);
                            setPriority(tempData.priority);
                            if (scenarios.length < 1) {
                              setScenarioNumber(0);
                            }
                          }
                        };
                        
                        reader.readAsText(file);
                      }
                    }
                  } />
                  );
                } }>열기</div>
              <div className='for_testing'>
                <span style={
                  { color: "gray", "fontWeight": "400", fontSize: "larger",
                    marginLeft: "15px", marginRight: "15px" }
                }><strong>샤간표 베타 v{appVersion}</strong></span>
              </div>

              <MobileMenuButton
                open={menuOpened}
                onClick={ () => {
                  setMenuOpened(!menuOpened);
                }}/>
            </div>
          </div>
        </div>

        {/* The pages of this app */}

        

        <Routes>

          {/* For github page guests */}
          <Route path="/init-attcs" element={
            <div style={{ fontSize: "xx-large", marginTop: "50px", fontWeight: "300" }}>
              <strong>ATTCS에 오신 것을 환영합니다!</strong>
              <br/>
              상단 메뉴 중 하나를 선택하시면 사용을 시작하실 수 있습니다.
            </div>
          }/>

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
              <Create/>
            </CreationContext.Provider>
          }/>

          <Route path="/settings" element={
            <CreationContext.Provider value={creationContextData}>
              <Settings/>
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

        <MobileMenu
          toggleOpen={() => setMenuOpened(!menuOpened)}
          isOpened={menuOpened}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
