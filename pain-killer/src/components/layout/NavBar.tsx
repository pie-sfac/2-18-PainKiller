import { useState } from 'react';
import hamburgerIcon from '../../assets/hamburger_button_menu_icon.svg';
import notiIcon from '../../assets/notifications.svg';
import BackImage from '../../img/Back_24px.svg';
import { useMatch } from 'react-router-dom';

const NavBar = () => {
  const [menuOn, setMenuOn] = useState(false);

  const onMenuShow = () => {
    setMenuOn((prev) => !prev);
  };

  const onNotiShow = () => {
    console.log('알림 표시');
  };

  const homeMatch = useMatch('/');
  const scheduleMatch = useMatch('/scheduleInfo');
  const memberMatch = useMatch('/memberInfo');
  const centerMatch = useMatch('/centerInfo');
  const mypageMatch = useMatch('/myPage');

  // 추후 작업

  return (
    <div>
      {menuOn ? (
        <div className="z-10 absolute bg-black opacity-90 w-[90%] h-full flex flex-col p-5 gap-7 items-start">
          <img
            src={BackImage}
            alt="뒤로 버튼"
            onClick={onMenuShow}
            className="w-[25px] h-[25px] cursor-pointer text-white hover:bg-[#bebebe] rounded"
          />
          <ul className="text-[#ffffff]">
            {homeMatch && <li>홈 메뉴</li>}
            {scheduleMatch && <li>일정 관리 메뉴</li>}
            {memberMatch && <li>회원 관리 메뉴</li>}
            {centerMatch && (
              <>
                <li>센터 관리 메뉴</li>
              </>
            )}
            {mypageMatch && (
              <>
                <li>마이 페이지 메뉴</li>
              </>
            )}
          </ul>
        </div>
      ) : (
        <div className="p-2 flex justify-between">
          <img
            src={hamburgerIcon}
            alt="메뉴 버튼"
            onClick={onMenuShow}
            className="w-[25px] h-[25px] cursor-pointer text-white hover:bg-[#bebebe] rounded"
          />
          <img
            src={notiIcon}
            alt="알림 표시"
            onClick={onNotiShow}
            className="w-[25px] h-[25px] cursor-pointer hover:bg-[#bebebe] rounded"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
