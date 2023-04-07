import React from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";

type propType = {
  toggleOpen: () => void;
}

function MobileMenu(props: propType) {
  return (
    <div className='mobile-menu'>
      <Link className="mobile-menu-link"
        to="/" onClick={props.toggleOpen}>시간표</Link>
      <Link className="mobile-menu-link"
        to="/add" onClick={props.toggleOpen}>과목 담기</Link>
      <Link className="mobile-menu-link"
        to="/create" onClick={props.toggleOpen}>자동 생성</Link>
    </div>
  );
}

export default MobileMenu;