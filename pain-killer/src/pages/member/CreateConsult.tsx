import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';


const CraeteConsult = () => {


    return(
        <div>
             <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex justify-between items-center p-5">
                    <div className='flex'>
                        <img src={BackImage} alt="Back"/>
                        <span className="text-lg ml-2">일정 생성</span>
                    </div>
                </nav>
            </header>
            <div className='flex justify-left p-6'>
                    <span className='font-bold'>상담</span>
            </div>
            <form className='flex flex-col items-start gap-2'>
            <span>담당 강사 선택 *</span>
                <div className='flex border rounded-[10px] w-[100px] p-3'>
                    <button className='text-[#6691FF]'>선택하기 +</button>
                </div>



                <span>일자 선택*</span>
                <div className='flex border rounded-[10px]  px-4 py-2 w-[166px]'>
                    <input className='w-full rounded-[10px] ' placeholder='날짜 선택'/>
                    <button>
                        <img
                            src={CalIcon}
                            alt='달력 아이콘'
                        />
                    </button>
                </div>
                <span>시간 선택*</span>
                <div className='flex border rounded-[10px]  px-4 py-2 w-[166px]'>
                    <input className='w-full rounded-[10px] ' placeholder='시작 시각'/>
                    <button>
                        <img
                            src={TimeIcon}
                            alt='달력 아이콘'
                        />
                    </button>
                </div> ~
                <div className='flex border rounded-[10px]  px-4 py-2 w-[166px]'>
                    <input className='w-full rounded-[10px] ' placeholder='종료 시각'/>
                    <button>
                        <img
                            src={TimeIcon}
                            alt='달력 아이콘'
                        />
                    </button>
                </div>
                <span>이름 *</span>
                <input type='text' className='w-3/4 border rounded-[10px] px-4 py-2 text-[13px]' />
                <span>연락처 *</span>
                <input type='number' className='w-3/4 border rounded-[10px] px-4 py-2 text-[13px]' />

                <span>일정 메모</span>
                <textarea
                    className='w-full border rounded-[10px] p-4' 
                    placeholder='내용을 입력해주세요. (500자 이내)'/>
               
                
                <button className='rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4'>완료</button>
            </form>
        </div>
    )

}

export default CraeteConsult