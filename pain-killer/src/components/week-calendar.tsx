import React, { useEffect, useState, useRef } from 'react';
import { DayPilotCalendar } from '@daypilot/daypilot-lite-react';
import '../assets/style/week-calendar.css';

export default function WeekCalendar() {
  const [config, setConfig] = useState({
    viewType: 'Week',
    durationBarVisible: false,
  });

  const calendarRef = useRef();

  useEffect(() => {
    // load event data
    calendarRef.current.control.update({
      startDate: '2023-07-20',
      events: [
        {
          id: 1,
          text: '강파이',
          start: '2023-07-17T09:00:00',
          end: '2023-07-17T10:00:00',
          backColor: '#ebf1ff',
        },
        {
          id: 2,
          text: '05분 상담',
          start: '2023-07-18T09:00:00',
          end: '2023-07-18T10:00:00',
          backColor: '#4fb564',
        },
        {
          id: 3,
          text: 'Event 3',
          start: '2023-10-03T12:00:00',
          end: '2023-10-03T15:00:00',
          backColor: '#f1c232',
        },
        {
          id: 4,
          text: 'Event 4',
          start: '2023-10-01T11:30:00',
          end: '2023-10-01T14:30:00',
          backColor: '#cc4125',
        },
      ],
    });
  }, []);

  return (
    <div>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </div>
  );
}
