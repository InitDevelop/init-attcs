import '../../App.css';

function Help() {
  
  return (
    <div className="appTable__container">
      <p className="large-title">도움말</p>
      <div className="appTable__scrollContainer" style= {{ overflow: "hidden" }}>
        <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent("https://firebasestorage.googleapis.com/v0/b/shaganpyo.appspot.com/o/Help.pdf?alt=media&token=4ed5470e-3beb-4c9f-80e1-ff7827ce5b9c")}&embedded=true`} width="100%" height="100%"></iframe>
      </div>
    </div>
  );
}

export default Help;