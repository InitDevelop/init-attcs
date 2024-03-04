import { useSelector } from "react-redux";
import { getWarnings } from "../create/CreateScenarios";
import "./WarningPanel.css";
import { combinedStateType } from "../../reducers";
import WarningBox from "./WarningBox";

export const WarningPanel = () => {
  const addedLectures = useSelector((state: combinedStateType) => state.addedLecturesReducer.addedLectures);

  return (
    <div className='default-box warning-panel-box'>
      <div className='container-title'>시간표 분석 보고서</div>
      <div className="top-margin-20">
        {
          getWarnings({ lectures: addedLectures, shareTimeLectures: [], warnings: [], priority: 0 })
            .filter(w => w.isCritical).map(warning => <WarningBox warning={warning} subjectIDs={addedLectures.map(lect => lect.subjectID)}/>)
        }
      </div>

    </div>
  );
}