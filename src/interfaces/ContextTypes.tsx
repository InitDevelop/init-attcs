import { blankLecture, lecture, lectureGroup } from "./Lecture";
import { scenario } from "./Scenario";
import { xyTuple } from "./Util";

export type previewContextTypes = {
  isMobile: boolean;

  selSubj: lecture[];
  setSelSubj: (lect: lecture[]) => void;

  allowMult: boolean;
  setAllowMult: (param: boolean) => void;
  keyWord: string;
  setKeyWord: (param: string) => void;
  searchText: string;
  setSearchText: (param: string) => void;

  showPopup: boolean;
  setShowPopup: (param: boolean) => void;
  popupTitle: string;
  setPopupTitle: (param: string) => void;
  popupContent: React.ReactNode;
  setPopupContent: (param: React.ReactNode) => void;

  showTooltip: boolean;
  setShowTooltip: (param: boolean) => void;
  tooltipPosition: xyTuple;
  setTooltipPosition: (param: xyTuple) => void;
  tooltipContent: React.ReactNode;
  setTooltipContent: (param: React.ReactNode) => void;
  scrollPosition: number;
  setScrollPosition: (param: number) => void;

  subjHover: boolean;
  setSubjHover: (param: boolean) => void;
  hoveredSubj: lecture;
  setHoveredSubj: (param: lecture) => void;

  isExistingSubj: (lecture: lecture) => boolean;
  handleAllowMultChange: () => void;
  displayPopup: (title: string, content: React.ReactNode) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addSubject: (subject: lecture) => void;
  popSubject: (param: lecture) => void;
}



export type creationContextTypes = {
  isMobile: boolean;

  addingSubjName: string;
  setAddingSubjName: (param: string) => void;
  clickedSubject: string;
  setClickedSubject: (param: string) => void;
  addedSubjKeyWord: string;
  setAddedSubjKeyWord: (param: string) => void;

  showPopup: boolean;
  setShowPopup: (param: boolean) => void;
  popupTitle: string;
  setPopupTitle: (param: string) => void;
  popupContent: React.ReactNode;
  setPopupContent: (param: React.ReactNode) => void;
  isExistingSubj: (lecture: lecture) => boolean;

  relatedLectures: lecture[];
  setRelatedLectures: (param: lecture[]) => void;

  addLectureToGroup: (param: lecture) => void;
  removeLectureFromGroup: (param: lecture) => void;

  lectureGroups: lectureGroup[];
  setLectureGroups: (param: lectureGroup[]) => void;

  includesLecture: (param: lecture) => boolean;

  subjHover: boolean;
  setSubjHover: (param: boolean) => void;
  hoveredSubj: lecture;
  setHoveredSubj: (param: lecture) => void;

  scenarios: scenario[];
  setScenarios: (param: scenario[]) => void;
  scenarioNumber: number;
  setScenarioNumber: (param: number) => void;

  displayPopup: (title: string, content: React.ReactNode) => void;
  handleAddInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  showTooltip: boolean;
  setShowTooltip: (param: boolean) => void;
  tooltipPosition: xyTuple;
  setTooltipPosition: (param: xyTuple) => void;
  tooltipContent: React.ReactNode;
  setTooltipContent: (param: React.ReactNode) => void;
}

export const defaultPreviewContext = {
  isMobile: false,
  
  selSubj: [],
  setSelSubj: function (lect: lecture[]): void {
    throw new Error('Function not implemented.');
  },
  allowMult: false,
  setAllowMult: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  keyWord: '',
  setKeyWord: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  searchText: '',
  setSearchText: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  showPopup: false,
  setShowPopup: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  popupTitle: '',
  setPopupTitle: function (param: string): void {
    throw new Error('Function not implemented.');
  },
  popupContent: <></>,
  setPopupContent: function (param: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  showTooltip: false,
  setShowTooltip: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  tooltipPosition: {x: 0, y: 0},
  setTooltipPosition: function (param: xyTuple): void {
    throw new Error('Function not implemented.');
  },
  tooltipContent: <></>,
  setTooltipContent: function (param: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  scrollPosition: 0,
  setScrollPosition: function (param: number): void {
    throw new Error('Function not implemented.');
  },
  subjHover: false,
  setSubjHover: function (param: boolean): void {
    throw new Error('Function not implemented.');
  },
  hoveredSubj: blankLecture,
  setHoveredSubj: function (param: lecture): void {
    throw new Error('Function not implemented.');
  },
  isExistingSubj: function (lecture: lecture): boolean {
    throw new Error('Function not implemented.');
  },
  handleAllowMultChange: function (): void {
    throw new Error('Function not implemented.');
  },
  displayPopup: function (title: string, content: React.ReactNode): void {
    throw new Error('Function not implemented.');
  },
  handleInputChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  handleKeywordChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  addSubject: function (subject: lecture): void {
    throw new Error('Function not implemented.');
  },
  popSubject: function (subject: lecture): void {
    throw new Error('Function not implemented.');
  }
};

export const defaultCreationContext = {
  isMobile: false,

  addingSubjName: '',
  setAddingSubjName: function (param: string): void {
      throw new Error('Function not implemented.');
  },
  clickedSubject: '',
  setClickedSubject: function (param: string): void {
      throw new Error('Function not implemented.');
  },
  addedSubjKeyWord: '',
  setAddedSubjKeyWord: function (param: string): void {
      throw new Error('Function not implemented.');
  },
  showPopup: false,
  setShowPopup: function (param: boolean): void {
      throw new Error('Function not implemented.');
  },
  popupTitle: '',
  setPopupTitle: function (param: string): void {
      throw new Error('Function not implemented.');
  },
  popupContent: undefined,
  setPopupContent: function (param: React.ReactNode): void {
      throw new Error('Function not implemented.');
  },
  isExistingSubj: function (lecture: lecture): boolean {
      throw new Error('Function not implemented.');
  },
  addLectureToGroup: function (param: lecture): void {
      throw new Error('Function not implemented.');
  },
  removeLectureFromGroup: function (param: lecture): void {
      throw new Error('Function not implemented.');
  },
  lectureGroups: [],
  includesLecture: function (param: lecture): boolean {
      throw new Error('Function not implemented.');
  },
  subjHover: false,
  setSubjHover: function (param: boolean): void {
      throw new Error('Function not implemented.');
  },
  hoveredSubj: blankLecture,
  setHoveredSubj: function (param: lecture): void {
      throw new Error('Function not implemented.');
  },
  displayPopup: function (title: string, content: React.ReactNode): void {
      throw new Error('Function not implemented.');
  },
  handleAddInputChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
  },
  handleAddKeywordChange: function (event: React.ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
  },
  setLectureGroups: function (param: lectureGroup[]): void {
      throw new Error('Function not implemented.');
  },
  scenarios: [],
  setScenarios: function (param: scenario[]): void {
      throw new Error('Function not implemented.');
  },
  scenarioNumber: 0,
  setScenarioNumber: function (param: number): void {
      throw new Error('Function not implemented.');
  },
  showTooltip: false,
  setShowTooltip: function (param: boolean): void {
      throw new Error('Function not implemented.');
  },
  tooltipPosition: { x: 0, y: 0 },
  setTooltipPosition: function (param: xyTuple): void {
      throw new Error('Function not implemented.');
  },
  tooltipContent: <></>,
  setTooltipContent: function (param: React.ReactNode): void {
      throw new Error('Function not implemented.');
  },
  relatedLectures: [],
  setRelatedLectures: function (param: lecture[]): void {
      throw new Error('Function not implemented.');
  }
};