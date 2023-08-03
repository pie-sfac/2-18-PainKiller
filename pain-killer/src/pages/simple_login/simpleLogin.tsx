import React, { useState, useEffect, /* Fragment */ } from "react";
/* import { FaTrash } from "react-icons/fa"; */
import { Link } from "react-router-dom";

// ▲ 휴지통 아이콘 안되서 저렇게 만들어두었음. 

interface User {
  id: number;
  name: string;
}

function SimpleLoginPage() {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  // API에서 최근 로그인한 사용자 데이터를 가져와서 설정합니다.
  useEffect(() => {
    // API 호출 로직 작성
    // ...

    // 임시로 데이터를 설정합니다.
    const tempData: User[] = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
    ];
    setRecentUsers(tempData);
  }, []);

  return (
    <React.Fragment>
      <div>
        <header>
          {/* <FaTrash /> */} Point T
        </header>
        <div className="mt-4">
          <h2 className="text-gray-600">간편 로그인</h2>
          <h3 className="mt mt-0 text text-gray-400">최근 로그인한 사용자</h3>
          <Link to="/login">
            <button className="mt-3 bg-transparent border 
            border-gray-400 text-gray-400 py-2 px-2 rounded">
              다른 아이디로 로그인
            </button>
          </Link>
          <div className="text-gray-400 mt mt-4">
            {recentUsers.map((user) => (
              <div key={user.id}>{user.name}</div>
            ))}
          </div>
        </div>
        {/* 이후에 API에서 받아온 데이터를 뿌리는 부분 추가 */}
      </div>
    </React.Fragment>
  );
}

export default SimpleLoginPage;
