import StudyDetailsHeader from '../../components/StudyDetailsHeader';
import StudyModifying from '../../components/StudyModifying';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ModifiyingModal from './ModifiyingModal';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GrantList from './GrantList';
import instance from '../../api/axios_interceptors';


// 수강권 상세페이지

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
  bookableLessons: {
    id: number;
    type: string;
    title: string;
    duration: number;
    maxGroupMember: number;
  }[];
}

export default function StudyDetails() {
  const [ticketData, setTicketData] = useState<Ticket | null>(null); // 수강권 데이터를 저장할 상태 변수
  const { ticketId } = useParams<{ ticketId: string }>(); // URL 파라미터에서 ticketId를 가져옴
  const [isEditing, setIsEditing] = useState(false);
  const [lessonType, setLessonType] = useState(''); // 수업 유형
  const [title, setTitle] = useState(''); // 수강권명
  const [duration, setDuration] = useState(0); // 시간
  const [defaultCount, setDefaultCount] = useState(0); // 기본 횟수
  const [defaultTerm, setDefaultTerm] = useState(0); // 수강권 기간
  const [defaultTermUnit, setDefaultTermUnit] = useState('DAY'); // 수강권 기간 단위
  const [isExhausted1, setIsExhausted1] = useState(false); // 슬라이드 토글 버튼1
  const [isExhausted2, setIsExhausted2] = useState(false); // 슬라이드 토글 버튼2
  const [maxServiceCount, setMaxServiceCount] = useState(0); // 서비스 횟수
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isActive ,setIsActive] = useState(false);
  const [ticketStatus, setTicketStatus] = useState<boolean>(false); //

  const handleToggle1 = () => {
    setIsExhausted1(!isExhausted1);
  };

  const handleToggle2 = () => {
    setIsExhausted2(!isExhausted2);
  };

  // 상세 정보 수정 취소 시 호출되는 함수
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // 상세 정보 편집 모드로 변경하는 함수
  const handleEditTicket = () => {
    setIsEditing(true);
  };

  // 상세 정보 수정 폼 제출 시 호출되는 함수
  const handleSaveEdit = async (e) => {
  e.preventDefault(); // 폼 제출을 막음

  console.log('수정된 title:', title);
  console.log('수정된 defaultCount:', defaultCount);
  console.log('수정된 defaultTerm:', defaultTerm);
  

  try {
    // 수정된 정보를 서버로 보내는 API 요청
    const response = await instance.put(
      `/tickets/${ticketData.id}`,
      {
        title: title,
        defaultCount: defaultCount,
        defaultTerm: defaultTerm,
        defaultTermUnit: defaultTermUnit,
        isActive : isActive
        
      },
      {
        headers: {
         
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('수강권 수정이 성공적으로 저장되었습니다.');

  } catch (error) {
    console.error('수강권 수정 저장 오류:', error);

  }

  // 수정 후 편집 모드 종료
  setIsEditing(false);
  // 모달 보여주기
  setShowModal(true);
};


 // 수정 모달이 닫힐 때 호출되는 함수
 const closeModal = () => {
  setShowModal(false);
  // 로컬 스토리지를 지워 수강권 상태를 초기화
  localStorage.removeItem('ticketStatus');
};

  useEffect(() => {
    fetchTicketData(); // 컴포넌트가 마운트되면 ticket 데이터를 가져옴
  }, []);

  useEffect(() => {
    // 수정 모드일 때만 실행
    if (isEditing && ticketData) {
      setLessonType(ticketData.lessonType);
      setTitle(ticketData.title);
      setDuration(ticketData.bookableLessons[0].duration); // 수정된 부분
      setDefaultCount(ticketData.defaultCount);
      setDefaultTerm(ticketData.defaultTerm);
      setDefaultTermUnit(ticketData.defaultTermUnit);
    }
  }, [isEditing, ticketData]);




  // 서버로부터 ticket 데이터를 가져오는 함수
  const fetchTicketData = async () => {
    try {
      const response = await instance.get<Ticket>(
        `/tickets/${ticketId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTicketData(response.data); // 가져온 데이터를 상태 변수에 저장
      setLoading(false);
    } catch (error) {
      console.error('수강권 데이터 가져오기 오류:', error);
      setLoading(false);
    }
  };

  const handleDeleteTicket = async () => {
    if (!ticketData) {
      console.error('삭제할 수강권 정보가 없습니다.');
      return;
    }
  
    try {
    
      const response = await instance.delete(
        `/tickets/${ticketData.id}`,
        {
          headers: {
            'Content-Type': 'application/json',

          },
        }
      );
  
      console.log('수강권이 성공적으로 삭제되었습니다.');
      // 삭제 후 추가적인 동작을 수행할 수 있도록 작성
    } catch (error) {
      console.error('수강권 삭제 오류:', error);
    }
  };

  useEffect(() => {
    const fetchAndSetTicketData = async () => {
      const data = await fetchTicketData();
      if (data) {
        setTicketData(data);
        setLoading(false);
      }
    };
  
    fetchAndSetTicketData(); // 컴포넌트가 마운트되면 ticket 데이터를 가져옴
  }, [ticketId]);

  // 영어값을 한글로 변환하는 함수
  function convertTermUnitToKorean(termUnit: string) {
    switch (termUnit) {
      case 'MONTH':
        return '개월';
      case 'WEEK':
        return '주';
      case 'DAY':
        return '일';
      default:
        return termUnit;
    }
  }

  const handleDecreaseServiceCount = () => {
    setMaxServiceCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  const handleIncreaseServiceCount = () => {
    setMaxServiceCount((prevCount) => prevCount + 1);
  };

  // 수강권 부여내역 페이지로 이동하는 함수
  const handleMoveToGrantList = () => {
    if (ticketData) {
      navigate(`/grant-list/${ticketData.id}`);
    }
  };



  // 컴포넌트가 마운트될 때 LocalStorage에서 ticketData를 불러와 ticketData 상태를 설정
useEffect(() => {
  const storedTicketData = localStorage.getItem('ticketData');
  if (storedTicketData) {
    setTicketData(JSON.parse(storedTicketData));
    setLoading(false);
  } else {
    // LocalStorage에 ticketData가 없을 경우 서버에서 데이터를 가져옴
    fetchTicketData();
  }
}, []);

const handleToggleActivation = async (isActive: boolean) => {
  try {
    await instance.post(`/tickets/${ticketId}/${isActive ? 'activate' : 'deactivate'}`, {}, {
      headers: { 'Content-Type': 'application/json' },
    });

    setTicketData((prevData) => {
      if (prevData) {
        const updatedData = {
          ...prevData,
          isActive: isActive,
        };
        return updatedData;
      }
      return prevData;
    });

    console.log('수강권이 성공적으로 변경되었습니다.');
  } catch (error) {
    console.error('수강권 변경 오류:', error);
    alert('판매 상태 변경에 실패했습니다. 다시 시도해주세요.');
  }
};


useEffect(() => {
  const storedStatus = localStorage.getItem('ticketStatus');
  if (storedStatus) {
    setTicketStatus(JSON.parse(storedStatus));
  } else {
    // fetchTicketStatus();
  }
}, []);
const isTicketActive = ticketData ? ticketStatus : false;





  return (
    <>
      {isEditing ? (
        <StudyModifying isEditing={isEditing} onEdit={handleCancelEdit} />
      ) : (
        <StudyDetailsHeader
          onDeleteTicket={handleDeleteTicket}
          onEditTicket={handleEditTicket}
          onToggleActivation={handleToggleActivation}
          isTicketActive={ticketData ? ticketData.isActive : false}
        />
      )}
      {/* ticketData가 로드되기 전에 렌더링 되는 상황을 처리 */}
      {ticketData ? (
        <>
          {isEditing ? (
            <div>
              <div className="flex items-start flex-col mb-4">
                <p className=" mb-1">수업유형*</p>
                <select
                  className="border p-2 w-[389px] rounded-lg"
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value)} // 변경된 부분
                  disabled={isEditing} // 편집 모드일때 비활성화
                >
                  <option value="">선택</option>
                  <option value="SINGLE">1:1 개인수업</option>
                  <option value="GROUP">그룹 수업</option>
                </select>
              </div>

              {/* 수강권명 입력 */}
              <div className="flex items-start flex-col mb-4">
                <p className="mr-2">수강권명*</p>
                <input
                  type="text"
                  className="border p-2 w-[389px] rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isEditing} // 편집 모드일때 비활성화
                />
              </div>

              {/* 수강권기간 입력 */}
              <div className="flex items-start flex-col mb-4">
                <p className="mr-2">수강권기간*</p>
                <div className="flex justify-between">
                  <input
                    type="number"
                    className="border p-2 rounded-lg mr-1 w-[245px]"
                    value={defaultTerm}
                    onChange={(e) => setDefaultTerm(e.target.value)}
                    // disabled={isEditing} // 편집 모드일때 비활성화
                  />
                  <select
                    className="border p-2  rounded-lg w-36"
                    value={defaultTermUnit}
                    onChange={(e) => setDefaultTermUnit(e.target.value)}
                  >
                    <option value="MONTH">개월</option>
                    <option value="WEEK">주</option>
                    <option value="DAY">일</option>
                  </select>
                </div>
              </div>
              {/* 슬라이드 토글 버튼 */}
              <div className="flex justify-end  mb-4">
                <p className="text-Gray-400 text-sm">소진시 까지</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={handleToggle1} // handleToggle1을 연결
                    checked={isExhausted1} // isExhausted1을 연결
                    disabled={isEditing} // 편집 모드일때 비활성화
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {/* 시간 */}
              <div className="flex items-start flex-col mb-4">
                <p className="mr-2">시간*</p>
                <div className="flex items-end">
                  <input
                    type="number"
                    className="border p-2 rounded-lg w-[372px]"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={isEditing} // 편집 모드일때 비활성화
                  />
                  <span className="ml-2">분</span>
                </div>
              </div>

              {/* 기본횟수 */}
              <div className="flex items-start flex-col mb-4">
                <p className="mr-2">기본횟수*</p>
                <div>
                  <input
                    type="number"
                    className="border p-2 rounded-lg w-[372px]"
                    value={defaultCount}
                    onChange={(e) => setDefaultCount(e.target.value)}
                  />
                  <span className="ml-2">회</span>
                </div>
              </div>
              {/* 슬라이드 토글 버튼 */}
              <div className="flex justify-end  mb-4">
                <p className="text-Gray-400 text-sm">무제한 </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={handleToggle2} // handleToggle2를 연결
                    checked={isExhausted2} // isExhausted2를 연결
                  />
                  <span className="slider"></span>
                </label>
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
                    onClick={handleDecreaseServiceCount}
                  >
                    -
                  </button>
                  <p className="border p-2 rounded-lg text-center w-72">
                    {maxServiceCount}회
                  </p>
                  <button
                    className="flex justify-center items-center border p-1 ml-2 rounded-full w-10 h-10 text-xl bg-Gray-100"
                    onClick={handleIncreaseServiceCount}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 저장버튼 */}
              <button
                className="bg-Pri-500 text-white px-4 py-2 rounded w-full mt-40"
                onClick={handleSaveEdit}
              >
                저장
              </button>
            </div>
          ) : (
            // 편집 모드가 아닐 때, 기본 상세 정보 뷰 표시
            <>
              {/* ticketData를 이용하여 수강권 상세 정보를 화면에 표시 */}
              <div className=" mt-6">
                <div className="flex  items-end ">
                  <p className="text-left truncate  font-semibold text-2xl">
                    {ticketData.title}
                  </p>
                  <p className="text-right  bg-Pri-50 text-xs px-2 py-1 rounded text-Pri-500 ml-4 ">
                    {ticketData.lessonType === 'GROUP'
                      ? '그룹수업'
                      : '개인수업 - 1:1'}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-end mt-10 mb-2 ">
                <p className="text-lg font-semibold text-Gray-800">
                  수강권 내용
                </p>
                <button
                  className="text-Pri-500"
                  onClick={handleMoveToGrantList}
                >
                  수강권 부여내역
                </button>
              </div>
              <div className="border border-Gray-200 rounded-xl p-6 mb-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-left mb-3 text-Gray-400">
                      시간
                      <span className="text-Gray-900 font-semibold ml-14">
                        {ticketData.bookableLessons[0].duration}분
                      </span>
                    </p>
                    <p className="text-left mb-3 text-Gray-400">
                      기본 횟수
                      <span className="text-Gray-900 font-semibold ml-6">
                        {ticketData.defaultCount}회
                      </span>
                    </p>
                    <p className="text-left mb-3 text-Gray-400">
                      수강권 기간
                      <span className="text-Gray-900 font-semibold ml-3">
                        {ticketData.defaultTerm}{' '}
                        {convertTermUnitToKorean(ticketData.defaultTermUnit)}
                      </span>
                    </p>
                    <p className="text-left mb-3 text-Gray-400">
                      수강권 상태
                      <span className={`font-semibold ml-3 text-Pri-300 ${ticketData.isActive ? '' : 'text-error'}`}>
                        {ticketData.isActive ? '판매중' : '판매종료'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        // ticketData가 로드되기 전에 로딩 중인 상태를 표시
        <p>Loading…</p>
      )}

      <ModifiyingModal isOpen={showModal} onClose={closeModal} />
    </>
  );
}