import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackImage from '../../img/Back_24px.svg'
import instance from '../../api/axios_interceptors';
//회원상세

interface DetailIssuedTickets {
    id: number,
    lessonType: string,
    privateTutor: {
        id: number,
        type: string,
        loginId: string,
        name: string,
        phone: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string,
        lastLoginedAt: string
    },
    title: string,
    startAt: string,
    endAt: string,
    remainingCount: number,
    availableReservationCount: number,
    defaultCount: number,
    serviceCount: number,
    defaultTerm: number,
    defaultTermUnit: string,
    isSuspended: boolean,
    isCanceled: boolean,
    createdAt: string,
    updatedAt: string,
    message: string
}

const DetailMemberTickets = () => {
  const {ticketId} = useParams();

  console.log(ticketId)

  const navigate = useNavigate();
    
  const onPrevious = () => {
      navigate(-1);
  }

  
  //회원수강권상세(deTickets)
  const [deTickets, setDetickets] = useState<DetailIssuedTickets>();

  //회원수강권상세 - get API
  const getDeatilTickets = async () => {
    const reply = await instance.get(`/issued-tickets/${ticketId}`)

    setDetickets(reply.data);
    console.log(reply);
  }

  useEffect(()=> {
    getDeatilTickets();
  }, [])

  return (
    <>
      <div>
        <header className="bg-white border-b border-t-neutral-100">
          <nav className="flex p-5 justify-between">
            <div className="flex justify-between items-center cursor-pointer" onClick={onPrevious}>
                <img src={BackImage} alt="Back" />
                <p className="text-lg ml-2">수강권 상세</p>
            </div>
            <div className='flex'>
              <span>편집</span>  
            </div>
          </nav>
        </header>


        <div className="flex gap-3">
          <p className="font-bold">{deTickets?.title}</p>
          <label className="p-1 rounded-lg bg-blue-200 text-blue-600 text-sm">개인 수업 - 1:1</label>
        </div>

        <div className='font-bold text-left p-2'>수강권 정보</div>

        <div className="rounded-lg bg-gray-200 p-4">
          <div className='flex flex-col gap-3 justify-start items-start'>
            <div>기본 횟수 : <span className='font-bold'>{deTickets?.defaultCount}회</span></div>
            <div>서비스 횟수 : <span className='font-bold'>{deTickets?.serviceCount}회</span></div>
            <div>잔여횟수 : <span className='font-bold'>{deTickets?.remainingCount}회</span></div>
            <div>예약 가능 잔여 횟수 : <span className='font-bold'>{deTickets?.availableReservationCount}회</span></div>
            <div>수강권 기간 : <span className='font-bold'>{deTickets?.defaultTerm}개월</span></div>
            <div>유효 기간 : <span className='font-bold'>{deTickets?.startAt} ~ {deTickets?.endAt}</span></div>
            <div>담당 강사 : <span className='font-bold'>{deTickets?.privateTutor.name}</span></div> 
          </div>
        </div>

      </div>
    </>
  )
}

export default DetailMemberTickets