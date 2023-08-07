import React, { useState, useEffect } from 'react';
import instance from '../../api/axios_interceptors';

interface Member {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

interface ApiResponse {
  searchParam: {
    query: string;
    resources: string[];
  };
  members: Member[];
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

  useEffect(() => {
    // 부모 컴포넌트에서 제공된 초기 선택된 회원이 있다면 설정합니다.
    if (initialSelectedMemberId && initialSelectedMemberName) {
      setSelectedMember({
        id: initialSelectedMemberId,
        name: initialSelectedMemberName,
      });
    }

    // ... (기존 코드)
  }, [initialSelectedMemberId, initialSelectedMemberName]);

  const handleSelect = (member: Member) => {
    // 선택된 회원을 부모 컴포넌트로 전달합니다.
    onSelectMember(member);

  };

  useEffect(() => {
    // Listen for messages from the parent window
    window.addEventListener('message', (event) => {
      const { type, selectedMember } = event.data;
      if (type === 'CURRENT_SELECTED_MEMBER' && selectedMember) {
        // Set the selected member in the state
        setSelectedMember(selectedMember);
      }
    });
  }, []);

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
