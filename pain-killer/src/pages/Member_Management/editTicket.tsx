import React, { useState, useEffect } from "react";

function EditTicketPage() {
  interface Ticket {
    id: number;
    name: string;
    description: string;
    validity: number;
    serviceCount: number;
  }

  // API로부터 수강권 관련 정보를 불러오는 함수 (가정)
  const fetchTicketDataFromAPI = () => {
    return Promise.resolve({
      id: 1,
      name: "기본 수강권",
      description: "이벤트 특가: 설맞이 피티 30% 할인",
      validity: 30,
      serviceCount: 10,
    });
  };

  const [ticketData, setTicketData] = useState<Ticket | null>(null);

  useEffect(() => {
    fetchTicketDataFromAPI().then((data) => setTicketData(data));
  }, []);

  if (!ticketData) {
    return <div>Loading...</div>;
  }

  // 편집한 수강권 정보를 저장하는 함수 (실제로는 서버로 업데이트하는 등의 로직 추가 필요)
  const handleSave = (editedTicketData: Ticket) => {
    console.log("수강권 정보 저장:", editedTicketData);
    // 실제로는 서버로 업데이트하는 등의 로직을 추가해야 합니다.
  };

  return (
    <React.Fragment>
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>수강권 편집</div>
        <div className="text-black" onClick={() => handleSave(ticketData)}>저장</div>
      </div>

      {/* 수강권 정보 */}
      <div>
        <h2>{ticketData.name}</h2>
        <p>{ticketData.description}</p>
        <p>유효 기간: {ticketData.validity}일</p>
        <p>서비스 횟수: {ticketData.serviceCount}회</p>
        {/* 기타 수강권 정보 표시 */}
      </div>

      {/* 푸터 */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid #ccc", padding: "10px" }}>
        <button className="rounded-lg px-6 py-2 border" onClick={() => console.log("뒤로 가기")}>뒤로</button>
        <button className="text-white bg-blue-600 rounded-lg px-6 py-2 border ml-4" onClick={() => console.log("확인")}>확인</button>
      </div>
    </React.Fragment>
  );
}

export default EditTicketPage;
