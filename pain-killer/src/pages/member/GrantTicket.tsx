import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios_interceptors";
import BackImage from '../../img/Back_24px.svg'
import ProfileIcon from '../../assets/Profile_24px.svg'


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
  id: number,
  name: string,
  loginId : string,
  phone: string,
  
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
    const [tutorId, setTutorId] = useState(0);
    const [tutorName, setTutorName] = useState("");

    const [isShowTutor, setIsShowTutor] = useState(false);
    const [searchTutor, setSearchTutor] = useState("");


    const onSelectShow = () => {    
        setIsShowTutor(true);
    }

    const onClose = () => {    
        setIsShowTutor(false);
    }

    const onGetTutorHandler = async(e : React.FormEvent) => {
      e.preventDefault();

      try{
          const response = await instance(`/search?query=${searchTutor}`) 

          setEmpList(response.data.users);

      }catch(error){
          alert(error);
      }
  }

  const onSetTutor = (id : number, name : string) => {
    setTutorId(id);
    setTutorName(name);

    setIsShowTutor(false);
    
    setSearchTutor("");
    setEmpList([]);
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

  

    useEffect(()=> {
        getTicketInfo();

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
                  privateTutorId : tutorId,
                  startAt : start,
                  endAt : end
            });
          
            console.log(res);

            navigate('/memberInfo');
            
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
            <div className='text-left'>유효기간</div>
            <div className='flex flex-col items-start'>
                <input
                type='date' 
                className='rounded border w-1/2 p-2' 
                value={start}
                onChange={(e) => setStart(e.target.value)}/>
                ~ 
                <input
                type='date' 
                className='rounded border w-1/2 p-2' 
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
            { tutorId === 0 ? 
                    <div 
                        className='w-[130px] border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]'
                        onClick={onSelectShow} > 
                        + 선택하기
                     </div>
                     :
                     <div className='flex border rounded-[10px] px-3 py-2 gap-2 w-[130px]' onClick={onSelectShow}>
                         <img src={ProfileIcon} alt='프로필 아이콘'/>
                        <div>{tutorName}</div>
                     </div>
            }
        </div>

        <button className='border rounded px-4 py-3 hover:bg-[#2D62EA] hover:text-white ' onClick={onGrantTicket}>완료</button>
        {isShowTutor &&
        <>
            <div className='absolute top-0 left-0 bg-[#000000] opacity-90 w-full h-full' onClick={onClose}></div>
            <div className='absolute top-[25%] left-[10%] bg-[#FFFFFF] w-[80%] h-1/2 overflow-y-auto rounded p-2'>
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
                {empList &&
                empList.map((emp) => (
                    <div 
                        key={emp.id} 
                        className='flex border rounded p-2 mt-2 justify-between items-center text-[13px]'
                        onClick={() => onSetTutor(emp.id, emp.name)}>
                        <div className='flex gap-2 items-center'>
                            <img src={ProfileIcon} alt='프로필 아이콘'/>
                            <div>{emp.name}({emp.loginId})</div>
                        </div>
                        <div>{emp.phone}</div>
                    </div>
                ))
                }
                </div>
            </div>
        </>
        }  

      </div>
      
    )

}

export default GrantTicket;