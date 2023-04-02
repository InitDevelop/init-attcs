import { lecture } from "./Lecture";
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
    handlePopSubject: (subject: lecture) => void;
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
    
    addedLectureList: lecture[];
    setAddedLectureList: (param: lecture[]) => void;
    addedLectures: lecture[];
    setAddedLectures: (param: lecture[]) => void;
    addedSubjectIDs: string[];
    setAddedSubjectIDs: (param: string[]) => void;
    addedSubj: lecture[];
    setAddedSubj: (param: lecture[]) => void;

    showPopup: boolean;
    setShowPopup: (param: boolean) => void;
    popupTitle: string;
    setPopupTitle: (param: string) => void;
    popupContent: React.ReactNode;
    setPopupContent: (param: React.ReactNode) => void;
    isExistingSubj: (lecture: lecture) => boolean;

    subjHover: boolean;
    setSubjHover: (param: boolean) => void;
    hoveredSubj: lecture;
    setHoveredSubj: (param: lecture) => void;

    displayPopup: (title: string, content: React.ReactNode) => void;
    popAddedLecture: (lectureToPop: lecture) => void;
    isExistingAddedLect: (subject: lecture) => boolean;
    addAddSubject: (lecture: lecture) => void;
    handleAddInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddKeywordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}