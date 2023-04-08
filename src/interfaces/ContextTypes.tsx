import { lecture, lectureGroup } from "./Lecture";
import { scenario } from "./Scenario";
import { xyTuple } from "./Util";

export type previewContextTypes = {
    
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
    tooltipContent: string;
    setTooltipContent: (param: string) => void;
    scrollPosition: number;
    setScrollPosition: (param: number) => void;

    subjHover: boolean;
    setSubjHover: (param: boolean) => void;
    hoveredSubj: lecture;
    setHoveredSubj: (param: lecture) => void;

    isExistingSubj: (lecture: lecture) => boolean;
    handleAllowMultChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    displayPopup: (title: string, content: React.ReactNode) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addSubject: (subject: lecture) => void;
    popSubject: (param: lecture) => void;
}

export type creationContextTypes = {
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
    tooltipContent: string;
    setTooltipContent: (param: string) => void;
}