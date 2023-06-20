export default interface LectureRaw {
  id: string;               // 과목 일련 번호
  classification: string;   // 교과목 구분 (교양, 전필, 전선 등)
  college: string;          // 단과대학
  department: string;       // 학부/학과
  graduate: string;         // 과정 (학사, 석사, 박사, 석박사통합)
  year: string;             // 학년
  subjectID: string;        // 과목 고유 번호
  lectureID: string;        // 강좌 번호
  subjectTitle: string;     // 과목명
  subjectSubtitle: string;  // 과목 부제목
  credit: string;           // 학점
  creditLecture: string;    // 이론 학점
  creditLab: string;        // 실습 학점
  time: string;             // 시간
  lectureForm: string;      // 강의 형태
  lectureRoom: string;      // 강의 장소
  lecturer: string;         // 교수님 / 강사
  quota: string;            // 강의 정원
  extraInfo: string;        // 비고
  language: string;         // 강의 언어
}