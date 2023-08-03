import React from "react";
import { useParams } from "react-router-dom";

interface UserParams {
  id: string;
  [key: string]: string | undefined;
}


function UserDetailPage() {
  const { id } = useParams<UserParams>();

  // 여기서 API를 통해 해당 사용자 정보를 가져와서 사용할 수 있습니다.
  // 센터코드와 아이디도 가져온 정보를 토대로 자동으로 채울 수 있습니다.

  // 키패드 올리기 함수
  const focusPasswordField = () => {
    const passwordInput = document.getElementById("password-input");
    if (passwordInput) {
      passwordInput.focus();
    }
  };

// 센터코드와 아이디를 API로부터 가져왔다고 가정하고 변수에 저장합니다.
// It is temporary.
const centerCode = "ABC123";
const userId = "user123";

return (
  <div>
    <h1>User ID: {id}</h1>
    {/* 센터코드와 아이디 입력 칸 */}
    <div className="mt-4">
      <label htmlFor="center-code">센터코드:</label> <br></br>
      <input
        id="center-code"
        className="border border-gray-400 px-2 py-2 rounded"
        type="text"
        value={centerCode}
        readOnly
      />
    </div>
    <div className="mt-2">
      <label htmlFor="user-id">아이디:</label><br></br>
      <input
        id="user-id"
        className="border border-gray-400 px-2 py-2 rounded"
        type="text"
        value={userId}
        readOnly
      />
    </div>

    {/* 비밀번호 입력 칸 */}
    <div className="mt-4">
        <label htmlFor="password-input">비밀번호:</label>
    </div>
    <input
      id="password-input"
      className="border border-gray-400 mt-4 px-2 py-2 rounded"
      type="password"
      onFocus={focusPasswordField} // 키패드 올리기
      placeholder="비밀번호를 입력해주세요"
    />

    <div className="mt-4">
      <button className="border border-gray-400 px-12 py-2 rounded">로그인</button>
    </div>
  </div>
);
}

export default UserDetailPage;
