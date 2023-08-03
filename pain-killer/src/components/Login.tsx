import React, { useState } from "react";
import { ChangeEvent } from "react";

function LoginTsx() {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [logIn, setLogin] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "admin" && pwd === "password") {
      setLogin(true); // success
    } else {
      setLogin(false); // failure
    }
  };

  const isFormValid = username !== "" && pwd !== "";

  return (
    <React.Fragment>
      <div>
        <div>Point T</div>
        <div className="underline text-gray-500 hover:text-blue-400">관리자 로그인</div>
        <div className="underline text-gray-500 hover:text-blue-400">직원 로그인</div>
        <form onSubmit={handleSubmit}>
          <div className="">센터코드</div>
          <input className="border border-gray-400" type="number" />
          <div className="">아이디</div>
          <input className="border border-gray-400" type="id" onChange={handleUsernameChange} />
          <div className="">비밀번호</div>
          <input className="border border-gray-400" type="password" onChange={handlePwdChange} /> <br></br>
          <button 
          className={`bg-gray-500/60 ${isFormValid ? "bg-blue-500" : ""}`} 
          type="submit">
            로그인
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default LoginTsx;
