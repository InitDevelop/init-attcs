import "../../AppMobile.css";

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

function MobileMenuButton(props: HamburgerProps) {
  return (
    <svg className="hamburger-menu" id="_레이어_2" data-name="레이어 2"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 76"
      width="25" height="25"
      onClick={props.onClick}>
      <g id="_레이어_1-2" data-name="레이어 1">
        <rect className="cls-1" width="85" height="5.56" />
        <rect className="cls-1" y="35.22" width="85" height="5.56" />
        <rect className="cls-1" y="70.44" width="85" height="5.56" />
      </g>
    </svg>
  );
}

export default MobileMenuButton;