import { useContext } from 'react';
import help1 from "../img/help1.png";
import help2 from "../img/help2.png";
import help3 from "../img/help3.png";
import title from "../img/title.png";

import mhelp1 from "../img/mobilehelp1.png";
import mhelp2 from "../img/mobilehelp2.png";
import mhelp3 from "../img/mobilehelp3.png";
import mhelp4 from "../img/mobilehelp4.png";
import mhelp5 from "../img/mobilehelp5.png";
import mhelp6 from "../img/mobilehelp6.png";
import mhelp7 from "../img/mobilehelp7.png";

import packageJson from '../../package.json';
import "../App.css";
import "../AppMobile.css"
import { PreviewContext, SEMESTER, YEAR } from '../App';

type propType = { scrollPosition: number; };

function Home(props: propType) {
  const appVersion: string = packageJson.version;
  const data = useContext(PreviewContext);
  return (
    !data.isMobile ?
    <div className='app-main-container' style={{ flexDirection: "column" }}> 
      <div className='app-parent-container' style={{ width: "100%" }}>
        <img src={title} alt="img" width={"100%"}/>
      </div>
      <div className='app-parent-container' style={{ width: "65%" }}>
        <img id='first-image' alt="img" src={help1} width={"100%"}/>
        <img src={help2} alt="img" width={"100%"}/>
        <img src={help3} alt="img" width={"100%"}/>
      </div>
      {
        props.scrollPosition < 500 &&
        <div className='look-down'>
          <p style={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
            {"사용법\n↓"}
          </p>
        </div>
      }
      <p className='medium-title'>
        샤간표 버전 v{appVersion},
        <br/>
        교과목 정보는 {YEAR}년도 {SEMESTER}학기 기준입니다.
        <br/>
        개발 및 디자인: 서울대학교 전기·정보공학부 22학번 riverMoonStone
      </p>
      <br/>
    </div>
    :
    <div style={{ marginTop: "70px" }}> 
      <img src={mhelp1} alt="img" width={"100%"}/>
      <img src={mhelp2} alt="img" width={"100%"}/>
      <img src={mhelp3} alt="img" width={"100%"}/>
      <img src={mhelp4} alt="img" width={"100%"}/>
      <img src={mhelp5} alt="img" width={"100%"}/>
      <img src={mhelp6} alt="img" width={"100%"}/>
      <img src={mhelp7} alt="img" width={"100%"}/>
      <p className='medium-title'>
        샤간표 버전 v{appVersion},
        <br/>
        교과목 정보는 {YEAR}년도 {SEMESTER}학기 기준입니다.
        <br/>
        개발 및 디자인: 서울대학교 전기·정보공학부 22학번 riverMoonStone
      </p>
      <br/>
    </div>

  )
}

export default Home;