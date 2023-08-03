import BackImage from '../../../img/Back_24px.svg';
import instance from '../../../api/axios_interceptors';
import React, { useState, useEffect } from 'react';
import {  useNavigate,useParams } from 'react-router-dom';

interface TicketParams {
  ticketId: string;
}
interface SearchParam {
  query: string;
  resources: string[];
}

interface Member {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

interface User {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
}

interface SearchResponse {
  searchParam: SearchParam;
  members: Member[];
  users: User[];
  message: string;
}

interface SearchResult {
  id: number;
  name: string;
}

export default function SearchPrivateCharge() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  // const [selectedMemberName, setSelectedMemberName] = useState<string>('');
  const { ticketId } = useParams<TicketParams>(); // 티켓 ID 동적으로 받아옴

  useEffect(() => {
    // API에서 데이터를 가져와서 searchResults 상태를 업데이트하는 함수
    const fetchSearchResults = async () => {
      try {
        const response = await instance.get<SearchResponse>(
          `/search?query=${searchQuery}`
        );

        setSearchResults(response.data.members);
      } catch (error) {
        console.error('검색 결과를 가져오는데 오류 발생:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // searchQuery가 비어있을 때 searchResults 초기화
    }
  }, [searchQuery]);

  const handleSelectMember = (memberId: number, memberName: string ) => {
    // 이전 페이지로 돌아가면서 선택한 memberId를 전달
    navigate(`/createstudyticket/${ticketId}?selectedMemberId=${memberId}&selectedMemberName=${encodeURIComponent(memberName)}`);
    
  }

  return (
    <>
      <header className="bg-white border-b border-t-neutral-100">
        <nav className="flex p-5 justify-between">
          <div className="flex justify-between items-center">
            {/* ... */}
            <input
              type="text"
              className="bg-Gray-100 px-4 py-1 w-[300px] ml-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>검색</button>
          </div>
        </nav>
      </header>
  
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <p>{result.name}</p>
            <button onClick={() => handleSelectMember(result.id, result.name)}>
              선택하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
  
  
  
  
  
  
}
