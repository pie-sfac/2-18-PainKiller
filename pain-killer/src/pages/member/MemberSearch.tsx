import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 사용을 위해 import 합니다.
import instance from '../../api/axios_interceptors';

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

  const handleSearch = async () => {
    try {
      const response = await instance.get<ApiResponse>(
        `/search?query=${searchText}`,
      );
      setSearchResults(response.data.members);
    } catch (error) {
      console.error('회원 검색 에러:', error);
    }
  };

  const handleSelect = (member: Member) => {
    // 선택된 회원을 부모 컴포넌트로 전달합니다.
    onSelectMember(member);

    // 현재 창을 닫습니다 (새 창에서 열려있는 경우).
    window.close();
  };

  useEffect(() => {
    // 부모 컴포넌트에서 제공된 초기 선택된 회원이 있다면 설정합니다.
    if (initialSelectedMemberId && initialSelectedMemberName) {
      setSelectedMember({
        id: initialSelectedMemberId,
        name: initialSelectedMemberName,
      });
    }

  }, [initialSelectedMemberId, initialSelectedMemberName]);

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {searchResults.map((member) => (
          <li key={member.id} onClick={() => handleSelect(member)}>
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberSearch;
