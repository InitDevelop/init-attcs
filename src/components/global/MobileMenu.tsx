import { Link } from 'react-router-dom';
import "./MobileMenu.css";
import MobileCloseButton from './MobileCloseButton';

type propType = {
  toggleOpen: () => void;
  isOpened: boolean;
  saveData: () => void;
  openData: () => void;
}

function MobileMenu(props: propType) {
  return (
    <div className='mobile-menu-background'>
      <div className='mobile-menu'>
        <div className='mobile-close-button'
          onClick={() => {props.toggleOpen()}}
        >
          <MobileCloseButton
            setVisible={(a) => {}}
          />
        </div>
        
        <Link className="mobile-menu-link"
          to="/" onClick={props.toggleOpen}>홈</Link>
        <Link className="mobile-menu-link"
          to="/preview" onClick={props.toggleOpen}>시간표</Link>
        <Link className="mobile-menu-link"
          to="/add" onClick={props.toggleOpen}>과목 담기</Link>
        <Link className="mobile-menu-link"
          to="/create" onClick={props.toggleOpen}>자동 생성</Link>
        <Link className="mobile-menu-link"
          to="/settings" onClick={props.toggleOpen}>설정</Link>
        <div className="mobile-menu-link"
          onClick={props.saveData}>저장</div>
        <div className="mobile-menu-link"
          onClick={() => {props.openData(); props.toggleOpen();}}>열기</div>
      </div>
    </div>
  );
}

export default MobileMenu;