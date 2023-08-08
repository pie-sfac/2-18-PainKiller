import React, { useEffect, useState, useRef } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import instance from '../../api/axios_interceptors';

import SchedulModal from './schedulModal';
import '../../assets/style/calendar.css';
import { getDateMeta } from '@fullcalendar/core/internal';

interface CalendarData {
  users: [
    {
      id: number;
      name: string;
    },
  ];
  counselingSchedules: [
    {
      id: number;
      startAt: string;
      endAt: string;
      memo: string;
      isCanceled: boolean;
      canceledAt: string;
      counselor: {
        id: number;
        name: string;
      };
      client: {
        memberId: number;
        name: string;
        phone: string;
      };
      createdAt: string;
      updatedAt: string;
    },
  ];
  privateSchedules: [
    {
      id: number;
      tutor: {
        id: number;
        name: string;
      };
      startAt: string;
      endAt: string;
      memo: string;
      isCanceled: boolean;
      canceledAt: string;
      issuedTicket: {
        id: number;
        lessonType: string;
        title: string;
        startAt: string;
        endAt: string;
        remainingCount: number;
        defaultCount: number;
        serviceCount: number;
        availableReservationCount: number;
        defaultTerm: number;
        defaultTermUnit: string;
        isSuspended: boolean;
        suspendedAt: string;
        isCanceled: boolean;
        canceledAt: string;
        createdAt: string;
        updatedAt: string;
      };
      attendanceHistories: [
        {
          id: number;
          member: {
            id: number;
            name: string;
            phone: string;
          };
          status: string;
        },
      ];
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [schedule, setSchedule] = useState(false);
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentMonth = calendarApi.view.title;
      setCurrentMonth(currentMonth);
      console.log('현재 달:', currentMonth);
    }
  }, [currentMonth]);

  const getCalendarData = async () => {
    try {
      // const response = await instance.get('/schedules', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // console.log(response);
    } catch (error) {
      // 오류 처리
      console.error('캘린더 오류:', error);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setcurrentEvents(events);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'title',
            center: 'prev next today',
            right: 'dayGridMonth,timeGridWeek,timeGridDay, addButton',
          }}
          initialView="dayGridMonth"
          locale="ko"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          // eventAdd={function (info: any) {
          //   const currentMonth = info.view.title;
          //   console.log('현재 달:', currentMonth);
          // }}
          customButtons={{
            addButton: {
              text: '+',
              click: function () {
                setSchedule(true);
              },
            },
          }}
        />
      </div>
      {schedule && <SchedulModal setSchedule={setSchedule} />}
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
