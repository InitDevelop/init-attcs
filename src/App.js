import './App.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import SubjectSearchList from './components/SubjectSearchList';
import SubjectSelectList from './components/SubjectSelectList';
import CreationOptions from './components/CreationOptions';
import Add from './routes/Add'
import TimeTable from './components/TimeTable';
import Popup from './components/Popup';
import Tooltip from './components/Tooltip';
import logo from './img/logo.png';

function App() {

  // Variables, Functions for Main App
  const [allowMult, setAllowMult] = useState(false);
  const [selSubj, setSelSubj] = useState([]);
  const [popSubj, popSelSubj] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [subjName, setSubjName] = useState(""); 
  const [listShow, setListShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(""); 

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("content");
  const [scrollPosition, setScrollPosition] = useState(0);

  const [subjHover, setSubjHover] = useState(false);
  const [hoveredSubj, setHoveredSubj] = useState([]);

  const [addedSubj, setAddedSubj] = useState([]);

  const [subjPopupSubj, setSubjPopupSubj] = useState([]);
  const [showSubjPopup, setShowSubjPopup] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  }

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

  const handlePopSubject = (subject) => {
    popSelSubj(subject);
    setSelSubj(selSubj.filter(
      item => (item.subj_id !== subject.subj_id) 
        || (item.lect_no !== subject.lect_no)));
  }

  const displayPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  }

 

  //Variables, Functions for Add Page
  const [addingSubjName, setAddingSubjName] = useState("");
  const [clickedSubject, setClickedSubject] = useState([]);
  const [addedLectureList, setAddedLectureList] = useState([]);
  const [popAddedSubj, setPopAddedSubj] = useState(null);
  const [addedSubjHover, setAddedSubjHover] = useState(false);
  const [hoveredAddedSubj, setHoveredAddedSubj] = useState([]);
  const [addedSubjKeyWord, setAddedSubjKeyWord] = useState("");

  const [addedLectures, setAddedLectures] = useState([]);
  const [addedSubjectIDs, setAddedSubjectIDs] = useState([]);

  const popAddedLecture = (lectureToPop) => {
    let filteredLength = addedLectures.filter(
      lecture => lecture.subj_id = lectureToPop.subj_id
    ).length;
    setAddedLectures(addedLectures.filter(
      lecture => lecture !== lectureToPop
    ));
    if (filteredLength === 1) {
      setAddedSubjectIDs(addedSubjectIDs.filter(
        id => id !== lectureToPop.subj_id
      ));
    }
  }

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
  }






  return (
    <BrowserRouter>
      <div className="app" onMouseMove={
        (event) => {
          setTooltipPosition({ x: event.clientX, y: event.clientY });
        }
      }>
      <div className='app__header_container'>
        <div className="app__header">
          <img className="app_header_logo" src={logo}
            style={{width: "auto", height: "7vh", marginRight: "30px"}}
          />
          <div className='app__header_links'>
            <Link to="/" className='links'>시간표</Link>
            <Link to="/add" className='links'>과목 담기</Link>
            <Link to="/create" className='links'>자동 생성</Link>
            <h3 style = {{ color: "lightgray" }}>ATTCS v0.3.01 (for beta testing), developed by @gong_zak_so</h3>
          </div>
        </div>
      </div>

      <Routes>
        <Route exact path="/" element={ 
          <div className='app__mainContainer'>
            <div className='app__parentContainer'>
              <CreationOptions
                handleInputChange   = {(event) => {
                  setListShow(false);
                  setSubjName(event.target.value);
                }}
                subjName={subjName}
                />
              <SubjectSearchList 
                subj_name   = {subjName}
                addSubject  = {
                  (subject) => {
                    setSelSubj(selSubj.concat(subject));
                  }
                }
                popSubject     = {handlePopSubject}
                isExistingSubj      = {isExistingSubj}
                allowMult           = {allowMult}
                handleKeywordChange = {(event) => {setKeyWord(event.target.value);}}
                keyWord             = {keyWord}
                setSubjHover        = {setSubjHover}
                setHoveredSubj      = {setHoveredSubj}
                displayPopup        = {displayPopup}
                />
            </div>
            <div className='app__parentContainer'>
              <SubjectSelectList 
                subj_name   = {subjName}
                selSubj     = {selSubj}
                addSubject  = {
                  (subject) => {
                    setSelSubj(selSubj.concat(subject));
                  }
                }
                popSubject  = {handlePopSubject}
                isExistingSubj      = {isExistingSubj}
                allowMult           = {allowMult}
                handleKeywordChange = {(event) => {setKeyWord(event.target.value);}}
                keyWord             = {keyWord}
                setAllowMul         = {setAllowMult}
                handleAllowMultChange = {handleAllowMultChange}
                setSubjHover        = {setSubjHover}
                setHoveredSubj      = {setHoveredSubj}
                displayPopup        = {displayPopup}
                />
            </div>
            <div className='app__parentContainer'>
              <TimeTable
                selSubj={selSubj}
                setShowTooltip={setShowTooltip}
                setTooltipContent={setTooltipContent}
                hoveredSubj={hoveredSubj}
                subjHover={subjHover}
              />
            </div>
          </div>
          }/>
          <Route path="/add" element={<Add
            addingSubjName        = {addingSubjName}
            handleAddInputChange  = {(event) => {
              setAddingSubjName(event.target.value);}}

            clickedSubject        = {clickedSubject}
            setClickedSubject     = {setClickedSubject}

            popAddedLecture = {popAddedLecture}
            
            keyWord = {addedSubjKeyWord}
            handleKeywordChange = {(event) => {setAddedSubjKeyWord(event.target.value);}}

            addSubject            = {
              (lecture) => {
                setAddedLectureList(addedLectureList.concat(lecture));
              }
            }
            popSubject            = {popAddedLecture}

            setSubjHover          = {setAddedSubjHover}
            setHoveredSubj        = {setHoveredAddedSubj}

            isExistingSubj = {isExistingAddedLect}

            addedLectures         = {addedLectures}
            setAddedLectures      = {setAddedLectures}

            addedSubjectIDs       = {addedSubjectIDs}
            setAddedSubjectIDs    = {setAddedSubjectIDs}

            displayPopup          = {displayPopup}
            />}/>
        </Routes>
        {showTooltip && (
          <Tooltip
            tooltipContent={tooltipContent}
            tooltipPosition={tooltipPosition}
            scrollPosition={scrollPosition}
          />
        )}

        {showPopup && (
          <Popup
            title={popupTitle}
            content={popupContent}
            onClose={() => {setShowPopup(false);}}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
