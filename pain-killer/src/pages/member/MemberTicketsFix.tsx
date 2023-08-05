import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg';
import instance from '../../api/axios_interceptors';

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
  defaultCoun: number;
  serviceCoun: number;
  defaultTer: number;
  defaultTermUni: string;
  isSuspende: boolean;
  isCancele: boolean;
  createdA: string;
  updatedA: string;
  messag: string;
}

const MemberTicketsFix = () => {
  const { issuedTicketId } = useParams();
  const access_token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const [memTicketDetails, setMemTicketDetails] = useState<MemberTickets>();
  const [lessonType, setlessonType] = useState('');
  const [memTicketTitle, setMemTicketTitle] = useState('');
  const [memTicketStartAt, setMemTicketStartAt] = useState('');
  const [memTicketEndAt, setMemTicketEndAt] = useState('');
  const [memTicketRemainingCount, setMemTicketRemainingCount] = useState();
  const [memTicketDefaultCount, setMemTicketDefaultCount] = useState();
  const [memTicketServiceCount, setMemTicketServiceCount] = useState();
  const [privateTutorName, setPrivateTutorName] = useState('');

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
      setPrivateTutorName(response.data.privateTutor.name);

      console.log(response);
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
        {},
      );

      console.log(response);
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
                type="date"
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
            <div className="mt-1 flex items-center">
              <button className="w-50 mr-1 px-4 py-2 bg-[#f4f4f4] text-[#aeaeae] text-center rounded-lg border-solid border-[1.5px] border-[#CFCFCF] pointer-events-none">
                선택하기 +
              </button>
              <div
                id="PrivateTutor"
                className="flex items-center px-4 py-2 text-center rounded-lg border-solid border-[1.5px] border-[#CFCFCF]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_18_55782)">
                    <circle
                      cx="12"
                      cy="12"
                      r="11.625"
                      fill="white"
                      stroke="#CFCFCF"
                      stroke-width="0.75"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9072 12.64C14.541 12.2351 15.7521 10.759 15.7521 9C15.7521 6.92893 14.0731 5.25 12.0021 5.25C9.93098 5.25 8.25205 6.92893 8.25205 9C8.25205 10.8022 9.52332 12.3074 11.218 12.6679C6.637 13.1599 3.19643 16.4669 3.48243 20.3516C9.83841 26.114 18.6869 22.3474 20.7931 19.9672C20.5271 16.3544 17.0923 12.9812 12.9072 12.64Z"
                      fill="#CFCFCF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_18_55782">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="ml-2 mr-5">{privateTutorName}</p>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7.28033 6.21967C6.98744 5.92678 6.51256 5.92678 6.21967 6.21967C5.92678 6.51256 5.92678 6.98744 6.21967 7.28033L10.9393 12L6.21967 16.7197C5.92678 17.0126 5.92678 17.4874 6.21967 17.7803C6.51256 18.0732 6.98744 18.0732 7.28033 17.7803L12 13.0607L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.0607 12L17.7803 7.28033C18.0732 6.98744 18.0732 6.51256 17.7803 6.21967C17.4874 5.92678 17.0126 5.92678 16.7197 6.21967L12 10.9393L7.28033 6.21967Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}
        <button className="mt-9 w-full py-3 px-4 rounded disabled:text-[#aeaeae] disabled:bg-[#f4f4f4] enabled:text-white enabled:bg-[#2d62ea]/75 enabled:hover:bg-[#2d62ea]">
          저장
        </button>
      </div>
    </div>
  );
};
export default MemberTicketsFix;
