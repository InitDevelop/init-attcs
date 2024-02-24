import './MenuBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../img/logo.png';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { useState } from 'react';

export const MenuBar = () => {
  const location = useLocation();

  const [renderToggle, setRenderToggle] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    if (auth?.currentUser?.email !== undefined) {  // Currently logged in
      try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    } else {  // Currently not logged in
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (err) {
        console.error(err);
      }
    }
    setRenderToggle(!renderToggle);
  }

  return (
    <div className='menubar'>
      <div className="menubar-left">
        <Link className='menubar-logo' to='/'>
          <img className='menubar-logo-image' src={logo} alt=""/>
        </Link>
        <Link className={
          location.pathname === '/' ?
          'menubar-item-current'
          : 'menubar-item'
        } to='/'>
          강좌 검색하기
        </Link>
        <Link className={
          location.pathname === '/timetable' ?
          'menubar-item-current'
          : 'menubar-item'
        } to='/timetable'>
          강좌 담기
        </Link>
        <Link className={
          location.pathname === '/create' ?
          'menubar-item-current'
          : 'menubar-item'
        } to='/create'>
          시간표 생성하기
        </Link>
      </div>
      <div className="menubar-right">
        {
          (auth?.currentUser?.email !== undefined) ?
          <div className="user-area">
            <img className='user-image' src={
              (auth?.currentUser?.photoURL !== undefined && auth?.currentUser?.photoURL !== null) ? auth.currentUser.photoURL : ""
            }></img>
            <div style={{ height: "100%" }}>
              {auth?.currentUser?.displayName}
            </div>
          </div>
          :
          <></>
        }

        <div className='menubar-item' onClick={signInWithGoogle}>
          {
            (auth?.currentUser?.email !== undefined) ?
            "로그아웃" : "로그인"
          }
        </div>
      </div>
    </div>
  );
}