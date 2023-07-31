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
import "../components/global/Popup.css"
import { PreviewContext, SEMESTER, UPDATE, YEAR } from '../App';

type propType = { scrollPosition: number; };

function Home(props: propType) {
  const appVersion: string = packageJson.version;
  const data = useContext(PreviewContext);

  const onShowDeveloper = () => {
    data.displayPopup("버전 및 개발 정보",
      <div>
        <table className='subjectpopup-table'>
          <tbody>
            <tr>
              <td>
                <h4 className='key'>샤간표 웹앱 버전</h4>
              </td>
              <td>
                <h4 className='value'>v{appVersion}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4 className='key'>교과목 정보 기준</h4>
              </td>
              <td>
                <h4 className='value'>{YEAR}년도 {SEMESTER}학기, {UPDATE} 기준</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4 className='key'>개발자 및 디자인</h4>
              </td>
              <td>
                <h4 className='value'>서울대학교 전기·정보공학부 22학번 r_m_s</h4>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h4 className='key'>안녕하세요.</h4>
                <h4 className='value'>샤간표를 이용해주셔서 감사합니다.</h4>
                <h4 className='value'>샤간표는 React를 처음 공부하는 과정에서 진행한 프로젝트입니다.</h4>
                <h4 className='value'>현재 샤간표는 프런트엔드로만 작동하며, 아직 로그인 등의 기능은 없습니다.</h4>
                <h4 className='value'>처음 배우면서 만든 앱이다 보니, 부족한 부분들이 있을 수 있습니다.</h4>
                <h4 className='value'>여러분의 이번 학기 수강 신청에 도움이 되는 유용한 도구로 활용되기를 바랍니다.</h4>
                <h4 className='value'>감사합니다.</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

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
        <div className='look-down' style={{ cursor: "pointer" }} onClick={() => {
          window.scrollTo({
            top: window.innerWidth * 9 / 16,
            behavior: "smooth"
          });
        }}>
          <p style={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
            {"사용법\n↓"}
          </p>
        </div>
      }
      <br/>
      <button className='button-0' onClick={onShowDeveloper}>
        버전 및 개발자 정보
      </button>
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
      <br/>
      <button className='button-0' onClick={onShowDeveloper}>
        버전 및 개발자 정보
      </button>
      <div style={{ marginBottom: "20px" }}/>
    </div>

  )
}

export default Home;