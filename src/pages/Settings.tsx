import { useContext, useState } from 'react';
import { CreationContext } from "../App";
import "../AppMobile.css";
import PriorityManager from '../components/settings/PriorityManager';
import CustomLecture from '../components/settings/CustomLectures';

function Settings() {

  const [updateCount, setUpdateCount] = useState<number>(0);

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
      <div className="app-main-container">
        <div className='app-parent-container' style={{ width: "100%" }}>
          <PriorityManager
            updateCount={updateCount}
            setUpdateCount={setUpdateCount}
          />
        </div>
        <div style={{ marginTop: "20px" }}/>
        <div className='app-parent-container' style={{ width: "100%" }}>
          <CustomLecture/>
        </div>
      </div>
  );
}

export default Settings;