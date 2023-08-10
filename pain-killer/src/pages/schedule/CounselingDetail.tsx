import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import { useEffect, useState } from 'react';
import instance from '../../api/axios_interceptors';

import Profile from '../../assets/Profile_24px.svg'
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

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
    counselingRecord: {
        id: number,
        content: string,
        createdBy: {
          id: number,
          name: string
        },
        updatedBy: {
          id: number,
          name: string
        },
        createdAt: string,
        updatedAt: string
      },
    createdAt: string;
    createdBy: {
        id: number,
        name: string
      },
    updatedAt: string;
    updatedBy: {
        id: number,
        name: string
      }
  }


const CounselDetail = () => {

    const {counselId} = useParams();
    const navigate = useNavigate();

    const [counselingData, setCounselingData] = useState<ICounselingSchedules>();

    // 날짜 데이터 한글표기
    const [lessonDate, setLessonDate] = useState<Date>();
    dayjs.locale('ko');
    const dataFormat = dayjs(lessonDate).format(`YYYY.MM.DD (ddd)`);

    
    // 상담기록
    const [counselRecord, setCounselRecord] = useState('');

    const [isShowRecord, setIsShowRecord] = useState(false);

    // 상담기록 창 열기/닫기
    const showRecord = () => {
        setIsShowRecord(true);
    }
    const onClose = () => {
        setIsShowRecord(false);
    }
   

    // 수업 상세 정보 가져오기
    const getCounseling = async () => {
        try {
            const res = await instance.get(`/schedules/counseling/${counselId}`);

            console.log(res.data);
            setCounselingData(res.data);
            
            setLessonDate(res.data.startAt);

            if(res.data.counselingRecord !== null){
                setCounselRecord(res.data.counselingRecord.content);
            }
            

        } catch (error) {
            alert(error);
        }
    }

     // 상담기록 저장
     const recordHandler = async() => {
        try {
            if(counselingData){
                const res = await instance.put(`/schedules/counseling/${counselId}`,{
                    userId: counselingData.counselor.id,
                    memberId: 0,
                    clientName: counselingData.client.name,
                    clientPhone: counselingData.client.phone,
                    memo: counselingData.memo,
                    startAt: counselingData.startAt,
                    endAt: counselingData.endAt,
                    counselingRecordContent: counselRecord
            });
                console.log(res);
                setIsShowRecord(false);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    
    useEffect(()=>{

        getCounseling();
      
    }, []);

    //일정 취소
    const onSchduleCancel = async() => {
        try{
            const res = await instance.post(`/schedules/${counselId}/cancel`);
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
                        <span className="text-lg ml-2">상담 상세</span>
                    </div>
                    <div className='flex gap-8'>
                        <Link to = {`/modcounseling/${counselId}`}>
                            <div>변경</div>
                        </Link>
                        <div onClick={onSchduleCancel}>취소</div>
                    </div>
            </nav>
        </header>
        <span className='text-left m-5 font-bold'>상담 일정</span>
        <div className='flex flex-col border rounded p-2'>
            <div className='flex justify-between'>
                <div>
                    <span className='font-bold'>일정</span>
                    <span> {dataFormat}</span>
                </div>
                <div>
                    <span className='font-bold'>강사</span>
                    <span> {counselingData?.counselor.name}</span>
                </div>
            </div>
            <div className='flex justify-between'>
                <div>
                    <span className='font-bold'>시간</span>
                    <span> {counselingData?.startAt.slice(11,16)} ~ {counselingData?.endAt.slice(11,16)} </span>
                </div>
            </div>
        </div>

        <span className='text-left m-5 font-bold'> 상담 회원</span>
        <div className='flex flex-col border rounded'>
            <div className='flex p-2 justify-between'>
                <div className='flex gap-5'>
                    <img src={Profile} />
                    <div className='w-full flex flex-col text-left text-[15px]'>
                        <div>{counselingData?.client.name}</div>
                        <div>({counselingData?.client.phone})</div>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-[13px]'>
                        <button className='border text-[#6691FF] px-2 py-1 rounded' onClick={showRecord}>상담 기록</button>
                        <button className='border text-[#6691FF] px-2 py-1 rounded'>회원 정보 등록</button>
                </div>
            </div>
            </div>
            <span className='text-left m-5 font-bold'>일정 메모</span>
            <div className='flex border p-4 h-[240px] overflow-y-auto'>
                {counselingData?.memo}
            </div>
            {isShowRecord &&
            <>
                <div className='absolute top-0 left-0 bg-[#000000] opacity-80 w-full h-full' onClick={onClose}></div>
                <div className='absolute top-[20%] left-[10%] bg-[#FFFFFF] w-[80%] h-[70%] rounded p-2 flex flex-col gap-5'>
                    <div className='flex justify-between font-bold p-2'>
                        <span>상담기록</span>
                        <svg
                            onClick={onClose}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                            d="M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12 13.4142L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.4142 12L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L12 10.5858L5.70711 4.29289Z"
                            fill="black"
                            />
                        </svg>
                    </div>
                    <div>회원님과 나눈 내용을 자유롭게 작성하세요.</div>
                    
                    <textarea
                            value={counselRecord}
                            onChange={(e) => setCounselRecord(e.target.value)}
                            maxLength={500} 
                            className='w-full h-2/3 border rounded outline-none p-1' 
                            placeholder='내용을 입력해주세요. (500자 이내)'/>
                    <div className='flex justify-between gap-2'>
                        <button className='w-full text-center border rounded px-2 py-3' onClick={onClose}>취소</button>
                        <button className='w-full text-center border rounded px-2 py-3 text-white bg-[#2D62EA]' onClick={recordHandler} >저장</button>
                    </div>
                </div>
            </>
            }
        </div>
    )

}

export default CounselDetail;