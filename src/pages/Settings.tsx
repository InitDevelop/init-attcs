import { useContext, useState } from 'react';
import CreationOptions from '../components/preview/CreationOptions';
import SubjectSearchList from '../components/preview/SubjectSearchList';
import SubjectSelectList from '../components/preview/SubjectSelectList';
import TimeTable from '../components/preview/TimeTable';
import { PreviewContext } from "../App";

import "../AppMobile.css";
import MobilePreviewMenu from '../components/preview/MobilePreviewMenu';
import PreviewAddMenu from '../components/preview/PreviewAddMenu';
import PreviewRemoveMenu from '../components/preview/PreviewRemoveMenu';
import PriorityManager from '../components/settings/PriorityManager';

function Settings() {

  const [updateCount, setUpdateCount] = useState<number>(0);

  const data = useContext(PreviewContext);

  return (
    !data.isMobile ?
    <div className="app-main-container">
      <div className='app-parent-container'>
        <PriorityManager
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      </div>

      <div className='app-parent-container'>

      </div>

      <div className='app-parent-container'>

      </div>
    </div>
    :
    <div className="app-main-container">
      <div className='app-parent-container'>

      </div>
    </div>
  );
}

export default Settings;