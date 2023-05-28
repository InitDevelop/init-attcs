import "./Information.css";

export const PreviewSearchLectureHelp = () => {
  return (
    <div className="information">
      <p><strong>시간표에 넣을 강좌를 검색할 수 있습니다. 과목의 약칭을 입력하거나, 교수님의 성함을 포함하여 입력하는 방식으로도 강좌를 검색할 수 있습니다.</strong></p>
      <p>(예)</p>
      <ul>
        <li><p>이영민 교수님의 공학수학 → "영민공수"</p></li>
        <li><p>박형생 교수님의 심리학개론 → "형생심개"</p></li>
        <li><p>유성호 교수님의 죽음의 과학적 이해 → "유성호", "죽과이"</p></li>
        <li><p>서양철학의 이해 → "서철이"</p></li>
      </ul>
      <br/>
      <p><strong>또한, 학년이나 교양/전공 구분, 강의 언어, 강의 요일을 제한하여 검색할 수 있으며, 학과/학부나 단과대학 이름을 포함할 경우 수강분반이나 개설 학과/학부를 제한하여 검색할 수 있습니다.</strong></p>
      <p>(예)</p>
      <ul>
        <li><p>전기정보공학부 2학년 전공필수 → "2학년 전기정보 전필"</p></li>
        <li><p>예술 이름이 들어간 교양 과목 → "예술 교양"</p></li>
        <li><p>금요일에 수업하는 물리학실험 1 → "물실1 금요일"</p></li>
        <li><p>화학생물공학부 학생이 수강할 수 있는 수학 1 → "수1 화학생물"</p></li>
        <li><p>영어로 강의하는 자료구조 → "자료구조 영어"</p></li>
      </ul>
    </div>
  )
}

export const PreviewSearchListHelp = () => {
  return (
    <div className="information">
      <p><strong>검색된 강좌의 목록이 표시됩니다. "추가" 버튼을 클릭하면 강좌가 추가되며, 좌측 시간표에서 해당 강좌의 강의 시간을 확인할 수 있습니다.</strong></p>
      <br/>
      <ul>
        <li><p>수강반 제한 사항이 있는 과목의 경우, <button className="button-tiny">수강반</button>&nbsp;버튼이 표시되며, 이 버튼을 클릭하면 해당 강좌의 수강반 제한 정보를 확인할 수 있습니다.</p></li>
        <li><p>강좌의 강의 언어가 한국어가 아닌 경우, <button className="button-tiny-2">언어</button>&nbsp;버튼이 표시되며, 이 버튼을 클릭하면 해당 강좌의 강의 언어를 확인할 수 있습니다.</p></li>
        <li><p>과목명을 클릭하면 해당 강좌에 대한 상세 정보(강의 형태, 개설 학과, 과정, 추가 정보 등)를 확인할 수 있습니다.</p></li>
        <li><p>같은 과목명을 가진 둘 이상의 강좌를 동시에 담을 수 있습니다.</p></li>
        <li><p>강의 시간이 겹치도록 둘 이상의 강의를 담을 수 있도록 되어 있습니다. 다만, 좌측 시간표에서 해당 과목 시간에 마우스 커서를 올리면 시간이 겹친다는 경고 문구가 표시됩니다.</p></li>
      </ul>
    </div>
  )
}

export const PreviewSelectListHelp = () => {
  return (
    <div className="information">
      <p><strong>시간표에 담은 강좌의 목록이 표시됩니다. "제거" 버튼을 클릭하면 강좌가 제거됩니다.</strong></p>
    </div>
  )
}

