import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import instance from '../../api/axios_interceptors';
import ProfileIcon from '../../assets/Profile_24px.svg'

interface MemberTickets {
  id: number;
  lessonType: string;
  privateTutor: [
    id: number,
    type: string,
    loginId: string,
    name: string,
    phone: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    lastLoginedAt: string,
  ];
  title: string;
  startAt: string;
  endAt: string;
  remainingCount: number;
  availableReservationCoun: number;
  defaultCount: number;
  serviceCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isSuspended: boolean;
  isCanceled: boolean;
  createdAt: string;
  updatedAt: string;
  message: string;
}

interface IEmpList {
  id: number,
  name: string,
  loginId : string,
  phone: string,
  
  }

const MemberTicketsFix = () => {
  const { issuedTicketId } = useParams();
  
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const [empList, setEmpList] = useState<IEmpList[]>([]);

 

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


  const [memTicketDetails, setMemTicketDetails] = useState<MemberTickets>();
  const [lessonType, setlessonType] = useState('');
  const [memTicketTitle, setMemTicketTitle] = useState('');
  const [memTicketStartAt, setMemTicketStartAt] = useState('');
  const [memTicketEndAt, setMemTicketEndAt] = useState('');
  const [memTicketRemainingCount, setMemTicketRemainingCount] = useState();
  const [memTicketDefaultCount, setMemTicketDefaultCount] = useState();
  const [memTicketServiceCount, setMemTicketServiceCount] = useState();
  const [tutorId, setTutorId] = useState(0);
  const [tutorName, setTutorName] = useState("");
  

  const getMemTicketDetail = async () => {
    //get부분으로 가져오는 모습
    try {
      const response = await instance.get(`/issued-tickets/${issuedTicketId}`);
      setMemTicketDetails(response.data);
      setlessonType(response.data.lessonType);
      setMemTicketTitle(response.data.title);
      setMemTicketStartAt(response.data.startAt);
      setMemTicketEndAt(response.data.endAt);
      setMemTicketRemainingCount(response.data.remainingCount);
      setMemTicketDefaultCount(response.data.defaultCount);
      setMemTicketServiceCount(response.data.serviceCount);
      setTutorId(response.data.privateTutor.id);
      setTutorName(response.data.privateTutor.name)

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMemTicketDetail();
  }, []);

  const onMemTicketsHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      //put 부분(수정하는 부분)
      const response = await instance.put(
        `/issued-tickets/${issuedTicketId}`,
        {
          endAt : memTicketEndAt,
          tutorId : tutorId
        },
      );

      console.log(response);

      navigate(`/dtickets/${issuedTicketId}`)
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5 justify-between">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={onPrevious}
          >
            <img src={BackImage} alt="Back" />
            <p className="text-lg ml-2">수강권 편집</p>
          </div>
        </nav>
      </header>
      <div className="mt-8 p-2">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold">{memTicketTitle}</h1>
          <div className="mr-2 px-2 py-1 text-[#2D62EA] text-[10px] bg-[#F4F4F4] rounded-[4px]">
            {lessonType === 'SINGLE' ? '개인 수업 - 1:1' : null}
          </div>
        </div>
        {memTicketDetails && (
          <form className="mt-5 text-left" onSubmit={onMemTicketsHandler}>
            <p className="text-sm text-[#1d1d1d]">수강권명</p>
            <input
              type="text"
              value={memTicketTitle}
              readOnly
              className="w-full mt-1 px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] rounded border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none"
            />
            <p className="mt-4 text-sm text-[#1D1D1D]">
              유효기간
              <span className="text-[#2D62EA]">*</span>
            </p>
            <div className="mt-1 flex items-center ">
              <input
                value={memTicketStartAt}
                readOnly
                className="w-full px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] text-center rounded border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none"
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="#505050"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <input
                type="date"
                value={memTicketEndAt}
                onChange={(e)=>setMemTicketEndAt(e.target.value)}
                className="w-full px-4 py-2 text-center rounded border-solid border-[1.5px] border-[#CFCFCF]"
              />
            </div>
            <p className="mt-4 text-sm text-[#1d1d1d]">수강권 기간(개월)</p>
            <input
              type="number"
              value={memTicketRemainingCount}
              readOnly
              className="w-full mt-1 px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] rounded border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none"
            />
            <p className="mt-4 text-sm text-[#1d1d1d]">기본횟수(회)</p>
            <input
              type="number"
              value={memTicketDefaultCount}
              readOnly
              className="w-full mt-1 px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] rounded border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none"
            />
            <p className="mt-4 text-sm text-[#1d1d1d]">서비스 횟수(회)</p>
            <p className="text-[10px] text-[#aeaeae]">
              서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다.
            </p>
            <div className="mt-1 flex items-center justify-between">
              <button className="bg-[#f4f4f4] rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 12H18"
                    stroke="#505050"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <input
                type="number"
                value={memTicketServiceCount}
                readOnly
                className="w-full mx-2 px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] text-center rounded border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none"
              />
              <button className="bg-[#f4f4f4] rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6C13 5.44771 12.5523 5 12 5C11.4477 5 11 5.44771 11 6V11H6C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H11V18Z"
                    fill="#505050"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-sm text-[#1D1D1D]">
              담당강사
              <span className="text-[#2D62EA]">*</span>
            </p>
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
          <button className="mt-9 w-full py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]/75 enabled:hover:bg-[#2d62ea]">
            저장
          </button>
          </form>
        )}
        
      </div>
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
  );
};
export default MemberTicketsFix;
