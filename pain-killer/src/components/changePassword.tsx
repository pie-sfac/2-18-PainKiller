import React, { useState } from "react";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isResetComplete, setIsResetComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      setMessage("비밀번호가 일치합니다.");
      setIsResetComplete(true);
    } else {
      setMessage("다시 입력하세요.");
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    window.alert("비밀번호 재설정 완료"); //alert 창으로 옮김
  };

  const handleNextButton = () => {
    handleChangePassword();
    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <div>
        <header>
          <i className="fas fa-arrow-left"></i> 비밀번호 변경
        </header>
        
        <div className="mt mt-2">
          임시비밀번호 변경 
        </div>
        <div className="mt mt-2">
          아이디 
          <div className="mt mt-2">
            <input 
            className="border border-gray-400 bg-gray-100" 
            type="text" 
            value="" readOnly />
          </div>
        </div>
        <div className="mt mt-2">
          변경할 비밀번호(pin)
          <div className="mt mt-2">
            <input
              className="border border-gray-400"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt mt-2">
          변경할 비밀번호 재확인(pin) 
          <div className="mt mt-2">
            <input
              className="border border-gray-400"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <br />
        <button>취소</button>{" "}
        <button onClick={handleNextButton}>다음</button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <p>비밀번호 재설정 완료</p>
              <button onClick={handleModalConfirm}>확인</button>
            </div>
          </div>
        )}
        {message && !isResetComplete && <p>{message}</p>}
      </div>
    </React.Fragment>
  );
}

export default ChangePassword;
