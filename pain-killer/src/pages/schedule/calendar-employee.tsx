import { useState } from 'react';
import Dropdown from 'react-dropdown';
import Calendar from 'react-calendar';
import Table from '../../components/table';
import SchedulModal from '../../components/schedulModal';

// import '../../assets/style/dropdown.css';
import '../../assets/style/calendar.css';

export default function CalendarEmployee(this: any) {
  const [value, onChange] = useState(new Date());
  const [schedule, setSchedule] = useState(false);

  const scheduleHandle = () => {
    setSchedule(true);
  };

  const options = ['월', '주', '일'];
  const defaultOption = options[0];

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const year = value.getFullYear();
  const month =
    value.getMonth() + 1 < 10
      ? `0${value.getMonth() + 1}`
      : value.getMonth() + 1;
  const date = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate();
  const day = week[value.getDay()];

  const current_date = `${month}.${date}(${day})`;

  const columns = ['출결', '진행시간', '회원명(총인원)', '잔여 횟수'];
  const data = Array(3)
    .fill()
    .map(() => ({
      attendance: 'svg',
      progress_time: '24:00~04:04',
      member_name: '황황황황황(1)',
      remaining: '888회',
    }));

  const access_Token = localStorage.getItem('access_token');

  return (
    <>
      <div className="mb-4 flex items-center">
        <div className="flex justify-between w-20 h-8 mr-2 px-3 py-1 text-left font-black bg-white rounded-[10px] flex-1">
          <p>
            {year}년 {month}월
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_594_22971)">
              <path
                d="M17.6 5.45455H16.9V4H15.5V5.45455H8.5V4H7.1V5.45455H6.4C5.63 5.45455 5 6.10909 5 6.90909V18.5455C5 19.3455 5.63 20 6.4 20H17.6C18.37 20 19 19.3455 19 18.5455V6.90909C19 6.10909 18.37 5.45455 17.6 5.45455ZM17.6 18.5455H6.4V10.5455H17.6V18.5455ZM17.6 9.09091H6.4V6.90909H17.6V9.09091Z"
                fill="#1D1D1D"
              />
            </g>
            <defs>
              <clipPath id="clip0_594_22971">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <Dropdown
          className="mr-2"
          options={options}
          value={defaultOption}
          placeholder="Select an option"
        />

        <button className="mr-1">
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
        </button>
        <button className="mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_22_1051)">
              <path
                d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.57 5.11 19.4 5.02 19.22 5.02C19.16 5.02 19.1 5.03 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.88996 5.03 4.82996 5.02 4.76996 5.02C4.59996 5.02 4.42996 5.11 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.42996 18.89 4.59996 18.98 4.77996 18.98C4.83996 18.98 4.89996 18.97 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.11 18.97 19.17 18.98 19.23 18.98C19.4 18.98 19.57 18.89 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM17.45 11.27C17.49 11.58 17.5 11.79 17.5 12C17.5 12.21 17.48 12.43 17.45 12.73L17.31 13.86L18.2 14.56L19.28 15.4L18.58 16.61L17.31 16.1L16.27 15.68L15.37 16.36C14.94 16.68 14.53 16.92 14.12 17.09L13.06 17.52L12.9 18.65L12.7 20H11.3L10.95 17.52L9.88996 17.09C9.45996 16.91 9.05996 16.68 8.65996 16.38L7.74996 15.68L6.68996 16.11L5.41996 16.62L4.71996 15.41L5.79996 14.57L6.68996 13.87L6.54996 12.74C6.51996 12.43 6.49996 12.2 6.49996 12C6.49996 11.8 6.51996 11.57 6.54996 11.27L6.68996 10.14L5.79996 9.44L4.71996 8.6L5.41996 7.39L6.68996 7.9L7.72996 8.32L8.62996 7.64C9.05996 7.32 9.46996 7.08 9.87996 6.91L10.94 6.48L11.1 5.35L11.3 4H12.69L13.04 6.48L14.1 6.91C14.53 7.09 14.93 7.32 15.33 7.62L16.24 8.32L17.3 7.89L18.57 7.38L19.27 8.59L18.2 9.44L17.31 10.14L17.45 11.27ZM12 8C9.78996 8 7.99996 9.79 7.99996 12C7.99996 14.21 9.78996 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 9.99996 13.1 9.99996 12C9.99996 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
                fill="#1D1D1D"
              />
            </g>
            <defs>
              <clipPath id="clip0_22_1051">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          className="w-12 h-8 text-white font-black bg-[#6691ff] rounded-[4px] justify-self-end"
          onClick={scheduleHandle}
        >
          +
        </button>
      </div>
      <Calendar
        calendarType="gregory"
        onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
        value={value}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        } // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        next2Label={null} //next2Label/prev2Label: null 을 넣음으로 삭제
        prev2Label={null}
      />
      <div className="mt-4 px-6 py-2 bg-white rounded-t-lg">
        <div className="font-extrabold text-[#6691ff]">{current_date}</div>
      </div>
      <div className="mb-2 px-4 py-2 bg-[#ebf1ff] rounded-b-lg flex justify-between ">
        <div className="mr-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="5"
            viewBox="0 0 4 5"
            fill="none"
          >
            <circle cx="2" cy="2.5" r="2" fill="#505050" />
          </svg>
          <p className="ml-1 text-xs">총 일정: 100건</p>
        </div>
        <div className="mr-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="5"
            viewBox="0 0 4 5"
            fill="none"
          >
            <circle cx="2" cy="2.5" r="2" fill="#505050" />
          </svg>
          <p className="ml-1 text-xs">취소 일정: 100건</p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="5"
            viewBox="0 0 4 5"
            fill="none"
          >
            <circle cx="2" cy="2.5" r="2" fill="#505050" />
          </svg>
          <p className="ml-1 text-xs">취소율: 100%</p>
        </div>
      </div>
      <div className="mt-4 px-3 py-2 text-xs bg-[#f4f4f4] rounded-t-lg border-[2px] flex items-center">
        <div className="mr-1 w-2 h-2 bg-[#6691ff] rounded-[2px]"></div>
        <p className="mr-2 text-[#6691ff]">출석</p>
        <div className="mr-1 w-2 h-2 bg-[#df291d] rounded-[2px]"></div>
        <p className="mr-2 text-[#df291d]">결석</p>
        <div className="mr-1 w-2 h-2 bg-[#505050] rounded-[2px]"></div>
        <p className="mr-2 text-[#505050]">예약</p>
        <div className="mr-1 w-2 h-2 border-[1.5px] border-[#1fb881] rounded-[2px]"></div>
        <p className="text-[#1fb881]">상담</p>
      </div>
      <div className="bg-[#f4f4f4] rounded-b-lg border-x-[2px] border-b-[2px]">
        <Table columns={columns} data={data} />
      </div>
      {schedule && <SchedulModal setSchedule={setSchedule} />}
    </>
  );
}
