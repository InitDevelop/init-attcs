import "../../AppMobile.css";
import menuIcon from "../../img/menu.png";


interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

function MobileMenuButton(props: HamburgerProps) {
  return (
    <img src={menuIcon} alt={"menu"} className="hamburger-menu"
      width={"25px"} height={"25px"}
      onClick={props.onClick}>
    </img>
  );
}

export default MobileMenuButton;