import React from 'react'
import "../../App.css";
import "./MobilePreviewMenu.css"

type propType = {
  //totalCredit: number;
  setAddMenuVisible: (param: boolean) => void;
  setRemoveMenuVisible: (param: boolean) => void;
};

function MobilePreviewMenu(props: propType) {
  return (
    <div className='preview-menu-container'>
      <button className='button-0'
      onClick={() => props.setAddMenuVisible(true)}>
        강좌 추가하기
      </button>
      <button className='button-0'
      onClick={() => props.setRemoveMenuVisible(true)}>
        강좌 제거하기
      </button>
    </div>
  )
}

export default MobilePreviewMenu