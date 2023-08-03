import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearchEnter = (e) => {
    e.preventDefault();
    navigate(`/search`, { state: { value: search } });
  };

  return (
    <div className="w-full">
      <form
        className=" px-4 py-1 bg-white rounded-[10px] flex"
        onSubmit={handleSearchEnter}
      >
        <input
          className="flex-1 placeholder:text-xs placeholder:font-normal"
          placeholder="회원/멤버 이름, 연락처로 검색하세요"
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
    </div>
  );
}
