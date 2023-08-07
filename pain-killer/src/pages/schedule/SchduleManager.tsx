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

export default function SchduleManger() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const location = useLocation();
  const { selectedMemberId, selectedMemberName } = location.state || {};
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberSearch, setShowMemberSearch] = useState(false);

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
      // Add more cases for other lesson types as needed.
      default:
        return type;
    }
  };

  const handleComplete = async () => {
    // 만약 선택한 회원이 없다면, 처리를 중단합니다.
    if (!selectedMemberId) {
      console.error('회원을 선택해주세요.');
      return;
    }

    // 만약 선택한 수업(수강권)이 없다면, 처리를 중단합니다.
    const selectedTicket = tickets.find(
      (ticket) => ticket.id === selectedMemberId,
    );
    if (!selectedTicket) {
      console.error('수업(수강권)을 선택해주세요.');
      return;
    }

    // 선택한 날짜와 시간을 처리합니다.
    if (!selectedDate || !selectedStartDate || !selectedEndDate) {
      console.error('일자와 시간을 선택해주세요.');
      return;
    }

    // 서버에 보낼 요청 바디를 구성합니다.
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
      // 일정 등록을 위해 서버에 POST 요청을 보냅니다.
      await instance.post('/schedules/private-lesson', requestBody);
      console.log('일정 등록이 되었습니다.');
    } catch (error) {
      console.error('일정 등록 에러:', error);
      // 에러 처리를 수행합니다. 예를 들어 사용자에게 알림 메시지를 표시하거나 로그를 남길 수 있습니다.
    }
  };

  return (
    <>
      <SchduleMangerHeader />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-lg text-Gray-900 mt-7">개인수업</p>
          <div className="flex flex-col">
            <label htmlFor="instructor">담당강사 선택 *</label>
            <button className="border border-gray-500 px-4 py-2 rounded-md">
              선택하기 버튼
            </button>
            {selectedMemberName && (
              <div className="border border-Gray-300 rounded-xl px-3 py-2  flex items-center mt-2 ml-2">
                <img src={profile} alt="Profile" />
                <span className="ml-1">{selectedMemberName}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="member">회원선택 *</label>
            <button
              className="border border-gray-500 px-4 py-2 rounded-md"
              onClick={handleSelectInstructor}
            >
              회원선택 버튼
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
    </>
  );
}
