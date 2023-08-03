import updateAlarm from '../assets/Graphic_Update_02_230706_250x250 1.png'


// 업데이트 알림 표시 페이지
const Update = () => {
    

    return(
        <div className="flex justify-center items-center flex-col">
            <p className="mb-4 text-2xl font-bold">포인티 업데이트 알림</p>
            <p>포인티 최신 버전이 등록되었습니다.</p>
            <p>최신 버전으로 업데이트하시겠습니까?</p>
            <img src ={updateAlarm}></img>

            <p>*Wi-Fi가 아닐 경우 데이터 요금이 발생할 수 있습니다.</p>
            <button className='bg-Pri-500 text-white px-3 py-4 text-xl w-screen'>업데이트</button>
        </div>
    )
}

export default Update;