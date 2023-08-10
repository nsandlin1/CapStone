import React, { useState, useEffect } from 'react';
import { Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import { EventCard } from "../components/EventCard";

// template dict for holding election events
var eventsByMonth = {
  "January": [], "February": [], "March": [],
  "April": [], "May": [], "June": [],
  "July": [], "August": [], "September": [],
  "October": [], "November": [], "December": [],
}

// tests if two dates are the same day, used for rendering events onto correct dates
function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

// converts "01" -> "January"
function convertToMonthName(monthCode) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const numericMonth = parseInt(monthCode, 10);
  
  if (numericMonth >= 1 && numericMonth <= 12) {
    return monthNames[numericMonth - 1];
  } else {
    return "Invalid month code";
  }
}

function tileNames({ date, view }) {
  if (view === 'month') {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const eventsForMonth = eventsByMonth[month];

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

  var api_url = 'http://localhost:5000/api/news_and_elections/elections?';
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

    // Update the eventsByMonth dictionary with the events from the API
  function updateMonths(eventList, eventsByMonth) {
    eventList.forEach((item) => {

      console.log(item.election_day)
      // 2025-06-06
      var month = convertToMonthName(item.election_day.substring(5,7));
      var eventName = item.name;
      var day = item.election_day.substring(8,10);
      
      if (!eventsByMonth[month]) {
        eventsByMonth[month] = [];
      }

      const targetArray = [parseInt(day), eventName];
      const targetMonth = month;

      const monthEvents = eventsByMonth[targetMonth];
      const found = monthEvents.some(event => JSON.stringify(event) === JSON.stringify(targetArray)); 

      if (!found) {
        eventsByMonth[month].push([parseInt(day), eventName]);
      }
    })

    return eventsByMonth;
  }

  // API call to get events 
  function getEventsList() {   
    console.log("fetching events")
    fetch(api_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }
            return response.json()
        })
        .then((data) => {
            setEvents(data);
            console.log(data);
            eventsByMonth = updateMonths(data, eventsByMonth);
            setError(null);
        })
        .catch((err) => {
            console.log(err.message)
            setError(err);
        })
        .finally(() => {
            console.log("loading is false")
            setLoadingEvents(false);
        });
}
  
useEffect(() => {
  if (events.length == 0) {
      getEventsList();

  }
}, []);


  useEffect(() => {
    // Collect events for the selected month whenever the month changes
    const month = date.toLocaleString('en-US', { month: 'long' });
    const eventsForMonth = eventsByMonth[month] || [];
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