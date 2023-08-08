import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackImage from '../../img/Back_24px.svg'

interface Schedule {
  
    users: [
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        },
        {
            id: number,
            name: string,
        }
    ],
    counselingSchedules: [
        {
            id: number,
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            counselor: {
                id: number,
                name: string
            },
            client: {
                memberId: string,
                name: string,
                phone: string,
            },
            createdAt: string,
            updatedAt: string,
        }
    ],
    privateSchedules: [
        {
            id: number,
            tutor: {
                id: number,
                name: string,
            },
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            issuedTicket: {
                id: number,
                lessonType: string,
                title: string,
                startAt: string,
                endAt: string,
                remainingCount: number,
                defaultCount: number,
                serviceCount: number,
                availableReservationCount: number,
                defaultTerm: number,
                defaultTermUnit: string,
                isSuspended: boolean,
                suspendedAt: string,
                isCanceled: boolean,
                canceledAt: string,
                createdAt: string,
                updatedAt: string
            },
            attendanceHistories: [
                {
                    id: 85,
                    member: {
                        id: 21,
                        name: "이아현",
                        phone: "010-1234-1234"
                    },
                    status: string,
                }
            ],
            createdAt: string,
            updatedAt: string
        },
        {
            id: number,
            tutor: {
                id: number,
                name: string
            },
            startAt: string,
            endAt: string,
            memo: string,
            isCanceled: boolean,
            canceledAt: string,
            issuedTicket: {
                id: number,
                lessonType: string,
                title: string,
                startAt: string,
                endAt: string,
                remainingCount: number,
                defaultCount: number,
                serviceCount: number,
                availableReservationCount: number,
                defaultTerm: number,
                defaultTermUnit: string,
                isSuspended: boolean,
                suspendedAt: string,
                isCanceled: boolean,
                canceledAt: string,
                createdAt: string,
                updatedAt: string,
            },
            attendanceHistories : [
                {
                    id: number,
                    member: {
                        id: number,
                        name: string,
                        phone: string,
                    },
                    status: string,
                }
            ],
            createdAt: string,
            updatedAt: string;
        }
    ]
}



const inquiry_schedule = () =>  {

  const { schedule } = useParams();

  const navigate = useNavigate();

  const onPrepage = () => {
    navigate(-1);
  }
}