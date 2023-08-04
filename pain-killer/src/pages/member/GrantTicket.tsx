import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios_interceptors";
import { select } from '@material-tailwind/react';
import BackImage from '../../img/Back_24px.svg'


interface Ticket {
    id: 0,
    title: string,
    lessonType: string,
    defaultCount: number,
    defaultTerm: number,
    defaultTermUnit: string,
    isActive: boolean,
    maxServiceCount: number,
    issuedTicketCount: number,
    bookableLessons: BookableLessons[]
  }

interface BookableLessons{
    id: number,
    type: string,
    title: string,
    duration: number,
    maxGroupMember: number
}

interface IEmpList {
    id: number;
    name: string;
    phone: string;
    memberCount: number;
    rating: number;
    memo: string;
  
  }
  

const GrantTicket = () => {

    const {ticketId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const memberId :number = location.state.id;

    const [empList, setEmpList] = useState<IEmpList[]>([]);
    const [ticketInfo, setTicketInfo] = useState<Ticket>();
    
    // 서비스 횟수
    const [ServiceCount, setServiceCount] = useState(0);
    // 최대 서비스 횟수
    const [maxServiceCount, setMaxServiceCount] = useState(0);

    // 시작날 종료날
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    // 강사
    const [selectedTutor, setSelectedTutor] = useState(0);



    const handleSelect = (e : any) => {
        setSelectedTutor(e.target.value);
    }

    // 티켓 상세 정보 불러오기
    const getTicketInfo = async () => {
        try{
            const response = await instance.get(`/tickets/${ticketId}`);

            setTicketInfo(response.data);
            setMaxServiceCount(response.data.maxServiceCount);
        }
        catch(error){
            alert(error);
        }
       

    }

    // 담당강사 불러오기
    const getTutor = async () => {
        try{
            const response = await instance.get('/staffs');

            setEmpList(response.data.datas);

        } 
        catch(error){
            alert(error);
        }
    }

    useEffect(()=> {
        getTicketInfo();
        getTutor();

        console.log("티켓 아이디 " + ticketId);
        console.log("멤버 아이디 " + memberId);
    },[])

     // 여기는 서비스 수강 카운터 입니다
    const handleDecreaseServiceCount = () => {
        setServiceCount((prevCount) => Math.max(prevCount - 1, 0));
    };

    const handleIncreaseServiceCount = () => {
        // 최대 횟수를 넘지 않게 해놨음
        setServiceCount((prevCount) => Math.min(prevCount +1 , maxServiceCount) );
    };
    

    function convertTermUnitToKorean(termUnit : any) {
        switch (termUnit) {
          case "MONTH":
            return "개월";
          case "WEEK":
            return "주";
          case "DAY":
            return "일";
          default:
            return termUnit;
        }
    }

      const onPrevPage = () => {
        navigate(-1);
      }

    
    // 회원에게 수강권 부여
    const onGrantTicket =  async () => {
        try {
            const res = await instance.post(`/tickets/${ticketId}/issue`, {
                memberIds : 
                   [ memberId ]
                  ,
                  serviceCount : maxServiceCount,
                  privateTutorId : selectedTutor,
                  startAt : start,
                  endAt : end
            });
          
            console.log(res);


        } catch (error : any) {
          alert(error);
        }
    }
  
    return(

      <div className='flex flex-col gap-5 p-2'>
        <header className="bg-white border-b border-t-neutral-100">
          <nav className="flex p-5 justify-between">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={onPrevPage}
            >
              <img src={BackImage} alt="Back" />
              <p className="text-lg">수강권 부여</p>
            </div>
            <div className="flex">
              <span>완료</span>
            </div>
          </nav> 
        </header>


        <div className='flex gap-2'>
            <div className='text-[16px] font-bold'>{ticketInfo?.title}</div>
            <p className="text-right bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500">
                {ticketInfo?.lessonType === 'GROUP' ? '그룹 수업' : '개인수업 - 1:1'}
            </p>
        </div>

        <div className='flex flex-col'>
            <div className='text-left'>수강권명</div>
            <div className='border rounded bg-[#F4F4F4] text-[#AFAFAF] px-4 py-2'>{ticketInfo?.title} </div>
        </div>
        
        {/* 캘린더 라이브러리 잘 이용하면 버튼 이용해서 날짜설정 */}
        <div className='flex flex-col mr-10'>
            <div className='text-left'>유효기간(캘린더 라이브러리 이용하면 날짜 지정 편해질지도?)</div>
            <div className='flex flex-col items-start'>
                <input 
                className='rounded border w-1/2 p-2' 
                placeholder='0000-00-00'
                value={start}
                onChange={(e) => setStart(e.target.value)}/>
                ~ 
                <input 
                className='rounded border w-1/2 p-2' 
                placeholder='0000-00-00'
                value={end}
                onChange={(e) => setEnd(e.target.value)}/>
            </div>
        </div>

        <div className='flex flex-col'>
            <div className='text-left'>수강권 기간</div>
            <div className='flex justify-between border rounded bg-[#F4F4F4] text-[#AFAFAF] px-4 py-2'>
                <div>{ticketInfo?.defaultTerm}</div>
                <div>{convertTermUnitToKorean(ticketInfo?.defaultTermUnit)}</div> 
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='text-left'>기본 횟수</div>
            <div className='flex justify-between border rounded bg-[#F4F4F4] text-[#AFAFAF] px-4 py-2'>
                <div>{ticketInfo?.defaultCount}</div>
                <div>회</div> 
            </div>
        </div>

        <div className="flex items-start flex-col mb-4">
            <p className="mr-2">서비스횟수(최대 {maxServiceCount}회)</p>
            <p className="text-xs mb-1">
                서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다
            </p>
            <div className="flex justify-between">
                <button
                className="flex justify-center items-center border p-1 mr-2 rounded-full w-10 h-10 text-xl bg-Gray-100"
                onClick={handleDecreaseServiceCount}
                >
                -
                </button>
                <p className="border p-2 rounded-lg text-center w-72">{ServiceCount}회</p>
                <button
                className="flex justify-center items-center border p-1 ml-2 rounded-full w-10 h-10 text-xl bg-Gray-100"
                onClick={handleIncreaseServiceCount}
                >
                +
                </button>
            </div>
        </div>
        
        <div className='flex flex-col gap-2'>
            <div className='text-left'>담당 강사</div>
            <select defaultValue = "선택하세요" value={selectedTutor} onChange={handleSelect}>
                {empList.map((emp)=>(
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
            </select>
        </div>

        <button className='border rounded px-4 py-3 hover:bg-[#2D62EA] hover:text-white ' onClick={onGrantTicket}>완료</button>
          
      </div>
    )

}

export default GrantTicket;