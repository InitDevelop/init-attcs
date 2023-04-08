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
import { blankLecture, lecture, lectureGroup } from './interfaces/Lecture';
import { xyTuple } from './interfaces/Util';
import { previewContextTypes, creationContextTypes } from './interfaces/ContextTypes';
import MobileMenuButton from './components/global/MobileMenuButton';
import MobileMenu from './components/global/MobileMenu';
import { scenario } from './interfaces/Scenario';

const appVersion: string = "0.6.0";

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
  tooltipContent: <></>,
  setTooltipContent: function (param: React.ReactNode): void {
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
  hoveredSubj: blankLecture,
  setHoveredSubj: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  isExistingSubj: function (lecture: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  handleAllowMultChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
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
  clickedSubject: '',
  setClickedSubject: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  addedSubjKeyWord: '',
  setAddedSubjKeyWord: function (param: string): void {
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
  isExistingSubj: function (lecture: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  addLectureToGroup: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  removeLectureFromGroup: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  lectureGroups: [],
  includesLecture: function (param: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  subjHover: false,
  setSubjHover: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  hoveredSubj: blankLecture,
  setHoveredSubj: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  displayPopup: function (title: string, content: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  handleAddInputChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  handleAddKeywordChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  setLectureGroups: function (param: lectureGroup[]): void {
    throw new Error('Function not implemented.');
  },
  scenarios: [],
  setScenarios: function (param: scenario[]): void {
    throw new Error('Function not implemented.');
  },
  scenarioNumber: 0,
  setScenarioNumber: function (param: number): void {
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
  tooltipContent: <></>,
  setTooltipContent: function (param: React.ReactNode): void {
    throw new Error('Function not implemented.');
  }
});

function App() {

  /****************************************************************************
    THESE VARIABLES, STATES, FUNCTIONS ARE FOR GLOBAL USE
  ****************************************************************************/

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname);

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
        timeShareLectures: []
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
    tooltipContent, setTooltipContent
  };

  return (
    <BrowserRouter>

      {/* Main container for the entire app */}

      <div className='app' onMouseMove={ (event) => {
        setTooltipPosition({ x: event.clientX, y: event.clientY }); }}>
        
        {/* Header for the entire app */}
        
        <div className="app__header_container">
          <div className="app__header">
            <img className="app_header_logo" src={logo} alt=""/>

            {/* Links for the pages */}

            <div className='app__header_links'>
              <Link className={ currentPage === "/" ? "link_current" : "links" }
                to="/" onClick = { () => {setCurrentPage("/")} }>시간표</Link>
              <Link className={ currentPage === "/add" ? "link_current" : "links" } 
                to="/add" onClick = { () => {setCurrentPage("/add")} }>과목 담기</Link>
              <Link className={ currentPage === "/create" ? "link_current" : "links" } 
                to="/create" onClick = { () => {setCurrentPage("/create")} }>자동 생성</Link>
              <div className='for_testing'>
                <span style={
                  { color: "gray", "fontWeight": "400", fontSize: "larger",
                    marginLeft: "15px", marginRight: "15px" }
                }>ATTCS v{appVersion}{"\n"}</span>
                <button className='button-0' style={{ fontSize: "larger", marginRight: "20px" }}
                  onClick={() => {displayPopup(
                    "설명",
                    <div>
                      <img src={inst1} alt=""
                      style={{width: "100%"}}
                      />
                      ATTCS v{appVersion} (for beta testing) Developed by Gong_Zak_So
                    </div>
                  )}}>
                  설명
                </button>

                {/* <button className='button-0' style={{ fontSize: "larger" }}
                  onClick={() => {displayPopup(
                    "이거를 만든 사람",
                    <div>
                      <strong>안녕하세요. 서울대학교 전기정보공학부 학부생 강문석입니다.
                      ATTCS의 개발자입니다.</strong> 코딩은 사람이 하는 일이고, 이 앱은 JavaScript, TypeScript와 React를 처음 배우면서 코딩한 앱이라서
                      버그나 오류가 발생할 수 있습니다. 버그나 오류가 발생한다면 
                      <strong> "그럴 수 있지"</strong>라고 너그럽게 생각해주시고
                      저에게 알려주시면 감사하겠습니다. 잘 사용해주세요!
                    </div>
                  )}}>
                  만든 사람
                </button> */}
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

        {
          menuOpened && (
            <MobileMenu
              toggleOpen={() => setMenuOpened(!menuOpened)}
            />
          )
        }

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
