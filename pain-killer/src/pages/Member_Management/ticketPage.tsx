import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link를 불러옵니다.
import StudyDetails from "../StudyMangement/StudyDetails";

function TicketPage() {
  const [ticketStatus, setTicketStatus] = useState("이용중/종료됨"); // 수강권 상태: 이용중 or 종료됨

  return (
    <React.Fragment>
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>수강권</div>
        <Link to="/tallocate">부여하기</Link>
      </div>

      {/* 수강권 상태 */}
      <div
        style={{
          display: "inline", // 줄바꿈 없이 같은 줄에 표시
          borderBottom: "1px solid black",
        }}
      >
        <h2>수강권</h2>
        <div
          style={{
            color: "gray", // 기본 색상을 회색으로 설정
            cursor: "default", // 토글 없이 마우스 커서를 기본 상태로 설정
            textDecoration: "underline", // Add underline to the text
          }}
        >
          {ticketStatus}
        </div>
      </div>

      {/* 이용중/종료됨 화면 */}
      <div style={{ color: ticketStatus === "이용중" ? "blue" : "red" }}>
        {/* 이용중 또는 종료됨 상태일 때 보여질 내용 */}
        <StudyDetails />
      </div>
    </React.Fragment>
  );
}

export default TicketPage;
