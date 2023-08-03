import homeIcon from '../../assets/home.svg';
import homeIcon_active from '../../assets/home_active.svg';

import scheduleIcon from '../../assets/schedule.svg';
import scheduleIcon_active from '../../assets/schedule_active.svg';

import memberIcon from '../../assets/member.svg';
import memberIcon_active from '../../assets/member_active.svg';

import centerIcon from '../../assets/center.svg';
import centerIcon_active from '../../assets/center_active.svg';

import mypageIcon from '../../assets/mypage.svg';
import mypageIcon_active from '../../assets/mypage_active.svg';
import { Link, useMatch } from 'react-router-dom';




const FooterBar = () => {

    const homeMatch = useMatch("/");
    const scheduleMatch = useMatch("/scheduleInfo");
    const memberMatch = useMatch("/memberInfo");
    const centerMatch = useMatch("/centerInfo");
    const mypageMatch = useMatch("/myPage");

    // 경로만 수정해서 적용
    
    return(
        <div className="p-3 flex justify-between">
            {/* 홈으로 */}
            <div className='flex flex-col justify-center items-center'>
                <Link to = "/">
                    <img 
                        src={homeMatch ? homeIcon_active : homeIcon}
                        alt="홈"
                        className="w-[25px] h-[25px] cursor-pointer"/>
                </Link>
                <p className='text-[10px] text-[#1D1D1D]'>홈</p>
            </div>

             {/* 일정관리로*/}
            <div className='flex flex-col justify-center items-center'>
                <Link to = '/scheduleInfo'>
                    <img
                        src={scheduleMatch ? scheduleIcon_active : scheduleIcon}
                        alt = "일정 관리"
                        className='w-[25px] h-[25px] cursor-pointer'
                    />
                </Link>
                <p className='text-[10px] text-[#1D1D1D]'>일정 관리</p>
            </div>

             {/* 회원관리로 */}
            <div className='flex flex-col justify-center items-center'>
                <Link to = '/memberInfo'>
                    <img
                        src={memberMatch ? memberIcon_active : memberIcon}
                        alt = "회원 관리"
                        className='w-[25px] h-[25px] cursor-pointer'
                    />
                </Link>
                <p className='text-[10px] text-[#1D1D1D]'>회원 관리</p>
            </div>

             {/* 센터관리로 */}
            <div className='flex flex-col justify-center items-center'>
                <Link to = "/centerInfo">
                    <img
                        src={centerMatch ? centerIcon_active : centerIcon}
                        alt = "센터 관리"
                        className='w-[25px] h-[25px] cursor-pointer'
                    />
                </Link>
                <p className='text-[10px] text-[#1D1D1D]'>센터 관리</p>
            </div>

             {/* 마이페이지로 */}
            <div className='flex flex-col justify-center items-center'>
                <Link to = "/myPage">
                    <img
                        src={mypageMatch ? mypageIcon_active : mypageIcon}
                        alt = "마이페이지"
                        className='w-[25px] h-[25px] cursor-pointer'
                    />
                </Link>
                <p className='text-[10px] text-[#1D1D1D]'>마이페이지</p>
            </div>
    </div>
    )
}

export default FooterBar;