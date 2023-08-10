import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';
import ProfileIcon from '../../assets/Profile_24px.svg';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import instance from '../../api/axios_interceptors';
import { useNavigate } from 'react-router-dom';
registerLocale('ko', ko);
interface ITutorList {
  id: number;
  name: string;
  loginId: string;
  phone: string;
}

interface IMemberList {
  id: number;
  name: string;
  sex: string;
  phone: string;
}

interface IIssuedTicket {
  availableTickets: IAticket[];
}

interface IAticket {
  id: number;
  title: string;
  lessonType: string;
  privateTutorId: number;
  remainingCount: number;
  availableReservationCount: number;
  lessonDuration: number;
  owners: [
    {
      id: number;
      name: string;
      phone: string;
    },
  ];
}
const CreatePrivate = () => {

  const navigate = useNavigate();

  // 데이트피커 날짜 및 시간 값
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedStart, setSelectedStart] = useState<Date | null>();
  const [selectedEnd, setSelectedEnd] = useState<Date | null>();
  // 검색어
  const [search, setSearch] = useState('');

  // 직원 검색
  const [isShowTutor, setIsShowTutor] = useState(false);
  const [tutorList, setTutorList] = useState<ITutorList[]>([]);
  const [tutorId, setTutorId] = useState<number>(0);
  const [tutorName, setTutorName] = useState('');
  // 회원 검색
  const [isShowMember, setIsShowMember] = useState(false);
  const [memberList, setMemberList] = useState<IMemberList[]>([]);
  const [memberId, setMemberId] = useState<number>(0);
  const [memberName, setMemberName] = useState('');
  // 직원 검색창 열고 닫기
  const onSelectTutorShow = () => {
    setIsShowTutor(true);
  };
  const onCloseTutor = () => {
    setIsShowTutor(false);
  };
  // 회원 검색창 열고 닫기
  const onSelectMemberShow = () => {
    setIsShowMember(true);
  };
  const onCloseMember = () => {
    setIsShowMember(false);
  };


  // 직원불러오기
  const onGetSearchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await instance(`/search?query=${search}`);
      setTutorList(response.data.users);
      setMemberList(response.data.members);
    } catch (error) {
      alert(error);
    }
  };

  const [issuedTicket, setIssuedTicket] = useState<IAticket[]>([]);
  //티켓 아이디
  const [ticketId, setTicketId] = useState(0);

  const onTicketHandler = (e : any) => {
    setTicketId(e.target.value);
  }

  // 수업 수강권 선택
  const getissuedTicket = async () => {
    try {
      const response = await instance(
        `/members/${memberId}/bookable-tickets?tutorId=${tutorId}`,
      );

      console.log(response.data.availableTickets);

      // 예약 가능한 수강권 리스트
      setIssuedTicket(response.data.availableTickets);

    } catch (error) {}
  };

  useEffect(() => {
    getissuedTicket();

    console.log(`강사 아이디 : ${tutorId}, 회원 아이디 ${memberId}`);
  }, [tutorId, memberId]);

  const onSetTutor = (id: number, name: string) => {
    setTutorId(id);
    setTutorName(name);

    setIsShowTutor(false);
    setSearch('');
    setTutorList([]);

  
  };

  const onSetMember = (id: number, name: string) => {
    setMemberId(id);
    setMemberName(name);

    setIsShowMember(false);
    setSearch('');
    setMemberList([]);

   
  };

  // moment 이용하여 날짜 포맷 작성
  const yyyymmdd = moment.tz(selectedDate, 'Asia/Seoul').format('YYYY-MM-DD');
  const startmmss = moment
    .tz(selectedStart, 'Asia/Seoul')
    .format('HH:mm:ss.SSS');
  const endmmss = moment.tz(selectedEnd, 'Asia/Seoul').format('HH:mm:ss.SSS');
  // body에 필요한 날짜값 형식으로 변환
  const startAt = `${yyyymmdd}T${startmmss}Z`;
  const endAt = `${yyyymmdd}T${endmmss}Z`;

  const onCouncelHandler = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await instance.post(`/schedules/private-lesson`, {

        userId: tutorId,
        issuedTicketId: ticketId,
        startAt: startAt,
        endAt : endAt
      });

      console.log(res);
      navigate('/scheduleInfo')
      
    } catch (error) {
      alert(error)
    }
  };

  

  return (
    <>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex justify-between items-center p-5">
          <div className="flex">
            <img src={BackImage} alt="Back" />
            <span className="text-lg ml-2">일정 생성</span>
          </div>
        </nav>
      </header>
      <div className="flex flex-col p-2 gap-5">
        <div className="flex justify-left">
          <span className="font-bold">개인 수업</span>
        </div>
        <form
          className="flex flex-col items-start gap-2"
          onSubmit={onCouncelHandler}
        >
          <span>담당 강사 선택</span>
          {tutorId === 0 ? (
            <div
              className="border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]"
              onClick={onSelectTutorShow}
            >
              + 선택하기
            </div>
          ) : (
            <div
              className="flex border rounded-[10px] px-3 py-2 gap-2"
              onClick={onSelectTutorShow}
            >
              <img src={ProfileIcon} alt="프로필 아이콘" />
              <div>{tutorName}</div>
            </div>
          )}
          <span>회원 선택</span>
          {memberId === 0 ? (
            <div
              className="border-[1px] border-[#6691FF] text-[#6691FF] px-3 py-2 rounded-[10px]"
              onClick={onSelectMemberShow}
            >
              + 선택하기
            </div>
          ) : (
            <div
              className="flex border rounded-[10px] px-3 py-2 gap-2"
              onClick={onSelectMemberShow}
            >
              <img src={ProfileIcon} alt="프로필 아이콘" />
              <div>{memberName}</div>
            </div>
          )}

          <span>수업(수강권) 선택</span>

          <select className="border border-gray-500 px-4 py-2 rounded-md" onChange={onTicketHandler}>
            <option className="text-Gray-300">수강권을 선택하세요</option>
            {issuedTicket && 
              issuedTicket.map((ticket) => (
                <option key={ticket.id} value={ticket.id}>{ticket.title}</option>
              ))}
          </select>

          <span>일자 선택*</span>
          <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
            <DatePicker
              placeholderText="날짜 선택"
              className="flex w-full outline-none"
              locale="ko"
              popperPlacement="auto"
              onChange={(date) => setSelectedDate(date)}
              selected={selectedDate}
              dateFormat="yyyy-MM-dd"
              withPortal
            />
            <img src={CalIcon} alt="달력 아이콘" />
          </div>
          <span>시간 선택*</span>
          <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
            <DatePicker
              placeholderText="시작 시각"
              className="flex w-full outline-none"
              locale="ko"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              onChange={(time) => setSelectedStart(time)}
              selected={selectedStart}
              dateFormat="HH:mm"
              withPortal
            />
            <img src={TimeIcon} alt="시계 아이콘" />
          </div>
          ~
          <div className="flex border rounded-[10px] justify-end px-4 py-2 w-[166px]">
            <DatePicker
              placeholderText="종료 시각"
              className="flex w-full outline-none"
              locale="ko"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              onChange={(time) => setSelectedEnd(time)}
              selected={selectedEnd}
              timeCaption="time"
              dateFormat="HH:mm"
              withPortal
            />
            <img src={TimeIcon} alt="시계 아이콘" />
          </div>
          <button className="rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4">
            완료
          </button>
        </form>
      </div>


      {/*직원 검색 모달 */}
      {isShowTutor && (
        <>
          <div
            className="absolute top-0 left-0 bg-[#000000] opacity-90 w-full h-full"
            onClick={onCloseTutor}
          ></div>
          <div className="absolute overflow-hidden top-[10%] left-[10%] bg-[#FFFFFF] w-[80%]  h-[70%] rounded p-2">
            <form
              className=" px-4 py-1 bg-white rounded-[10px] flex border"
              onSubmit={onGetSearchHandler}
            >
              <input
                className="flex-1 placeholder:text-xs placeholder:font-normal outline-none"
                placeholder="직원 이름을 입력하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                      <img src={ProfileIcon} alt="프로필 아이콘" />
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


      {/*회원 검색 모달 */}
      {isShowMember && (
        <>
          <div
            className="absolute top-0 left-0 bg-[#000000] opacity-90 w-full h-full"
            onClick={onCloseMember}
          ></div>
          <div className="absolute overflow-hidden top-[10%] left-[10%] bg-[#FFFFFF] w-[80%] h-[70%] rounded p-2">
            <form
              className=" px-4 py-1 bg-white rounded-[10px] flex border"
              onSubmit={onGetSearchHandler}
            >
              <input
                className="flex-1 placeholder:text-xs placeholder:font-normal outline-none"
                placeholder="회원 이름을 입력하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
              {memberList &&
                memberList.map((member) => (
                  <div
                    key={member.id}
                    className="flex border rounded p-2 mt-2 justify-between items-center text-[13px]"
                    onClick={() => onSetMember(member.id, member.name)}
                  >
                    <div className="flex gap-2 items-center">
                      <img src={ProfileIcon} alt="프로필 아이콘" />
                      <div>
                        {member.name}({member.sex})
                      </div>
                    </div>
                    <div>{member.phone}</div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CreatePrivate;
