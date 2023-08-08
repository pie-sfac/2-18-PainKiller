import React, { useState, useEffect } from 'react';
import SchduleMangerHeader from './SchduleMangerHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchPrivateCharge from '../StudyMangement/StudyTicket/SearchPrivateCharge';
import profile from '../../img/Profile_32px.svg';
import instance from '../../api/axios_interceptors';
import MemberSearch from '../member/MemberSearch';

interface Ticket {
  id: number;
  title: string;
  lessonType: string;
  granted: number;
  defaultCount: number;
  duration: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isActive: boolean;
}

interface ITutorList {
  id: number;
  name: string;
  loginId: string;
  phone: string;
}

interface Member {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE'; // 성별은 'MALE' 또는 'FEMALE'만 가능하도록 타입 설정
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

export default function SchduleManger() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const location = useLocation();
  const { selectedMemberId, selectedMemberName } = location.state || {};
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // const [selectedMember, setSelectedMember] = useState(null);
  const [memberId, setMemberId] = useState<number>(0);
  const [memberName, setMemberName] = useState("");

  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleSelectInstructor = () => {
    setShowMemberSearch(true);
  };

  const onSetMember = (id : number, name : string) => {
    setMemberId(id);
    setTutorName(name);

    setIsShowTutor(false);
    
    setSearchTutor("");
    setTutorList([]);
}

  useEffect(() => {
    if (selectedMemberName) {
      setSelectedInstructor(selectedMemberName);
    }

    const fetchTickets = async () => {
      try {
        const response = await instance.get<{ tickets: Ticket[] }>('tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('티켓 불러오기 에러:', error);
      }
    };

    fetchTickets();
  }, [selectedMemberName]);

  const getLessonTypeTranslation = (type) => {
    switch (type) {
      case 'SINGLE':
        return '개인수업 1:1';
      default:
        return type;
    }
  };

  const handleComplete = async () => {
    // 선택한 회원이 없다면, 처리를 중단
    if (!selectedMemberId) {
      console.error('회원을 선택해주세요.');
      return;
    }



    //선택한 수업(수강권)이 없다면, 처리를 중단
    const selectedTicket = tickets.find(
      (ticket) => ticket.id === selectedTicketId,
    );
    if (!selectedTicket) {
      console.error('수업(수강권)을 선택해주세요.');
      return;
    }



    // 선택한 날짜와 시간을 처리
    if (!selectedDate || !selectedStartDate || !selectedEndDate) {
      console.error('일자와 시간을 선택해주세요.');
      return;
    }

    // 서버에 보낼 요청 바디를 구성
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedStartTime = selectedStartDate.toISOString().split('T')[1];
    const formattedEndTime = selectedEndDate.toISOString().split('T')[1];

    const requestBody = {
      userId: selectedMemberId,
      issuedTicketId: selectedTicket.id,
      startAt: formattedDate + 'T' + formattedStartTime,
      endAt: formattedDate + 'T' + formattedEndTime,
    };

    try {
      
      await instance.post('/schedules/private-lesson', requestBody);
      console.log('일정 등록이 되었습니다.');
    } catch (error) {
      console.error('일정 등록 에러:', error);
  
    }
  };

  const [isShowTutor, setIsShowTutor] = useState(false);
  const [searchTutor, setSearchTutor] = useState('');

  const [tutorList, setTutorList] = useState<ITutorList[]>([]);
  const [tutorId, setTutorId] = useState<number>(0);
  const [tutorName, setTutorName] = useState('');

  const onSelectShow = () => {
    setIsShowTutor(true);
  };

  const onClose = () => {
    setIsShowTutor(false);
  };

  // 직원불러오기
  const onGetTutorHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await instance(`/search?query=${searchTutor}`);

      setTutorList(response.data.users);
    } catch (error) {
      alert(error);
    }
  };

  const onSetTutor = (id: number, name: string) => {
    setTutorId(id);
    setTutorName(name);

    setIsShowTutor(false);

    setSearchTutor('');
    setTutorList([]);
  };

  const onCouncelHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <SchduleMangerHeader />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-lg text-Gray-900 mt-7">개인수업</p>
          <div className="flex flex-col">
            <span>담당 강사 선택</span>
            {tutorId === 0 ? (
              <div
                className="border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]"
                onClick={onSelectShow}
              >
                + 선택하기
              </div>
            ) : (
              <div
                className="flex border rounded-[10px] px-3 py-2 gap-2"
                onClick={onSelectShow}
              >
                <img src={profile} alt="프로필 아이콘" />
                <div>{tutorName}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="member">회원선택 *</label>
            <button
              className="border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]"
              onClick={handleSelectInstructor}
            >
             + 선택하기 
            </button>
          </div>
          {selectedMember && (
            <div className="border border-Gray-300 rounded-xl px-3 py-2  flex items-center mt-2 ml-2">
              <img src={profile} alt="Profile" />
              <span className="ml-1">{selectedMember.name}</span>
            </div>
          )}
          {showMemberSearch && (
            <MemberSearch 
              onSelectMember={(member) => {
                setSelectedMember(member);
                setShowMemberSearch(false);
              }}
              initialSelectedMemberId={selectedMemberId}
              initialSelectedMemberName={selectedMemberName}
            />
          )}
          <div className="flex flex-col">
            <label htmlFor="lesson">수업(수강권)선택 *</label>
            <select className="border border-gray-500 px-4 py-2 rounded-md">
              {/* 셀렉박스 옵션들 */}
              {tickets.map((ticket) => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.title} {getLessonTypeTranslation(ticket.lessonType)}{' '}
                  {ticket.duration}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-start">
            <label>참여회원</label>
            {selectedMemberName && <p>선택한 회원: {selectedMemberName}</p>}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="flex flex-col">
            <label htmlFor="date" className="text-left">
              일자 선택 *
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-500 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time" className="text-left">
              시간 선택 *
            </label>
            <div className="flex justify-between">
              <DatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                dateFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                className="border border-gray-500 px-4 py-2 rounded-md"
              />
              ~
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                dateFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                className="border border-gray-500 px-4 py-2 rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="bg-Pri-500 text-white px-4 py-2 rounded-md"
            onClick={handleComplete}
          >
            완료
          </button>
        </div>
      </div>
      {isShowTutor && (
        <>
          <div
            className="absolute top-0 left-0 bg-[#000000] opacity-90 w-full h-full"
            onClick={onClose}
          ></div>
          <div className="absolute top-[10%] left-[10%] bg-[#FFFFFF] w-[80%] h-1/2 rounded p-2">
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
            <div className="h-[450px] overflow-auto">
              {tutorList &&
                tutorList.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="flex border rounded p-2 mt-2 justify-between items-center text-[13px]"
                    onClick={() => onSetTutor(tutor.id, tutor.name)}
                  >
                    <div className="flex gap-2 items-center">
                      <img src={profile} alt="프로필 아이콘" />
                      <div>
                        {tutor.name}({tutor.loginId})
                      </div>
                    </div>
                    <div>{tutor.phone}</div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
