import CreateStudyTicketHeader from './CreateStudyTicketHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import instance from '../../../api/axios_interceptors';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import profile from '../../../img/Profile_32px.svg'


interface TicketParams {
  ticketId: string;
}
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

export default function CreateStudyTicket() {
  // 수강권 ID를 URL 파라미터에서 추출합니다.
  const { ticketId } = useParams<TicketParams>();
  // 수강권 데이터와 입력한 정보를 상태로 관리합니다.
  const [ticketData, setTicketData] = useState<Ticket | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [ServiceCount, setServiceCount] = useState(0);
  const [privateTutorId, setPrivateTutorId] = useState<number | null>(null); // 담당강사 ID를 상태로 관리
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const [selectedMemberName, setSelectedMemberName] = useState<string>(''); // 선택한 직원 이름 상태 추가


  useEffect(() => {
    // URL 파라미터에서 선택한 직원 ID와 이름 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const selectedMemberId = searchParams.get('selectedMember');
    const selectedMemberName = searchParams.get('selectedMemberName');

    if (selectedMemberName) {
      // 선택한 직원의 이름을 상태로 설정합니다.
      setSelectedMemberName(decodeURIComponent(selectedMemberName));
    }

    if (selectedMemberId && !memberIds.includes(parseInt(selectedMemberId))) {
      setMemberIds((prevIds) => [...prevIds, parseInt(selectedMemberId)]);
    }

    // 선택한 수강권의 정보를 서버에서 가져옵니다.
    const fetchTicketData = async () => {
      try {
        const response = await instance.get(`/tickets/${ticketId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setTicketData(response.data);
        console.log(response.data); // 최신 ticketData를 콘솔에 출력

        if (response.data.privateTutorId) {
          setPrivateTutorId(response.data.privateTutorId);
        }
        if (response.data.memberIds) {
          setMemberIds(response.data.memberIds);
        }


      } catch (error) {
        console.error('수강권 정보 오류:', error);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  // "선택하기" 버튼을 클릭하면 검색 페이지로 이동하는 함수
  const handleSelectMember = async () => {
    // "선택하기" 버튼을 클릭하면 검색 페이지로 이동
    const selectedMemberId = await navigate(`/searchprivatecharge/${ticketId}`);

    if (selectedMemberId && !memberIds.includes(parseInt(selectedMemberId))) {
      setPrivateTutorId(parseInt(selectedMemberId)); // 담당강사 ID를 업데이트
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleSave = async () => {
    const data = {
      memberIds,
      ServiceCount,
      privateTutorId,
      startAt: startDate?.toISOString(),
      endAt: endDate?.toISOString(),
    };

    console.log(data);
    console.log(memberIds)

    try {
      // POST API 호출
      const response = await instance.post(`/tickets/${ticketId}/issue`, data);
      console.log('수강권 생성 완료:', response.data);
      // 성공 시 처리할 코드 추가
      alert('수강권이 성공적으로 생성되었습니다.');
    } catch (error) {
      // 오류 처리
      console.error('수강권 생성 오류:', error);
      alert('수강권 생성에 실패하였습니다.');
    }
  };

  if (!ticketData) {
    return <div>Loading...</div>;
  }




  return (
    <>
      <CreateStudyTicketHeader />

      <div className="text-left p-5">
        {/* 수강권 생성 */}
        <div className="flex flex-col justify-start mb-2">
          <h2 className="text-2xl font-extrabold mb-2">
            {ticketData.bookableLessons[0].title}
          </h2>

          <p className="text-right bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500 w-[83px] ">
            {ticketData.bookableLessons[0].lessonType === 'GROUP'
              ? '그룹 수업'
              : '개인수업 - 1:1'}
          </p>
        </div>

        {/* 수강권명 입력 */}
        <div className="flex items-start flex-col mb-4">
          <p className="mr-2">수강권명*</p>
          <input
            type="text"
            className="border p-2 w-[389px] rounded-lg text-Gray-400"
            value={ticketData.bookableLessons[0].title}
            disabled
          />
        </div>

        {/* 유효기간 입력 */}
        <div>
          <div className="flex items-start flex-col mb-4">
            <p className="mr-2">유효기간*</p>
            <div className="flex justify-between">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                className="border p-2 rounded-lg mr-1 w-[187px]"
                placeholderText="시작 날짜"
              />
              <span>~</span>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy-MM-dd"
                className="border p-2 rounded-lg ml-1 w-[187px]"
                placeholderText="종료 날짜"
              />
            </div>
          </div>
        </div>
        {/* 수강권 기간 */}
        <div className="flex items-start flex-col mb-4">
          <p className="mr-2">수강권기간*</p>
          <div className="flex justify-between">
            <input
              type="number"
              className="border p-2 rounded-lg mr-1 w-[389px] text-Gray-400"
              value={ticketData.defaultTerm}
              disabled
            />
          </div>
        </div>

        {/* 기본횟수 */}
        <div className="flex items-start flex-col mb-4">
          <p className="mr-2">기본횟수*</p>
          <div>
            <input
              type="number"
              className="border p-2 rounded-lg w-[389px] text-Gray-400"
              value={ticketData.defaultCount}
              disabled
            />
          </div>
        </div>

        {/* 서비스횟수 */}
        <div className="flex items-start flex-col mb-4">
          <p className="mr-2">서비스횟수</p>
          <p className="text-xs mb-1">
            서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다
          </p>
          <div className="flex justify-between w-[389px]">
            <button
              className="flex justify-center items-center border p-1 mr-2 rounded-full w-10 h-10 text-xl bg-Gray-100"
              disabled
            >
              -
            </button>
            <input
              type="number"
              className="border p-2 rounded-lg text-center w-72 text-Gray-400"
              value={ServiceCount}
              onChange={(e) => setServiceCount(parseInt(e.target.value))}
            />
            <button
              className="flex justify-center items-center border p-1 ml-2 rounded-full w-10 h-10 text-xl bg-Gray-100"
              disabled
            >
              +
            </button>
          </div>
        </div>

        {/* 담당강사 */}
        <div>
          <p>담당강사</p>
          <div className="flex flex-wrap items-end">
            <button className="bg-Gray-100 py-3 px-3 rounded-xl border border-Gray-300"
              onClick={handleSelectMember}>
              선택하기 +
            </button>
            {selectedMemberName && ( // 선택한 직원 이름이 있을 때만 표시
              <div className="border border-Gray-300 rounded-xl px-3 py-2  flex items-center mt-2 ml-2">
                <img src={profile} /><span className="ml-1">{selectedMemberName}</span></div>
            )}
          </div>
        </div>

        {/* 저장버튼 */}
        <button
          className="bg-Pri-500 text-white px-4 py-2 rounded w-full mt-40"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </>
  );
}
