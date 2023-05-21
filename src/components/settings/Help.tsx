import '../../App.css';
import help1 from "../../img/help1.png";
import help2 from "../../img/help2.png";
import help3 from "../../img/help3.png";

function Help() {
  return (
    <div className="appTable__container">
      <p className="large-title">도움말</p>
      <div className="appTable__scrollContainer" style= {{ overflowX: "hidden" }}>
        <img src={help1} width={"100%"}/>
        <img src={help2} width={"100%"}/>
        <img src={help3} width={"100%"}/>
      </div>
    </div>
  );
}

export default Help;