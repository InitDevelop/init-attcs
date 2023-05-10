import { Link } from 'react-router-dom';
import "./MobileMenu.css";
import MobileCloseButton from './MobileCloseButton';

type propType = {
  toggleOpen: () => void;
  isOpened: boolean;
}

function MobileMenu(props: propType) {
  return (
    <div className={props.isOpened ? 'mobile-menu' : 'mobile-menu-closed'}>
      {
        props.isOpened && (
          <>
                    <div
            style = {
              {
                position: "absolute",
                top: "15px",
                right: "20px"
              }
            }
            onClick={() => {props.toggleOpen()}}
          >
            <MobileCloseButton
              setVisible={(a) => {}}
            />
          </div>
          
          <Link className="mobile-menu-link"
            to="/" onClick={props.toggleOpen}>시간표</Link>
          <Link className="mobile-menu-link"
            to="/add" onClick={props.toggleOpen}>과목 담기</Link>
          <Link className="mobile-menu-link"
            to="/create" onClick={props.toggleOpen}>자동 생성</Link>
          <Link className="mobile-menu-link"
            to="/settings" onClick={props.toggleOpen}>설정</Link>
          </>          
        )
      }
      </div>
      
  );
}

export default MobileMenu;