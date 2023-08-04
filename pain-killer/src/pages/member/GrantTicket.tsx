import React, {useEffect, useState} from 'react';
import { useLocation, useParams } from "react-router-dom";
import instance from "../../api/axios_interceptors";


interface Ticket {
    id: 0,
    title: string,
    lessonType: string,
    defaultCount: number,
    defaultTerm: number,
    defaultTermUnit: string,
    isActive: boolean,
    maxServiceCount: number,
    issuedTicketCount: number,
    bookableLessons: BookableLessons[]
  }

interface BookableLessons{
    id: number,
    type: string,
    title: string,
    duration: number,
    maxGroupMember: number
}


const GrantTicket = () => {

    const {ticketId} = useParams();
    const location = useLocation();

    const memberId = location.state.id;


    console.log("티켓 아이디 " + ticketId);
    console.log("멤버 아이디 " + memberId);

    // 티켓 상세 정보 불러오기
    const getTicketInfo = async () => {
        try{
            const response = await instance.get(`/tickets/${ticketId}`);

            console.log(response.data)
        }
        catch(error){
            alert(error);
        }
       

    }

    // 담당강사 불러오기
    const getTutor = async () => {
        try{
            const response = await instance.get('/staffs');
            console.log(response.data.datas)
        } 
        catch(error){
            alert(error);
        }

    }

    useEffect(()=> {
        getTicketInfo();
        getTutor();
    },[])

    

    return(
        <div>수강권 부여</div>
    )

}

export default GrantTicket;