import "../../AppMobile.css";

interface HamburgerProps {
  setVisible: (param: boolean) => void;
  setHideHeader: (param: boolean) => void;
}

function MobileCloseButton(props: HamburgerProps) {
  return (
    <svg id="_레이어_2" data-name="레이어 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.14 169.14"
      width="25px" height="25px"
      onClick={() => {props.setVisible(false); props.setHideHeader(false)}}>
      <g id="_레이어_1-2" data-name="레이어 1">
        <rect className="cls-1" x="-27.7" y="77.28" width="224.49" height="14.64" transform="translate(84.58 -35) rotate(45)"/>
        <rect className="cls-1" x="-27.65" y="77.23" width="224.49" height="14.64" transform="translate(-35 84.58) rotate(-45)"/>
      </g>
    </svg>
  );
}

export default MobileCloseButton;