import { useContext, useState } from 'react';
import { PreviewContext } from "../App";
import "../AppMobile.css";
import PriorityManager from '../components/settings/PriorityManager';
import Help from '../components/settings/Help';

function Settings() {

  const [updateCount, setUpdateCount] = useState<number>(0);

  const data = useContext(PreviewContext);

  return (
    !data.isMobile ?
      <div className="app-main-container">
        <div className='app-parent-container' style={{ width: "35%" }}>
          <PriorityManager
            updateCount={updateCount}
            setUpdateCount={setUpdateCount}
          />
        </div>

        <div className='app-parent-container' style={{ width: "55%" }}>
          <Help/>
        </div>
      </div>
    :
      <div className="app-main-container">
        <div className='app-parent-container'>
          <br/>
          <h1>모바일 버전은 준비중입니다!</h1>
        </div>
      </div>
  );
}

export default Settings;