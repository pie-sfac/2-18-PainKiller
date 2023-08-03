import React, { useState, useEffect } from "react";

interface MyPage {
  name: string;
  phone: string;
  id: string;
}

function MyPage() {
  const [userData, setUserData] = useState<MyPage>();
  const [isLoading, setIsLoading] = useState(true);


  const TOKEN = localStorage.getItem('access_token')

  const fetchUserDataFromAPI = async () => {
    try {
      // Perform the API call using fetch or any other library (e.g., axios)
      const response = await fetch("http://223.130.161.221/api/v1/me", {
        method: "GET",
        headers: {
          // Add any required headers (e.g., authorization token) here
          'Authorization' : `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setUserData(data);

      localStorage.setItem('hashKey', data.hashKey);
      console.log(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataFromAPI();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Failed to fetch user data.</div>;
  }

  return (
    <React.Fragment>
      {/* Display user data */}
      <h2>{userData.name}</h2>
      <p>Phone: {userData.phone}</p>
      {/* Add other user information here */}

      {/* Other components or content related to the MyPage */}
    </React.Fragment>
  );
}

export default MyPage;
