import '../../App.css';

function Help() {
  
  return (
    <div className="appTable__container">
      <p className="large-title">도움말</p>
      <div className="appTable__scrollContainer" style= {{ overflow: "hidden" }}>
        <object data="Help.pdf" type="application/pdf" width="100%" height="100%">
          <p>PDF cannot be displayed, please download it <a href="Help.pdf">here</a>.</p>
        </object>
      </div>
    </div>
  );
}

export default Help;