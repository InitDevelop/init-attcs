import './App.css';
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
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
      displayPopup("???????????? ?????? ?????? ??????", "??????????????? ????????? ???????????? ?????????????????????.");
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

  const displaySubjPopup = (subject) => {
    setSubjPopupSubj(subject);
    setShowSubjPopup(true);
  }

  return (
    <BrowserRouter>
      <div className="app" onMouseMove={handleMouseMove}>
      <div className='app__header_container'>
        <div className="app__header">
          <img src={logo} 
            style={{width: "auto", height: "7vh", marginRight: "30px"}}
          />
          <div className='app__header_links'>
            <Link to="/" className='links'>?????????</Link>
            <Link to="/add" className='links'>?????? ??????</Link>
            <Link to="/create" className='links'>?????? ??????</Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route exact path="/" element={ 
          <div className='app__maincontainer'>
            <div className='app__parentbox'>
              <div className="app__creationoptions">
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
              <div className='app__subject_search_list'>
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
              </div>
            </div>
            <div className='app__parentbox'>
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
            </div>
            <div className='app__parentbox'>
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
            onClose={closePopup}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
