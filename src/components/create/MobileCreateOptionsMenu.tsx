import "./../preview/PreviewMenu.css";
import "../../App.css";
import MobileCloseButton from "../global/MobileCloseButton";
import CreationViewPanel from "./CreationViewPanel";
import { Scenario } from "../../util/Scenario";

type propType = {
  setCreateMenuVisible: (param: boolean) => void;
  setHideHeader: (param: boolean) => void;
  setIsLoading: (param: boolean) => void;
  setScenarios: (param: Scenario[]) => void;
  setCurrentCombination: (param: number) => void;
  setTotalCombinations: (param: number) => void;
  setValidCombinations: (param: number) => void;
  updateCount: number;
  setUpdateCount: (param: number) => void;
}

function MobileCreateOptionsMenu(props: propType) {
  return (
    <div className='create-menu-screen'>
      <div className='app-parent-container'>
        <CreationViewPanel
          setIsLoading={props.setIsLoading}
          setScenarios={props.setScenarios}
          setCurrentCombination={props.setCurrentCombination}
          setTotalCombinations={props.setTotalCombinations}
          setValidCombinations={props.setValidCombinations}
        />
      </div>
      <div
        style = {
          {
            position: "absolute",
            top: "15px",
            right: "20px"
          }
        }
      >
        <MobileCloseButton
          setVisible={props.setCreateMenuVisible}
          setHideHeader={props.setHideHeader}
        />
      </div>
    </div>
  )
}

export default MobileCreateOptionsMenu;