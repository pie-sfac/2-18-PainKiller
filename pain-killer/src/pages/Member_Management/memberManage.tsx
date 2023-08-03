import React from "react";
/* import { FaUser } from "react-icons/fa"; */

function MemberManagementPage() {
  // 가상의 회원 정보 데이터
  const members = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Michael Johnson", age: 40 },
    // ... 추가 회원 정보
  ];

  return (
    <React.Fragment>
      {/* 헤더 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <FaUser size={40} /> */}
        <h2 style={{ marginLeft: "10px" }}>회원관리 페이지</h2>
      </div>

      {/* 환자 정보 */}
      <React.Fragment>
        <h3>환자 정보</h3>
        <div style={{ textAlign: "left" }}>
          {/* 환자 정보를 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />

      {/* 통증 부위 */}
      <React.Fragment>
        <h3>통증 부위</h3>
        <div style={{ textAlign: "left" }}>
          {/* 통증 부위를 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />

      {/* 문진 기록 */}
      <React.Fragment>
        <h3>문진 기록</h3>
        <div style={{ textAlign: "left" }}>
          {/* 문진 기록을 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />

      {/* 처치 기록 */}
      <React.Fragment>
        <h3>처치 기록</h3>
        <div style={{ textAlign: "left" }}>
          {/* 처치 기록을 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />

      {/* 회원 앨범 */}
      <React.Fragment>
        <h3>회원 앨범</h3>
        <div style={{ textAlign: "left" }}>
          {/* 회원 앨범을 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />

      {/* 알림 메시지 */}
      <React.Fragment>
        <h3>알림 메시지</h3>
        <div style={{ textAlign: "left" }}>
          {/* 알림 메시지를 표시하는 내용 */}
        </div>
      </React.Fragment>
      <hr />
    </React.Fragment>
  );
}

export default MemberManagementPage;
