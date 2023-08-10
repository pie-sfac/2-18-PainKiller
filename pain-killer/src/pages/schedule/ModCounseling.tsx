import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';
import ProfileIcon from '../../assets/Profile_24px.svg'
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko'
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import instance from '../../api/axios_interceptors';
import { useNavigate, useParams } from 'react-router-dom';


const ModCounseling = () => {

    const {counselId} = useParams();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const [selectedStart, setSelectedStart] = useState<Date | null>();
    const [selectedEnd, setSelectedEnd] = useState<Date | null>();

    const [counselor, setCounselor] = useState("");
    const [counselorId, setCounselorId] = useState("");
    const [counselRecord, setCounselRecord] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [memo, setMemo] = useState("");



    // 상담정보 불러오기
    const getLesson = async () => {
        try {
            const res = await instance.get(`/schedules/counseling/${counselId}`);

            console.log(res.data);

            setCounselor(res.data.counselor.name);
            setCounselorId(res.data.counselor.id);

           

            setClientName(res.data.client.name);
            setClientPhone(res.data.client.phone);
            setMemo(res.data.memo);
            setSelectedDate(new Date(res.data.startAt));
            setSelectedStart(new Date(res.data.startAt));
            setSelectedEnd(new Date(res.data.endAt));

            if(res.data.counselingRecord !== null){
                setCounselRecord(res.data.counselingRecord.content);
            }

            

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

      
    // 상담정보 수정
    const modHandler =  async() => {

        
        try {
            const res = await instance.put(`/schedules/counseling/${counselId}`, {
                userId: counselorId,
                memberId: 0,
                clientName: clientName,
                clientPhone: clientPhone,
                memo: memo,
                startAt: startAt,
                endAt: endAt,
                counselingRecordContent : counselRecord
                

            });

            console.log(res);
            navigate(`/counseling/${counselId}`);

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
                            <span className="text-lg ml-2">상담일정 변경</span>
                        </div>
                </nav>
            </header>
            <div className='flex flex-col p-2 gap-2 items-start'>
                <div className='flex justify-left'>
                        <span className='font-bold'>상담</span>
                </div>
                    <span>담당 강사</span>
                    <div className='flex border rounded-[10px] px-3 py-2 gap-2 bg-[#F4F4F4] text-[#AEAEAE]'>
                         <img src={ProfileIcon} alt='프로필 아이콘'/>
                        <div>{counselor}</div>
                     </div>
                    
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
                    
                    <button onClick={modHandler} className='rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4'>완료</button>
                
            </div>
        </div>
    )

}

export default ModCounseling;