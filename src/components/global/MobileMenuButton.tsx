import "../../AppMobile.css";

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

function MobileMenuButton(props: HamburgerProps) {
  return (
    <svg className="hamburger-menu" viewBox="0 0 100 80" width="40" height="40" onClick={props.onClick}>
    <rect width="100" height="15" rx="8" className={props.open ? "line line-1 open" : "line line-1"} />
    <rect y="30" width="100" height="15" rx="8" className={props.open ? "line line-2 open" : "line line-2"} />
    <rect y="60" width="100" height="15" rx="8" className={props.open ? "line line-3 open" : "line line-3"} />
  </svg>
  );
}

export default MobileMenuButton;