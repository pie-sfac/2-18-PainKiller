import React, { useState, useEffect } from 'react';
import profileEdit from '../../assets/Profile edit_48px.png';
import regCertificate from '../../assets/image 28.png';
import instance from '../../api/axios_interceptors';

interface CentreInfo {
    id: string,
    name: string,
    centerCode: number
}

const CenterInfo = () => {

  const [result, setResult] = useState<CentreInfo>()

  const inq_centre = async () => {
    try{
      const rep = await instance.get('/me/center');
      setResult(rep.data)
      console.log(rep)
    } catch(error : any){
      alert(error);
    }
  }

  useEffect(() => {
    inq_centre();
  }, [])


    return(
        <div className="bg-[#F4F4F4] flex flex-col items-center gap-2 p-6">
            <div className="w-full text-left">
                <span className="text-base font-bold">센터 정보</span>
            </div>
            <div className="w-full bg-white rounded-lg flex items-center justify-between px-6 py-4">
                <div className='flex items-center gap-1'>
                    <img src={profileEdit} alt = "프로필수정"/>
                    <span className='font-bold text-[#2D62EA] text-[15px]'>{result?.name}</span>
                </div>
                <div className="bg-gray-100 rounded-lg px-2 py-1 text-[5px]">
                    센터 정보 수정이 필요하신가요?
                </div>
            </div>
            <div className="w-full bg-white rounded-lg flex items-start flex-col px-5 py-4 gap-2">
                <div className='w-full flex flex-row justify-between'>
                    <span>센터코드</span>
                    <span className='font-bold'>{result?.centerCode}</span>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <span>대표자</span>
                    <span className='font-bold'>박사장</span>
                </div>
                <div className='w-full flex flex-row justify-between mb-5'>
                    <span>사업자 번호</span>
                    <span className='font-bold'>243 - 69 - 011</span>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <span>사업자 등록증 이미지</span>
                    <img className='rounded-md' src ={regCertificate} alt='사업자 등록증 이미지'/>
                </div>
            </div>
        </div>
    )

}

export default CenterInfo;