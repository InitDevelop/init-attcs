import { Warning, dateValueToDate } from "../../util/Util";
import "../popup/Popup.css";
import { colors } from "./Timetable";

const getDisplayOrder = (timeSlotID: string, subjectIDs: string[]) => {
  return subjectIDs.indexOf(timeSlotID);
}

export const getLabelStyle = (order: number): React.CSSProperties => {
  return {
    fontWeight: "500",
    backgroundColor: colors[order % colors.length],
    color: "#fff",
    padding: "3px",
  };
}

const getDistanceWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }} colSpan={3}>
            <h3 className="key">이동 동선에 주의해야 하는 모든 경우</h3>
          </td>
        </tr>
        {
          warning.extraInfo.map( lectPair =>
            <>
            <tr>
              <td style={getLabelStyle(getDisplayOrder(lectPair[0].subjectID, subjectIDs))}>{lectPair[0].subjectTitle}</td>
              <td rowSpan={2}>{" → "}</td>
              <td style={getLabelStyle(getDisplayOrder(lectPair[1].subjectID, subjectIDs))}>{lectPair[1].subjectTitle}</td>
            </tr>
            <tr>
              <td>{" " + lectPair[0].time.split("/")[lectPair[0].slotOrder]}</td>
              <td>{" " + lectPair[1].time.split("/")[lectPair[1].slotOrder]}</td>
            </tr>
            </>
          )
        }
      </tbody>
    </table>
  );
}

const getEmptyWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }}>
            <h3 className="key">공강인 요일 목록</h3>
          </td>
        </tr>
        {
          [0, 1, 2, 3, 4].map( n => 
            <>
            {
              warning.extraInfo[n].length > 0 &&
              <tr>
                <td>
                  <h3 className="value">{dateValueToDate(n)}</h3>
                </td>
              </tr>
            }
            </>
          )
        }
      </tbody>
    </table>
  );
}

const getLunchWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }}>
            <h3 className="key">점심 식사 시간이 부족한 요일</h3>
          </td>
        </tr>
        {
          [0, 1, 2, 3, 4].map( n => 
            <>
            {
              warning.extraInfo[n].length > 0 &&
              <tr>
                <td>
                  <h3 className="value">{dateValueToDate(n)}</h3>
                </td>
              </tr>
            }
            </>
          )
        }
      </tbody>
    </table>
  );
}

const getMorningWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }}>
            <h3 className="key">이른 아침 수업이 있는 요일</h3>
          </td>
        </tr>
        {
          [0, 1, 2, 3, 4].map( n => 
            <>
            {
              warning.extraInfo[n].length > 0 &&
              <tr>
                <td>
                  <h3 className="value">{dateValueToDate(n)}</h3>
                </td>
              </tr>
            }
            </>
          )
        }
      </tbody>
    </table>
  );
}

const getSpaceWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }} colSpan={3}>
            <h3 className="key">두 수업 사이 간격이 30분 이하인 모든 경우</h3>
          </td>
        </tr>
        {
          warning.extraInfo.map( lectPair =>
            <>
            <tr>
              <td style={getLabelStyle(getDisplayOrder(lectPair[0].subjectID, subjectIDs))}>{lectPair[0].subjectTitle}</td>
              <td rowSpan={2}>{" → "}</td>
              <td style={getLabelStyle(getDisplayOrder(lectPair[1].subjectID, subjectIDs))}>{lectPair[1].subjectTitle}</td>
            </tr>
            <tr>
              <td>{" " + lectPair[0].time.split("/")[lectPair[0].slotOrder]}</td>
              <td>{" " + lectPair[1].time.split("/")[lectPair[1].slotOrder]}</td>
            </tr>
            </>
          )
        }
      </tbody>
    </table>
  );
}

const getCountWarningInfo = (warning: Warning, subjectIDs: string[]) => {
  return (
    <table className="lectureinfo-table">
      <tbody>
        <tr>
          <td style={{ backgroundColor: "#eee" }}>
            <h3 className="key">요일별 총 수업 시간(분)의 표준편차 (90분 기준)</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="value">{warning.weight.toFixed(2)}분</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function WarningInformationTable(warning: Warning, subjectIDs: string[]) {
  if (warning.warningType === "count") {
    return (
      getCountWarningInfo(warning, subjectIDs)
    );
  } else if (warning.warningType === "empty") {
    return (
      getEmptyWarningInfo(warning, subjectIDs)
    );
  } else if (warning.warningType === "lunch") {
    return (
      getLunchWarningInfo(warning, subjectIDs)
    );
  } else if (warning.warningType === "morning") {
    return (
      getMorningWarningInfo(warning, subjectIDs)
    );
  } else if (warning.warningType === "space") {
    return (
      getSpaceWarningInfo(warning, subjectIDs)
    );
  } else if (warning.warningType === "time") {
    return (
      getDistanceWarningInfo(warning, subjectIDs)
    );
  } else {
    return <></>;
  }
}
