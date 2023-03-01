import './App.css';
import React, {useState, useEffect} from "react";
import SubjectSearchList from './components/SubjectSearchList';
import SubjectSelectList from './components/SubjectSelectList';
import CreationOptions from './components/CreationOptions';
import TimeTable from './components/TimeTable';
import Popup from './components/Popup';
import Tooltip from './components/Tooltip';
import logo from './img/logo.png';

function App() {

  const [allowMult, setAllowMult] = useState(false);
  const [selSubj, addSelSubj] = useState([]);
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

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

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
    console.log(ret);
    return ret;
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAllowMultChange = (event) => {
    setAllowMult(event.target.checked);

    if (!event.target.checked) {
      let subj_id_list = [];
      for (let i = 0; i < selSubj.length; i++) {
        if (selSubj.filter(item => item.subj_id === selSubj[i].subj_id).length > 1) {
          subj_id_list.push(selSubj[i].subj_id);
        }
      }

      addSelSubj(selSubj.filter(item => !subj_id_list.includes(item.subj_id)));
      displayPopup("교과목명 중복 허용 해제", "교과목명이 중복된 과목들은 제거되었습니다.");
    }
  };

  const handlePopSubject = (subject) => {
    popSelSubj(subject);
    addSelSubj(selSubj.filter(
      item => (item.subj_id !== subject.subj_id) 
        || (item.lect_no !== subject.lect_no)));
  }

  const handleKeywordChange = (event) => {
    setKeyWord(event.target.value);
  }

  const handleInputChange = (event) => {
    setListShow(false);
    setSubjName(event.target.value);
  }

  const handleSearchClick = () => {
    setListShow(true);
  }

  const displayPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setShowPopup(true);
  }

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      {/* APP HEADER */}

      <div className="app__header">
        <img src={logo} 
          style={{width: "auto", height:"7vh", marginLeft:"50px", marginRight:"10px"}}
        />
        <h1 className="app__headerText">
          Automatic TimeTable Creator for SNU Students
        </h1>
        <h3 className="app__headerText">
          서울대학교 학생을 위한 자동 시간표 생성 프로그램
        </h3>
      </div>

      <table className='app__table'>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", width: "32%" }}>
            
            <div className="app__timetable">
                <CreationOptions
                  handleInputChange={handleInputChange}
                  subjName={subjName}
                  allowMult={allowMult}
                  setAllowMul={setAllowMult}
                  handleAllowMultChange={handleAllowMultChange}
                  keyWord={keyWord}
                  handleKeywordChange={handleKeywordChange}
                  />
              </div>
              <SubjectSearchList 
                list_show={listShow}
                subj_name={subjName}
                addSelSubj={addSelSubj}
                selSubj={selSubj}
                handlePopSubject={handlePopSubject}
                isExistingSubj={isExistingSubj}
                allowMult={allowMult}
                handleKeywordChange={handleKeywordChange}
                keyWord={keyWord}
                displayPopup={displayPopup}
                setSubjHover={setSubjHover}
                setHoveredSubj={setHoveredSubj}
                />
            </td>
            <td style={{ verticalAlign: "top", width: "2vh" }} />
            <td style={{ verticalAlign: "top", width: "32%" }}>
              <SubjectSelectList 
                list_show={listShow}
                subj_name={subjName}
                addSelSubj={addSelSubj}
                selSubj={selSubj}
                handlePopSubject={handlePopSubject}
                isExistingSubj={isExistingSubj}
                allowMult={allowMult}
                handleKeywordChange={handleKeywordChange}
                keyWord={keyWord}
                displayPopup={displayPopup}
                setSubjHover={setSubjHover}
                setHoveredSubj={setHoveredSubj}
                />
            </td>
            <td style={{ verticalAlign: "top", width: "2vh" }} />
            <td style={{ verticalAlign: "top", width: "32%" }}>
              <TimeTable
                selSubj={selSubj}
                setShowTooltip={setShowTooltip}
                setTooltipContent={setTooltipContent}
                hoveredSubj={hoveredSubj}
                subjHover={subjHover}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>

      {/* TOOLTIP */}

      {showTooltip && (
        <Tooltip
          tooltipContent={tooltipContent}
          tooltipPosition={tooltipPosition}
          scrollPosition={scrollPosition}
        />
      )}



      {/* POPUP */}

      {showPopup && (
        <Popup
          title={popupTitle}
          content={popupContent}
          onClose={closePopup}
        />
      )}

    </div>
  );
}

export default App;
