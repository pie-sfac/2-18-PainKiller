// 토큰 관리와 갱신
import axios from 'axios'

// 토큰 갱신 함수 (변경)
const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  try {
    const response = await fetch("http://223.130.161.221/api/v1/tokens", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const result = await response.json();
    localStorage.setItem('access_token', result.accessToken);
    localStorage.setItem('refresh_token', result.refreshToken);
    localStorage.setItem('message', result.message);
  } catch (error) {
    console.error('토큰 갱신 오류:', error);
    // 에러 처리를 하거나 사용자에게 알리는 것이 좋음
  }
};


const instance = axios.create({
  baseURL :  "http://223.130.161.221/api/v1",

})


// 요청이 전달되기 전에 작업 수행 혹은 요청 오류가 있는 함수를 받음
instance.interceptors.request.use(
  //작업 수행
  (config) => {
    const accessToken = localStorage.getItem('access_token');

    console.log(`기존 토큰 : ${accessToken}`)

    /*
      
      테스트용 만료된 access 토큰값 :
      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWVoZWFsdGhjYXJlLmtyIiwiaWF0IjoxNjkwMjk0ODE3LCJzdWIiOiI0IiwiZXhwIjoxNjkwMjk1NzE3fQ.yahj4HNAYhwL4E3Tz7H1TqPn9BRK6Bjvp8hZcoeBxkM

      아니면 직접 만료된 토큰값 찾으셔서 넣어보셔도 됨

    */

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  // 요청 오류
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);



instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log('404 페이지로 넘어가야 함!');
    }

    return response;
  },
  async (error) => {

    console.log(error.response.status); // 401
    
    if (error.response?.status === 401) {

      // 토큰 갱신 함수
      await tokenRefresh();
      
      const new_accessToken = localStorage.getItem('access_token');

      console.log(`새로운 토큰 : ${new_accessToken}`);

      error.config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${new_accessToken}`,
      };

      // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
      const response = await axios.request(error.config);
      return response;
    }

    return Promise.reject(error);
  }
);

export default instance;