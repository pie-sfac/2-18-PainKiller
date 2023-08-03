import BackImage from '../img/Back_24px.svg';
import Profile from '../assets/Profile_24px.svg';

const ScheduleCheck = () => {

    return(
        <>
            <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex justify-between items-center p-5">
                        <div className='flex'>
                            <img src={BackImage} alt="Back"/>
                            <span className="text-lg ml-2">11시 서태지</span>
                        </div>
                        <div className='flex gap-5'>
                            <span>변경</span>
                            <span>취소</span>
                        </div>
                </nav>
                </header>

                <div className='flex justify-between items-center p-5'>
                    <span >개인 수업 일정</span>
                    <span className='text-[#AEAEAE] text-[10px]'>생성일 2022년 12월 09일 (금) 13시 30분 김파이</span>
                </div>
                <div className='flex justify-left p-5'>
                    <span className='text-left'>수업정보</span>
                </div>
                <div className='flex flex-col items-start gap-3 border rounded-[10px] mx-auto p-5'>
                    <div>
                        <span className='font-bold'>일정 </span>
                        <span>2022.12.23 (금) </span>
                    </div>
                    <div>
                        <span className='font-bold'>시간 </span>
                        <span>16:30 ~ 17:30</span>
                    </div>
                    <div>
                        <span className='font-bold'>정원 </span>
                        <span>1명</span>
                    </div>
                    <div>
                        <span className='font-bold'>강사 </span>
                        <span>박파이</span>
                    </div>
                </div>
                <div className='flex justify-left p-5'>
                    <span className='text-left'>참여인원(1)</span>
                </div>
                <div className='border rounded-[10px] mb-5'>
                    <div className='flex justify-between items-center border-b p-5 pb-5'>
                        <div className='flex gap-3'>
                            <img src={Profile} alt="프사"/>
                            <div className='flex flex-col items-start'>
                                <p>서태지</p>
                                <p>010-0000-0000</p>
                            </div>
                        </div>
                        <div className='flex gap-5 items-center'>
                            <button className='border rounded-[4px] py-2 px-4'>출석</button>
                            <button className='border rounded-[4px] py-2 px-4'>결석</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-start px-8 py-5 gap-2'>
                        <span>출결 상태</span>
                        <span className='font-bold'> 예약 </span>
                        
                        <span>수강권</span>
                        <span className='font-bold'>개인 PT 수강권 </span>
                        
                        <span>잔여</span>
                        <span className='font-bold'>35회(총 50회)</span>
                       
                        <span>예약 가능</span>
                        <span className='font-bold'>30회 (총 50회)</span>
                    </div>
                    <div className='flex justify-between px-8 py-5'>
                        <button className="text-[#6691FF] text-[12px] rounded-[10px] border px-3 py-2">기록 작성하기</button>
                        <button className="text-[#6691FF] text-[12px] rounded-[10px] border px-3 py-2">퍼스널 레포트 보내기</button>
                    </div>
                </div>
        </>
    )
}

export default ScheduleCheck;