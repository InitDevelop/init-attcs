import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuBar } from './components/global/MenuBar';
import { Home } from "./pages/Home";
import { useSelector } from "react-redux";
import { combinedStateType } from "./reducers";
import Popup from "./components/popup/Popup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Add } from "./pages/Add";
import { Create } from "./pages/Create";

export const YEAR = 2024;
export const SEMESTER = 1;
export const SEASON = 1; // 정규학기는 1, 계절학기는 2
export const UPDATE = "2024. 01. 09.";

const App = () => {
  const displayPopup = useSelector((state: combinedStateType) => state.popupReducer.displayPopup);
  const popupType = useSelector((state: combinedStateType) => state.popupReducer.popupType);
  const popupTitle = useSelector((state: combinedStateType) => state.popupReducer.popupTitle);
  const popupContent = useSelector((state: combinedStateType) => state.popupReducer.popupContent);
  const useCloseButton = useSelector((state: combinedStateType) => state.popupReducer.useCloseButton);
  const popupLectures = useSelector((state: combinedStateType) => state.popupReducer.popupLectures);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Escape') {
        if (displayPopup === true) {
          dispatch({
            type: "SET_DISPLAY_POPUP",
            payload: {
              displayPopup: false,
            }
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <BrowserRouter>
      <MenuBar/>
      <Routes>
        <Route path="/"
          element={
            <Home/>
          }
        />
        <Route path="/timetable"
          element={
            <Add/>
          }
        />
        <Route path="/create"
          element={
            <Create/>
          }
        />
      </Routes>
      {
        displayPopup &&
        <Popup title={popupTitle} content={popupContent} displayCloseButton={useCloseButton} type={popupType} lectures={popupLectures} />
      }
    </BrowserRouter>
  )
}

export default App;

const Display = (props: {text: string}) => {
  return <div>{props.text}</div>
}