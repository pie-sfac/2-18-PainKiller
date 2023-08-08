import BackImage from '../../img/Back_24px.svg';
import CalIcon from '../../assets/Calendar_24px.svg';
import TimeIcon from '../../assets/Time_24px.svg';
import ProfileIcon from '../../assets/Profile_24px.svg';
import {useState} from 'react';
export default function ChnageSchdule() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  return (
    <>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5">
          <div className="flex justify-between items-center">
            <img src={BackImage} alt="Back" />
            <p className="text-lg ml-2">일정변경</p>
          </div>
        </nav>
      </header>
      <div className="flex justify-left p-6">
        <span className="font-bold">개인 수업</span>
      </div>
      <form className="flex flex-col items-start gap-2">
        <span>일자 선택*</span>
        <div className="flex border rounded-[10px]  px-4 py-2 w-[166px]">
        <input
          type='date'
          className='w-full '
          value={startDate.toISOString().slice(0, 10)}
          onChange={(e) => handleStartDateChange(new Date(e.target.value))}
        />
          
        </div>
        <span>시간 선택*</span>
        <div className="flex border   px-4 py-2 w-[166px]">
        <input
          type='time'
          className='w-full '
          value={startTime}
          onChange={handleStartTimeChange}
        />
         
        </div>{' '}
        ~
        <div className="flex border rounded-[10px]  px-4 py-2 w-[166px]">
        <input
          type='time'
          className='w-full '
          value={endTime}
          onChange={handleEndTimeChange}
        />
         
        </div>
        <span>참여 회원</span>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex border rounded-[10px]  px-4 py-2 gap-2">
            <img src={ProfileIcon} alt="프사" />
            <input
              className="w-full focus:outline-none"
              value="박승환1"
              readOnly
            />
          </div>
          <div className="flex border rounded-[10px]  px-4 py-2  gap-2">
            <img src={ProfileIcon} alt="프사" />
            <input
              className="w-full focus:outline-none"
              value="박승환2"
              readOnly
            />
          </div>
          <div className="flex border rounded-[10px]  px-4 py-2 gap-2">
            <img src={ProfileIcon} alt="프사" />
            <input
              className="w-full focus:outline-none"
              value="박승환3"
              readOnly
            />
          </div>
        </div>
        <span>담당 강사</span>
        <div className="flex border rounded-[10px] px-4 py-2 gap-2 w-1/2">
          <img src={ProfileIcon} alt="프사" />
          <input
            className="w-full focus:outline-none"
            value="박직원"
            readOnly
          />
        </div>
        <span>수업(수강권)</span>
        <select
          className="w-full border rounded-[10px] px-4 py-2 text-[13px]"
          disabled
        >
          <option value="수강권A" selected>
            A 수강권 _ 개인 수업 1:1 PT (60분)
          </option>
        </select>
        <button className="rounded-[4px] bg-[#2D62EA] text-[#FFF] w-full mt-[150px] px-3 py-4">
          확인
        </button>
      </form>
    </>
  );
}
