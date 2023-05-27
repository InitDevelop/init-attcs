import { useContext } from 'react';
import help1 from "../img/help1.png";
import help2 from "../img/help2.png";
import help3 from "../img/help3.png";
import title from "../img/title.png";
import "../App.css";
import "../AppMobile.css"
import { PreviewContext } from '../App';

type propType = { scrollPosition: number; };

function Home(props: propType) {
  const data = useContext(PreviewContext);
  return (
    !data.isMobile ?
    <div className='app-main-container'> 
      <div className='app-parent-container' style={{ width: "65%" }}>
        <img src={title} alt="img" height={"100%"}/>
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
    </div>
    :
    <div className='app-main-container'> 
      <div className='app-parent-container'>
        <img src={title} alt="img" width={"100%"}/>
        <img src={help1} alt="img" width={"100%"}/>
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
    </div>

  )
}

export default Home;