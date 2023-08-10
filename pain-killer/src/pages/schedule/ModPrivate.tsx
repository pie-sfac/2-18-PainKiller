import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';
import ProfileIcon from '../../assets/Profile_24px.svg'
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import instance from '../../api/axios_interceptors';
import { useNavigate, useParams } from 'react-router-dom';


interface IPrivateSchedules {
    id: number;
    tutor: {
      id: number;
      name: string;
    };
    lessonId : number;
    maxGroupMember : number;
    startAt: string;
    endAt: string;
    memo: string;
    issuedTicket: {
      id: number;
      lessonType: string;
      title: string;
      startAt: string;
      endAt: string;
      remainingCount: number;
      defaultCount: number;
      serviceCount: number;
      availableReservationCount: number;
      defaultTerm: number;
      defaultTermUnit: string;
      isSuspended: boolean;
      suspendedAt: string;
      isCanceled: boolean;
      canceledAt: string;
      createdAt: string;
      updatedAt: string;
    };
    attendanceHistories: [
      {
        id: number;
        member: {
          id: number;
          name: string;
          phone: string;
        };
        status: string;
      },
    ];
    createdAt: string;
    createdBy: {
        id :  number,
        name: string
      },
    updatedAt: string;
    updatedBy: {
        id : number,
        name : string
      }
  }

const ModPrivate = () => {
    
    const {lessonId} = useParams();
    const navigate = useNavigate();
    
    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const [selectedStart, setSelectedStart] = useState<Date | null>();
    const [selectedEnd, setSelectedEnd] = useState<Date | null>();

    // 개인수업 데이터 상태값
    const [lessonData, setLessonData] = useState<IPrivateSchedules>();

    // 개인수업 정보 불러오기
    const getLesson = async () => {
        try {
            const res = await instance.get(`/schedules/private-lesson/${lessonId}`);

            console.log(res.data);
            setLessonData(res.data);

            setSelectedDate(new Date(res.data.startAt));
            setSelectedStart(new Date(res.data.startAt));
            setSelectedEnd(new Date(res.data.endAt));

        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(()=>{
        getLesson();
    },[])

    // moment 이용하여 날짜 포맷 작성
    const yyyymmdd = moment.tz(selectedDate, 'Asia/Seoul').format('YYYY-MM-DD');
    const startmmss = moment.tz(selectedStart, 'Asia/Seoul').format('HH:mm:ss.SSS');
    const endmmss = moment.tz(selectedEnd, 'Asia/Seoul').format('HH:mm:ss.SSS');

    // body에 필요한 날짜값 형식으로 변환
    const startAt = `${yyyymmdd}T${startmmss}Z`;
    const endAt = `${yyyymmdd}T${endmmss}Z`;

    // 일정 수정
    const modHandler = async() =>{
        try {
            const res = await instance.post(`/schedules/${lessonId}/reschedule`, {
                startAt : startAt,
                endAt : endAt
            });

            console.log(res);
            navigate(`/lessondetail/${lessonId}`);

        } catch (error) {
            alert(error);
            console.log(error)   
        }
        
    }
  
  
    return(
        <div>
            <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex justify-between items-center p-5">
                        <div className='flex'>
                            <img src={BackImage} alt="Back"/>
                            <span className="text-lg ml-2">수업시간 변경</span>
                        </div>
                </nav>
            </header>

            <div className="flex flex-col p-2 gap-3 items-start">
                <div className="flex justify-left">
                <span className="font-bold">개인 수업</span>
                </div>
                <span>일자 선택*</span>
                <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
                    <DatePicker
                    placeholderText="날짜 선택"
                    className="flex w-full outline-none"
                    locale="ko"
                    popperPlacement="auto"
                    onChange={(date) => setSelectedDate(date)}
                    selected={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    withPortal
                    />
                    <img src={CalIcon} alt="달력 아이콘" />
                </div>
                <span>시간 선택*</span>
                <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
                    <DatePicker
                    placeholderText="시작 시각"
                    className="flex w-full outline-none"
                    locale="ko"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    onChange={(time) => setSelectedStart(time)}
                    selected={selectedStart}
                    dateFormat="HH:mm"
                    withPortal
                    />
                    <img src={TimeIcon} alt="시계 아이콘" />
                </div>
                ~
                <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
                    <DatePicker
                    placeholderText="종료 시각"
                    className="flex w-full outline-none"
                    locale="ko"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={10}
                    onChange={(time) => setSelectedEnd(time)}
                    selected={selectedEnd}
                    timeCaption="time"
                    dateFormat="HH:mm"
                    withPortal
                    />
                    <img src={TimeIcon} alt="시계 아이콘" />
                </div>
                <span>담당 강사</span>
                <div className="w-[125px] flex border rounded-[10px] px-3 py-2 gap-2 bg-[#F4F4F4] text-[#AEAEAE]">
                    <img src={ProfileIcon} alt="프로필 아이콘" />
                    <div>{lessonData?.tutor.name}</div>
                </div>
                <span>참여 회원</span>
                <div className="w-[125px] flex border rounded-[10px] px-3 py-2 gap-2">
                    <img src={ProfileIcon} alt="프로필 아이콘" />
                    <div>{lessonData?.attendanceHistories[0].member.name}</div>
                </div>
                <span>수업(수강권)</span>
                <select className="w-full border border-gray-500 px-4 py-2 rounded-md" disabled>
                    <option className="text-Gray-300">{lessonData?.issuedTicket.title}</option>
                </select>
                <button 
                    className="rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4"
                    onClick={modHandler}>
                    완료
                </button>
        
            </div>
        </div>
    )

}

export default ModPrivate;