export const AddSearchSubjectHelp = () => {
  return (
    <div className="information">
      <p><strong>"과목 담기" 페이지는 시간표를 자동생성하기 위해 과목과 강좌를 담는 곳입니다.</strong></p>
      <br/>
      <p><strong>담을 강좌를 검색할 수 있습니다. 과목의 약칭을 입력하거나, 교수님의 성함을 포함하여 입력하는 방식으로도 강좌를 검색할 수 있습니다.</strong></p>
      <p>(예)</p>
      <ul>
        <li><p>이영민 교수님의 공학수학 → "영민공수"</p></li>
        <li><p>박형생 교수님의 심리학개론 → "형생심개"</p></li>
        <li><p>유성호 교수님의 죽음의 과학적 이해 → "유성호", "죽과이"</p></li>
        <li><p>서양철학의 이해 → "서철이"</p></li>
      </ul>
      <br/>
      <p><strong>또한, 학년이나 교양/전공 구분, 강의 언어, 강의 요일을 제한하여 검색할 수 있으며, 학과/학부나 단과대학 이름을 포함할 경우 수강분반이나 개설 학과/학부를 제한하여 검색할 수 있습니다.</strong></p>
      <p>(예)</p>
      <ul>
        <li><p>전기정보공학부 2학년 전공필수 → "2학년 전기정보 전필"</p></li>
        <li><p>예술 이름이 들어간 교양 과목 → "예술 교양"</p></li>
        <li><p>금요일에 수업하는 물리학실험 1 → "물실1 금요일"</p></li>
        <li><p>화학생물공학부 학생이 수강할 수 있는 수학 1 → "수1 화학생물"</p></li>
        <li><p>영어로 강의하는 자료구조 → "자료구조 영어"</p></li>
      </ul>
    </div>
  )
}

export const AddSubjectListHelp = () => {
  return (
    <div className="information">
      <p><strong>검색된 과목들이 표시됩니다.</strong></p>
      <br/>
      <p><strong>담을 과목을 클릭하여 선택할 수 있으며, 클릭한 과목의 분반들이 오른쪽 "찾은 강좌"에 표시됩니다.</strong></p>
      <p>"과목 검색하기"에서 입력한 제한 조건이 적용되며, "과목 검색하기"에 입력한 조건을 충족하는 분반만 "찾은 강좌"에 표시됩니다.</p>
    </div>
  )
}

export const AddSearchListHelp = () => {
  return (
    <div className="information">
      <p><strong>검색된 강좌의 목록이 표시됩니다.</strong></p>
      <ul>
        <li><p>각 강좌의 왼쪽에 있는 체크박스에 체크하여 오른쪽 "담을 강좌"에 담고자 하는 강좌를 선택할 수 있습니다.</p></li>
        <li><p>나열된 모든 강좌를 한번에 담고자 하는 경우, 왼쪽 하단에 있는 체크박스에 체크하면 표시된 모든 분반을 선택할 수 있습니다.</p></li>
        <li><p>과목에 마우스 커서를 올리면 오른쪽에 해당 강좌의 강의 시간이 표시됩니다.</p></li>
      </ul>
      <br/>
      <p><strong>하단에 있는 큰 버튼을 누르면 선택된 모든 강좌(분반)가 "담은 강좌"에 추가됩니다.</strong></p>
    </div>
  )
}

export const AddedSubjectListHelp = () => {
  return (
    <div className="information">
      <p><strong>검색된 강좌의 목록이 표시됩니다.</strong></p>
      <ul>
        <li><p>각 강좌의 왼쪽에 있는 체크박스에 체크하여 오른쪽 "담을 강좌"에 담고자 하는 강좌를 선택할 수 있습니다.</p></li>
        <li><p>나열된 모든 강좌를 한번에 담고자 하는 경우, 왼쪽 하단에 있는 체크박스에 체크하면 표시된 모든 분반을 선택할 수 있습니다.</p></li>
        <li><p>과목에 마우스 커서를 올리면 오른쪽에 해당 강좌의 강의 시간이 표시됩니다.</p></li>
      </ul>
      <br/>
      <p><strong>하단에 있는 큰 버튼을 누르면 선택된 모든 강좌(분반)가 "담은 강좌"에 추가됩니다.</strong></p>
    </div>
  )
}