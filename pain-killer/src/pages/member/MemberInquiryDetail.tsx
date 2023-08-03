import React, { useState, useEffect } from 'react';

interface MemInquiry {
  id: 73;
  name: string; //"이름김"
  phone: number; //"010-5050-7070"
  job: string; //"학생",
  birthDate: '2003-07-26'; // 형식 지정을 어떻게 줘야 하나요??? 이거 말고도 밑에 visitedAt.createdAt, updatedAt에도 날짜 시간 ... 다 있는데
  sex: boolean; //"MALE",  male 아님 female 둘 중 하나라서 boolean 아닐까 생각함
  acqusitionFunnel: string; //"인터넷"
  acquisitionFunnel: string; //"인터넷"
  visitedAt: '2023-07-26T22:20:59.927213';
  createdAt: '2023-07-26T22:21:00';
  updatedAt: '2023-07-26T22:21:00';
}

const memberInquiryDetail = () => {
  const [useData, setuseData] = useState<MemInquiry>();
  const access_token = localStorage.getItem('access_token');

  const inq_member = async () => {
    try {
      const result = await fetch('http://223.130.161.221/api/v1/members/73', {
        method: 'GET',
        headers: {
          Authorization: `Beareer${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const notice = await result.json();
      setuseData(notice);
      console.log(notice);
    } catch (error) {
      console.log('Error fetching user data has been detected.', error);
    }
  };

  useEffect(() => {
    inq_member();
  }, []);

  return (
    <React.Fragment>
      <h2>id:</h2>
      <p>{useData?.id}</p>
    </React.Fragment>
  );
};

export default memberInquiryDetail;
