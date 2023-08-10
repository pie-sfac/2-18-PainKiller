import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';
import ProfileIcon from '../../assets/Profile_24px.svg'
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'
import React, { useState } from 'react';
import moment from 'moment-timezone';
import instance from '../../api/axios_interceptors';
import { useNavigate } from 'react-router-dom';

registerLocale("ko", ko);


interface ITutorList {
    id: number,
    name: string,
    loginId : string,
    phone: string,
}

const CreateCounseling = () => {

    const navigate = useNavigate();
    
    // 이름, 전화번호, 메모
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [memo, setMemo] = useState("");


    // 데이트피커 날짜 및 시간 값
    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const [selectedStart, setSelectedStart] = useState<Date | null>();
    const [selectedEnd, setSelectedEnd] = useState<Date | null>();

    // 직원 검색
    const [isShowTutor, setIsShowTutor] = useState(false);
    const [searchTutor, setSearchTutor] = useState("");

    const [tutorList, setTutorList] = useState<ITutorList[]>([]);
    const [tutorId, setTutorId] = useState<number>(0);
    const [tutorName, setTutorName] = useState("");

    const onSelectShow = () => {    
        setIsShowTutor(true);
    }

    const onClose = () => {    
        setIsShowTutor(false);
    }

    // 직원불러오기
    const onGetTutorHandler = async(e : React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await instance(`/search?query=${searchTutor}`) 

            setTutorList(response.data.users);

        }catch(error){
            alert(error);
        }
    }

    const onSetTutor = (id : number, name : string) => {
        setTutorId(id);
        setTutorName(name);

        setIsShowTutor(false);
        
        setSearchTutor("");
        setTutorList([]);
    }

    // moment 이용하여 날짜 포맷 작성
    const yyyymmdd = moment.tz(selectedDate, 'Asia/Seoul').format('YYYY-MM-DD');
    const startmmss = moment.tz(selectedStart, 'Asia/Seoul').format('HH:mm:ss.SSS');
    const endmmss = moment.tz(selectedEnd, 'Asia/Seoul').format('HH:mm:ss.SSS');

    // body에 필요한 날짜값 형식으로 변환
    const startAt = `${yyyymmdd}T${startmmss}Z`;
    const endAt = `${yyyymmdd}T${endmmss}Z`;

    const onCouncelHandler = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await instance.post(`/schedules/counseling`, {
      
              userId: tutorId,
              memberId : 0,
              clientName : clientName,
              clientPhone : clientPhone,
              memo : memo,
              startAt: startAt,
              endAt : endAt
            });
      
            console.log(res);

            navigate('/scheduleInfo');
            
          } catch (error) {
            alert(error);
            console.log(error)
          }
    };

    return(
        <>
            <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex justify-between items-center p-5">
                        <div className='flex'>
                            <img src={BackImage} alt="Back"/>
                            <span className="text-lg ml-2">일정 생성</span>
                        </div>
                </nav>
            </header>
            <div className='flex flex-col p-2 gap-5'>
                <div className='flex justify-left'>
                        <span className='font-bold'>상담</span>
                </div>
                <form className='flex flex-col items-start gap-2' onSubmit={onCouncelHandler}>
                    <span>담당 강사 선택</span>
                    { tutorId === 0 ? 
                    <div 
                        className='border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]'
                        onClick={onSelectShow} > 
                        + 선택하기
                     </div>
                     :
                     <div className='flex border rounded-[10px] px-3 py-2 gap-2' onClick={onSelectShow}>
                         <img src={ProfileIcon} alt='프로필 아이콘'/>
                        <div>{tutorName}</div>
                     </div>
                    }
                    
                    
                    
                    <span>일자 선택*</span>
                    <div  className='flex border rounded-[10px] justify-end px-4 py-2 w-[166px]'>
                        <DatePicker
                            placeholderText='날짜 선택'
                            className='flex w-full outline-none'
                            locale="ko"
                            popperPlacement='auto'
                            onChange={(date)=>setSelectedDate(date)}
                            selected={selectedDate}
                            dateFormat='yyyy-MM-dd'
                            withPortal
                        />
                        <img
                            src={CalIcon}
                            alt='달력 아이콘'
                        />    
                    </div>

                    <span>시간 선택*</span>

                    <div  className='flex border rounded-[10px] justify-end px-4 py-2 w-[166px]'>
                        <DatePicker
                            placeholderText='시작 시각'
                            className='flex w-full outline-none'
                            locale="ko"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={10}
                            onChange={(time)=>setSelectedStart(time)}
                            selected={selectedStart}
                            dateFormat='HH:mm'
                            withPortal
                        />
                        <img
                            src={TimeIcon}
                            alt='시계 아이콘'
                        />    
                    </div> ~
                    
                    <div  className='flex border rounded-[10px] justify-end px-4 py-2 w-[166px]'>
                        <DatePicker
                            placeholderText='종료 시각'
                            className='flex w-full outline-none'
                            locale="ko"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={10}
                            onChange={(time)=>setSelectedEnd(time)}
                            selected={selectedEnd}
                            timeCaption='time'
                            dateFormat='HH:mm'
                            withPortal
                        />
                        <img
                            src={TimeIcon}
                            alt='시계 아이콘'
                        />    
                    </div>

                    <span>이름*</span>
                    <div className='flex border rounded-[10px]  px-4 py-2 w-full'>
                        <input 
                        className='w-full outline-none'
                        placeholder='이름을 입력해주세요'
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        type='text'/>
                    </div>
                    <span>연락처*</span>
                    <div className='flex border rounded-[10px]  px-4 py-2 w-full'>
                        <input 
                        className='w-full outline-none'
                        placeholder='000-0000-0000'
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        type='text'/>
                    </div>

                    <span>일정 메모</span>
                    <div className='flex border rounded-[10px]  px-4 py-2 w-full h-[167px]'>
                        <textarea
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            maxLength={500} 
                            className='w-full outline-none' 
                            placeholder='내용을 입력해주세요. (500자 이내)'/>
                    </div>
                    
                    <button className='rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4'>완료</button>
                </form>
            </div>
            {isShowTutor &&
            <>
                <div className='absolute top-0 left-0 bg-[#000000] opacity-90 w-full h-full' onClick={onClose}></div>
                <div className='absolute top-[10%] left-[10%] bg-[#FFFFFF] w-[80%] h-1/2 rounded p-2'>
                    <form
                        className=" px-4 py-1 bg-white rounded-[10px] flex border"
                        onSubmit={onGetTutorHandler}
                    >
                        <input
                            className="flex-1 placeholder:text-xs placeholder:font-normal outline-none"
                            placeholder="직원 이름을 입력하세요"
                            value={searchTutor}
                            onChange={(e) => setSearchTutor(e.target.value)}
                        />
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        >
                            <path
                                d="M13.4765 14.8907C12.4957 15.5892 11.2958 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 11.2958 15.5892 12.4957 14.8907 13.4765L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L13.4765 14.8907ZM14.5 10C14.5 7.51472 12.4853 5.5 10 5.5C7.51472 5.5 5.5 7.51472 5.5 10C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 10Z"
                                fill="#505050"
                            />
                        </svg>
                    </form>
                    <div className='h-[450px] overflow-auto'>
                    {tutorList &&
                    tutorList.map((tutor) => (
                        <div 
                            key={tutor.id} 
                            className='flex border rounded p-2 mt-2 justify-between items-center text-[13px]'
                            onClick={() => onSetTutor(tutor.id, tutor.name)}>
                            <div className='flex gap-2 items-center'>
                                <img src={ProfileIcon} alt='프로필 아이콘'/>
                                <div>{tutor.name}({tutor.loginId})</div>
                            </div>
                            <div>{tutor.phone}</div>
                        </div>
                    ))
                    }
                    </div>
                </div>
            </>
            }
        </>


    )

}

export default CreateCounseling;