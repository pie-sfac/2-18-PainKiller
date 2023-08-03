import React from "react";

function TicketAllocationPage() {
  return (
    <React.Fragment>
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>수강권 부여</h2>
      </div>

      {/* 센터 수강권 내용 */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>OO 센터 수강권</h3>
        <p>센터 수강권 부여 내용</p>
        {/* 추가적인 수강권 부여 내용 등을 표시할 수 있습니다. */}
      </div>

      {/* 수강권 부여에 관련된 내용을 이곳에 추가하면 됩니다. */}
    </React.Fragment>
  );
}

export default TicketAllocationPage;
