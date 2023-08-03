import { useState } from 'react';
import ConfirmLogoutModal from '../components/confirmLogoutModal';

export default function LogoutModal() {
  const [modalShow, setModalShow] = useState(false);

  const refreshToken = localStorage.getItem('refresh_token')

  const showConfirmLogouttModal = async() => {


    try {
      fetch(`http://223.130.161.221/api/v1/logout`, {
        method: 'POST',
        headers: {
          "Authorization" : `Bearer ${refreshToken}`,
        },
      }).then((response) => response.json()).then((result) => console.log(result))

  } catch (error : any) {
    alert(error);
  }

    setModalShow(true);
  };

  return (
    <>
      <div className="mt-3 px-6 py-2 bg-[#2D62EA] rounded-[10px] border-solid border border-[#E7E7E7] drop-shadow-sm">
        <button
          className="text-sm font-extrabold text-white "
          onClick={showConfirmLogouttModal}
        >
          로그아웃
        </button>
      </div>
      {modalShow && <ConfirmLogoutModal setModalShow={setModalShow} />}
    </>
  );
}
