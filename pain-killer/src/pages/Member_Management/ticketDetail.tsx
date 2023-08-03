import React, { useState, useEffect } from "react";

interface Ticket {
  id: number;
  name: string;
  description: string;
  status: string;
  // 기타 수강권 정보의 타입을 추가로 정의할 수 있습니다.
}

function TicketDetailPage() {
  const [ticketDetail, setTicketDetail] = useState<Ticket | null>(null);

  // 가정: 수강권 상세 내용을 가져오는 API 호출 함수 (실제로는 해당 API를 사용하여 데이터를 가져와야 합니다)
  const fetchTicketDetail = () => {
    // API를 호출하여 수강권 상세 내용을 가져온다고 가정하고, 다음과 같이 데이터를 설정합니다.
    // 실제로는 fetch 또는 axios 등을 사용하여 API를 호출해야 합니다.
    const sampleData: Ticket = {
      id: 1,
      name: "수강권 정보",
      description: "이벤트 특가 :  설맞이 피티 30% 할인",
      status: "이용중",
      // 기타 수강권 정보...
    };
    setTicketDetail(sampleData);
  };

  // 컴포넌트가 마운트될 때 수강권 상세 내용을 가져옵니다.
  useEffect(() => {
    fetchTicketDetail();
  }, []);

  if (!ticketDetail) {
    // ticketDetail이 null일 경우 로딩 처리 또는 에러 처리 등을 할 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>수강권 상세</div>
        <div>완료</div>
      </div>

      {/* 수강권 정보 */}
      <div>
        {/* 수강권 정보 상단 */}
        <h2>{ticketDetail.name}</h2>
        <div style={{ fontWeight: "bold", marginTop: "10px" }}>
          [{ticketDetail.description}]
        </div>
        <hr />

        {/* 수강권 정보 상세 내용 */}
        <p>수강권 ID: {ticketDetail.id}</p>
        <p>상태: {ticketDetail.status}</p>
        {/* 기타 수강권 정보 표시 */}
        {/* 예시: <p>유효 기간: {ticketDetail.validity}</p> */}
      </div>

      {/* 완료 버튼 */}
      <div className="flex justify-center mt-4">
        <div className="bg-blue-500 text-white rounded-lg px-12 py-3 cursor-pointer">
          완료
        </div>
      </div>

    </React.Fragment>
  );
}

export default TicketDetailPage;
