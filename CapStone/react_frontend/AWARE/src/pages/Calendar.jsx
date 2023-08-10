import React, { useState, useEffect } from 'react';
import { Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import { EventCard } from "../components/EventCard";

const events = {
  "January": [], "February": [], "March": [],
  "April": [], "May": [], "June": [],
  "July": [[2, "Arkansas Election"]], "August": [[8,"Primary Election"], [7, "Local Election"], [17, "Mississippi Election"]], "September": [[15, "National Election"]],
  "October": [], "November": [], "December": [],
}

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function tileNames({ date, view }) {
  if (view === 'month') {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const eventsForMonth = events[month];

    if (eventsForMonth) {
      for (const [eventDay, eventName] of eventsForMonth) {
        if (day === eventDay) {
          return <div className="text-xs">{eventName}</div>;
        }
      }
    }
  }

  return null;
}

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [eventsForSelectedMonth, setEventsForSelectedMonth] = useState([]);

  useEffect(() => {
    // Collect events for the selected month whenever the month changes
    const month = date.toLocaleString('en-US', { month: 'long' });
    const eventsForMonth = events[month] || [];
    setEventsForSelectedMonth(eventsForMonth);
  }, [date]);

  // Update the selected date when the month changes
  const handleDateChange = (value, event) => {
    if (value instanceof Date) {
      setDate(value);
    }
    else {setDate(value.activeStartDate)}
  };

  return (
    <div className="p-4  bgblue h-[89vh]">
      <div className="bg-transparent p-2 m-2 flex justify-center">
        <h1 className="text-4xl  font-bold mb-6 text-white">Upcoming Events</h1>
      </div>

      <div className="mx-auto flex h-[75%] flex-row p-4 border shadow-lg rounded-lg">
        <Cal
          className="text-2xl w-[50%] h-[100%] bg-slate-300 rounded-xl hover:shadow"
          onChange={handleDateChange} // Update the selected date
          onActiveStartDateChange={handleDateChange} // Update the month when navigating
          tileClassName="text-slate-800 text-base p-3 h-[7vh] m-3 font-bold"
          tileContent={tileNames}
        ></Cal>

        <div className="w-[50%] h-[100%] flex-col justify-center">
          <div className="w-[100%] text-4xl m-2 font-bold flex justify-center"> Events this Month: </div>
          {eventsForSelectedMonth.map((event, index) => (
            <div key={index} className="w-[100%] text-xl font-bold flex justify-left">
              <EventCard day={event[0]} month={date.toLocaleString('en-US', { month: 'long' })} event={event[1]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;