import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 사용을 위해 import 합니다.
import instance from '../../api/axios_interceptors';
import { useNavigate } from 'react-router';

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

interface User {
  id: number;
  type: 'ADMIN' | 'USER'; // 사용자 유형은 'ADMIN' 또는 'USER'만 가능하도록 타입 설정
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
}

interface ApiResponse {
  searchParam: {
    query: string;
    resources: string[];
  };
  members: Member[];
  users: User[];
  message: string;
}

interface Props {
  onSelectMember: (member: Member) => void;
  initialSelectedMemberId?: number;
  initialSelectedMemberName?: string;
}

const MemberSearch: React.FC<Props> = ({
  onSelectMember,
  initialSelectedMemberId,
  initialSelectedMemberName,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const response = await instance.get<ApiResponse>(
        `/search?query=${searchText}`,
      );
      setSearchResults(response.data.members);
      console.log('여긴가?',setSelectedMember)
    } catch (error) {
      console.error('회원 검색 에러:', error);
    }
  };

  
  const handleSelect = (member: Member) => {
    // 선택된 회원을 부모 컴포넌트로 전달
    onSelectMember(member);
    console.log('회원 아이디:' , member.id)
  };

  useEffect(() => {
    if (initialSelectedMemberId && initialSelectedMemberName) {
      setSelectedMember({
        id: initialSelectedMemberId,
        name: initialSelectedMemberName,
      });
    }

  }, [initialSelectedMemberId, initialSelectedMemberName]);

  const handleNavigation = () => {
    console.log('SchduleManger로 이동 중');
    navigate('/schedule', {
      state: {
        selectedMemberId: 123,
        selectedMemberName: 'John Doe',
      },
    });
  };

  return (
    <div className='mt-1'>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='border border-Gray-200 rounded-xl p-1.5'
        placeholder='회원을 검색하세요'
      />
      <button onClick={handleSearch} className='bg-Pri-50 text-Pri-500 py-1 px-1.5 rounded-lg'>검색</button>
      <ul>
        {searchResults.map((member) => (
          <li key={member.id} onClick={() => handleSelect(member)}>
            {member.name} {member.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberSearch;
