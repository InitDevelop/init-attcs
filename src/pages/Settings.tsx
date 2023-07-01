import { useContext, useState } from 'react';
import { CreationContext } from "../App";
import "../AppMobile.css";
import PriorityManager from '../components/settings/PriorityManager';
import CustomLecture from '../components/settings/CustomLectures';

function Settings() {

  const [updateCount, setUpdateCount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<number>(0);

  const data = useContext(CreationContext);

  return (
    !data.isMobile ?
      <div className="app-main-container">
        <div className='app-parent-container' style={{ width: "45%" }}>
          <PriorityManager
            updateCount={updateCount}
            setUpdateCount={setUpdateCount}
          />
        </div>

        <div className='app-parent-container' style={{ width: "45%" }}>
          <CustomLecture/>
        </div>
      </div>
    :
      <div className="app-main-container" style={{ height: "90vh" }}>
        <br/>
        <div style={{ margin: "0px 10px", textAlign: "left" }}>
          <button className={viewMode === 0 ? 'flat-button-selected' : 'flat-button'}
            onClick={() => setViewMode(0)}>자동생성 우선순위 규칙</button>
          <button className={viewMode === 1 ? 'flat-button-selected' : 'flat-button'}
            onClick={() => setViewMode(1)}>나만의 일정</button>
        </div>
        {
          viewMode === 0 ?
            <PriorityManager
              updateCount={updateCount}
              setUpdateCount={setUpdateCount}
            />
          :
            <CustomLecture/>
        }
        <br/>
      </div>
  );
}

export default Settings;