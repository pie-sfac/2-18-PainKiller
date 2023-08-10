import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import Profile from '../../assets/Profile_24px.svg'
import { useEffect, useState } from 'react';
import instance from '../../api/axios_interceptors';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';


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

const PrivateDetail = () => {
    // private-lesson 아이디
    const {lessonId} = useParams();

    const navigate = useNavigate();

    // lesson 상세 데이터
    const [lessonData, setLessonData] = useState<IPrivateSchedules>();
    // 날짜 포맷 설정을 위해 수업일자 상태값 설정
    const [lessonDate, setLessonDate] = useState<Date>();
    // 출석기록아이디
    const [attendId, setAttendId] = useState();
    const [attendStatus, setAttendStatus] = useState();
   
    // 수업 상세 정보 가져오기
    const getLesson = async () => {
        try {
            const res = await instance.get(`/schedules/private-lesson/${lessonId}`);

            console.log(res.data);

            setLessonData(res.data);
            setLessonDate(res.data.startAt);
            setAttendId(res.data.attendanceHistories[0].id);
            setAttendStatus(res.data.attendanceHistories[0].status);

        } catch (error) {
            alert(error);
        }
    }

    // 출석 처리
    const onPresentHandler = async() => {
        try {
            const res = await instance.post(`/attendance-histories/${attendId}/check-present`);

            console.log(res);
            alert('출석 처리 되었습니다.');
            location.reload();
        } catch (error) {
            alert(error);
            console.log(error)   
        }
    }
    // 결석 처리
    const onAbsentHandler = async() => {
        try {
            const res = await instance.post(`/attendance-histories/${attendId}/check-absent`);
            
            console.log(res);
            alert('결석 처리 되었습니다.')
            location.reload();
        } catch (error) {
            alert(error);
            console.log(error)   
        }
    }

    useEffect(()=>{

        getLesson();
      
    }, []);


    // 수업일자 포맷 설정
    dayjs.locale('ko');
    const dataFormat = dayjs(lessonDate).format(`YYYY.MM.DD (ddd)`);


     //일정 취소
     const onSchduleCancel = async() => {
        try{
            const res = await instance.post(`/schedules/${lessonId}/cancel`);
            console.log(res);
            alert('일정을 취소하였습니다.')
            navigate(`/scheduleInfo`);
            
        }catch(error){
            console.log(error);
            alert(error);
        }
    }

    
    return(
        <div className='flex flex-col p-2'>
             <header className="bg-white border-b border-t-neutral-100">
                <nav className="flex justify-between items-center p-5">
                        <div className='flex'>
                            <img src={BackImage} alt="Back"/>
                            <span className="text-lg ml-2">수업 상세</span>
                        </div>
                        <div className='flex gap-8'>
                            <Link to = {`/modlesson/${lessonId}`}>
                                <div>변경</div>
                            </Link>
                            <div onClick={onSchduleCancel}>취소</div>
                        </div>
                </nav>
            </header>
            <span className='text-left m-5 font-bold'> 개인 수업 일정</span>
            <div className='flex flex-col border rounded p-2'>
                <div className='flex justify-between'>
                    <div>
                        <span className='font-bold'>일정</span>
                        <span> {dataFormat}</span>
                    </div>
                    <div>
                        <span className='font-bold'>인원</span>
                        <span> {lessonData?.maxGroupMember}명</span>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <span className='font-bold'>시간</span>
                        <span> {lessonData?.startAt.slice(11,16)} ~ {lessonData?.endAt.slice(11,16)}</span>
                    </div>
                    
                    <div>
                        <span className='font-bold'>강사</span>
                        <span> {lessonData?.tutor.name}</span>
                    </div>
                </div>
            </div>
            <span className='text-left m-5 font-bold'> 참여 회원</span>
            <div className='flex flex-col border rounded'>
                <div className='flex p-2 justify-between'>
                    <div className='flex gap-5'>
                        <img src={Profile} />
                        <div className='flex flex-col text-left'>
                            <div>{lessonData?.attendanceHistories[0].member.name}</div>
                            <div>({lessonData?.attendanceHistories[0].member.phone})</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button 
                            className={attendStatus === 'PRESENT' ?  'border-[1px] border-[#4679FC] bg-[#6691FF] text-white rounded px-4 py-2' : 'border rounded px-4 py-2'}
                            onClick={onPresentHandler}>
                            <span>출석</span>
                        </button>
                        <button 
                            className={attendStatus === 'ABSENT' ?  'border-[1px] border-[#DF291D] bg-[#FF7B72] text-white rounded px-4 py-2' : 'border rounded px-4 py-2'} 
                            onClick={onAbsentHandler}>
                            <span>결석</span>
                        </button>
                    </div>
                </div>
                <div className='flex border-t p-10 gap-5'>
                    <div className='flex flex-col gap-2 text-left'>
                        <div>출결상태</div>
                        <div>수강권</div>
                        <div>잔여</div>
                        <div>예약 가능</div>
                        <div className='p-2 m-2 border rounded-[10px] text-[12px] text-[#6691FF]'> 기록 작성하기</div>
                    </div>
                    <div className='flex flex-col gap-2 text-left font-bold'>

                        {attendStatus === 'WAIT' && <div>예약</div>}
                        {attendStatus === 'PRESENT' && <div className='text-[#6691FF]'>출석</div>}
                        {attendStatus === 'ABSENT' && <div className='text-[#DF291D]'>결석</div>}

                        <div>{lessonData?.issuedTicket.title}</div>
                        <div>{lessonData?.issuedTicket.remainingCount}회</div>
                        <div>{lessonData?.issuedTicket.availableReservationCount}회</div>
                        <div className='p-2 m-2 border rounded-[10px] font-normal text-[12px] text-[#6691FF]'>퍼스널 레포트 보내기</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PrivateDetail;