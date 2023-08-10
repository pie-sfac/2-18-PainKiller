import DatePicker, { registerLocale } from 'react-datepicker';
import CalIcon from '../../assets/Calendar_24px.svg';
import ko from 'date-fns/locale/ko'
import { useState } from 'react';
import moment from 'moment';
import SchedulModal from '../../components/calendar/schedulModal';
import instance from '../../api/axios_interceptors';
import { Link } from 'react-router-dom';


registerLocale("ko", ko);


interface ScheduleData {
    users: [
      {
        id: number;
        name: string;
      },
    ];
    counselingSchedules : ICounselingSchedules[];
    privateSchedules : IPrivateSchedules[];
  }

  interface IPrivateSchedules {
    id: number;

    tutor: {
      id: number;
      name: string;
    };

    startAt: string;
    endAt: string;
    memo: string;
    isCanceled: boolean;
    canceledAt: string;

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
    updatedAt: string;
  }

  interface ICounselingSchedules {
    
    id: number;
    startAt: string;
    endAt: string;
    memo: string;
    isCanceled: boolean;
    canceledAt: string;
    counselor: {
      id: number;
      name: string;
    };
    client: {
      memberId: number;
      name: string;
      phone: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  

const SchduleInfo = () => {

    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>();
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>();

    // 수업 일정 데이터
    const[classData, setClassData] = useState<IPrivateSchedules[]>([]);
    // 상담 일정 데이터
    const[counselData, setCounselsData] = useState<ICounselingSchedules[]>([]);

    // 일정추가 모달창
    const [schedule, setSchedule] = useState(false);

     // moment 이용하여 날짜 포맷 작성
     const startYMD = moment.tz(selectedStartDate, 'Asia/Seoul').format('YYYY-MM-DD');
     const endYMD = moment.tz(selectedEndDate, 'Asia/Seoul').format('YYYY-MM-DD');

    const scheduleHandle = () => {
        setSchedule(true);
    };
 

    const onSchduleHandler = async() => {

        try {
            const res = await instance.get(`/schedules?from=${startYMD}&to=${endYMD}`);

            console.log(res.data);

            setClassData(res.data.privateSchedules);
            setCounselsData(res.data.counselingSchedules);

        } catch (error) {
            alert(error);
        }

    }

    return(
        <div className="flex flex-col items-center bg-[#F4F4F4] p-2 gap-3">
            <div className='flex items-center gap-1'>
                <div  className='flex border rounded-[10px] justify-end px-4 py-2 bg-white'>
                        <DatePicker
                            placeholderText='날짜 선택'
                            className='flex w-full outline-none'
                            locale="ko"
                            popperPlacement='auto'
                            onChange={(date)=>setSelectedStartDate(date)}
                            selected={selectedStartDate}
                            dateFormat='yyyy-MM-dd'
                            withPortal
                        />
                        <img
                            src={CalIcon}
                            alt='달력 아이콘'
                        />    
                    </div>
                    ~
                    <div  className='flex border rounded-[10px] justify-end px-4 py-2 bg-white'>
                        <DatePicker
                            placeholderText='날짜 선택'
                            className='flex w-full outline-none'
                            locale="ko"
                            popperPlacement='auto'
                            onChange={(date)=>setSelectedEndDate(date)}
                            selected={selectedEndDate}
                            dateFormat='yyyy-MM-dd'
                            withPortal
                        />
                        <img
                            src={CalIcon}
                            alt='달력 아이콘'
                        />    
                    </div>
                    <button onClick={onSchduleHandler}>
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
                    </button>
                </div>

                <button 
                    className='border w-full rounded-[10px] bg-[#2D62EA] py-2 text-white'
                    onClick={scheduleHandle}>
                    + 일정 생성
                </button>

                <span className='text-left w-full'>수업 일정({`${classData.length} 건`})</span>
                <div className='border-[3px] rounded border-[#E7E7E7] h-[240px] w-full overflow-y-auto py-2'>
                    {
                        classData.length === 0 ? <div>조회된 수업 일정이 없습니다.</div>
                        :
                        classData.map((privateclass) => (
                            <Link to = {`/classdetail/${privateclass.id}`} key={privateclass.id}>
                                <div className='flex flex-col items-start bg-white rounded mb-2 p-2'>
                                <div className='w-full flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <div>수강명</div>
                                            <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                {privateclass.issuedTicket.title}
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            { privateclass.attendanceHistories[0].status === 'WAIT' &&
                                                <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                    예약
                                                </div>
                                            }
                                            { privateclass.attendanceHistories[0].status === 'PRESENT' &&
                                                <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                    출석
                                                </div>
                                            }
                                            { privateclass.attendanceHistories[0].status === 'ABSENT' &&
                                                <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                    결석
                                                </div>
                                            }    
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <div>{privateclass.startAt.slice(0,10)}</div>
                                        <div>
                                            {privateclass.startAt.slice(11,13)}시 {privateclass.startAt.slice(14,16)}분 ~ {privateclass.endAt.slice(11,13)}시 {privateclass.endAt.slice(14,16)}분
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <div>담당 강사</div>
                                            <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                {privateclass.tutor.name}
                                            </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <div>회원</div>
                                            <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                {privateclass.attendanceHistories[0].member.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    } 
                </div>
                <span className='text-left w-full'>상담 일정({`${counselData.length} 건`})</span>
                <div className='border-[3px] rounded border-[#E7E7E7] h-[240px] w-full overflow-y-auto py-2'>
                {
                        counselData.length === 0 ? <div>조회된 상담 일정이 없습니다.</div>
                        :
                        counselData.map((counsel) => (
                            <Link to = {`/counseldetail/${counsel.id}`} key={counsel.id}>
                                <div className='flex flex-col items-start bg-white rounded mb-2 p-2 gap-1'>
                                
                                    <div className='w-full flex justify-between'>
                                        <div>{counsel.startAt.slice(0,10)}</div>
                                        <div>
                                            {counsel.startAt.slice(11,13)}시 {counsel.startAt.slice(14,16)}분 ~ {counsel.endAt.slice(11,13)}시 {counsel.endAt.slice(14,16)}분
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <div className='rounded border-2 border-[#1FB881] text-[#89ED9E] px-1'>
                                                상담
                                            </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                {counsel.counselor.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between'>
                                        <div className='flex gap-2 items-center'>
                                            <div>상담 의뢰</div>
                                            <div className='rounded bg-[#F4F4F4] px-2 py-1'>
                                                {counsel.client.name}
                                            </div>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            {counsel.client.phone}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    } 
                </div>

                {schedule && <SchedulModal setSchedule={setSchedule} />}
        </div>
    )
}

export default SchduleInfo;