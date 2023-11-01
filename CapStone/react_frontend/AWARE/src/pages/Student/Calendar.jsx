import React, { useState, useEffect } from 'react';
import { Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays, set } from 'date-fns';
import { EventCard } from "../../components/EventCard";

// template dict for holding election events
// key: month name, value: list of [day, event name] pairs
var eventsByMonth = {
  "January": [], 
  "February": [[21, "Wisconsin Primary", 2023]], 
  "March": [],
  "April": [],
  "May": [[16, "Kentucky Primary", 2023], [16, "Pennsylvania Primary", 2023]],
  "June": [[6, "New Jersey Primary", 2023], [20, "Virginia Primary", 2023]],
  "July": [], 
  "August": [[1, "Washington Primary", 2024], [8, "Mississippi Primary", 2023]], 
  "September": [],
  "October": [[14, "Louisiana Gubernatorial Election", 2023]], 
  "November": [ [7, "Kentucky Gubernatorial Election", 2023], [7, "Mississippi Gubernatorial Election", 2023]], 
  "December": [],
}

var quizzesByMonth = {
  "January": [],
  "February": [], 
  "March": [],
  "April": [],
  "May": [],
  "June": [],
  "July": [], 
  "August": [], 
  "September": [],
  "October": [], 
  "November": [], 
  "December": [],
}

// tests if two dates are the same day, used for rendering events onto correct dates
function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

// convert all instances of <State Name> to <State Code> (e.g. "New York" -> "NY")
function convertStatetoCode(input) {
  const usStates = {
    "Alabama": 'AL',
    "Alaska": 'AK',
    "Arizona": 'AZ',
    "Arkansas": 'AR',
    "California": 'CA',
    "Colorado": 'CO',
    "Connecticut": 'CT',
    "Delaware": 'DE',
    "Florida": 'FL',
    "Georgia": 'GA',
    "Hawaii": 'HI',
    "Idaho": 'ID',
    "Illinois": 'IL',
    "Indiana": 'IN',
    "Iowa": 'IA',
    "Kansas": 'KS',
    "Kentucky": 'KY',
    "Louisiana": 'LA',
    "Maine": 'ME',
    "Maryland": 'MD',
    "Massachusetts": 'MA',
    "Michigan": 'MI',
    "Minnesota": 'MN',
    "Mississippi": 'MS',
    "Missouri": 'MO',
    "Montana": 'MT',
    "Nebraska": 'NE',
    "Nevada": 'NV',
    "New Hampshire": 'NH',
    "New Jersey": 'NJ',
    "New Mexico": 'NM',
    "New York": 'NY',
    "North Carolina": 'NC',
    "North Dakota": 'ND',
    "Ohio": 'OH',
    "Oklahoma": 'OK',
    "Oregon": 'OR',
    "Pennsylvania": 'PA',
    "Rhode Island": 'RI',
    "South Carolina": 'SC',
    "South Dakota": 'SD',
    "Tennessee": 'TN',
    "Texas": 'TX',
    "Utah": 'UT',
    "Vermont": 'VT',
    "Virginia": 'VA',
    "Washington": 'WA',
    "West Virginia": 'WV',
    "Wisconsin": 'WI',
    "Wyoming": 'WY'
  };

  var arr = input.split(" ");

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] in usStates) {
        arr[i] = usStates[arr[i]];
       }
      else if (arr[i] != "" && arr[i].replace(',', '') in usStates) {
        arr[i] = usStates[arr[i]];
      }
      else if (arr[i] != "" && arr[i] != null && arr[i] + " " + arr[i+1] in usStates) {
        arr[i] = usStates[arr[i] + " " + arr[i+1]];
        arr[i+1] = "";
      }
      else {
        arr[i] = arr[i];
      }
    }

    var str = arr.join(" ");
    while (str.includes("Election") || str.includes("Gubernatorial") || str.includes("Primary")) { 
    str = str.replace("Primary", "Prim.")
    str = str.replace("General", "Gen.")
    str = str.replace("Special", "Spec.")
    str = str.replace("Election", "Elec.")
    str = str.replace("Gubernatorial", "Gub.")
    }
    return str;
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

function tileNames({ date, view}) {
  if (view === 'month') {
    const month = date.toLocaleString('en-US', { month: 'long' });
    //console.log(month);
    const day = date.getDate();
    const curYear = date.getFullYear();
    const eventsForMonth = eventsByMonth[month] || [];
    var str = "";

    if (quizzesByMonth[month] != []) {
      //console.log("True")
      for (const [eventDay, eventName, year, time] of quizzesByMonth[month]) {
        //console.log("QUIZNAME: " + eventName)
        //console.log(eventDay);
        if (day == eventDay && year == curYear) {
          if (!(str.includes(eventName))) {
          //console.log("SUCCESS");
          if (str !== "") {
            str += ", ";
          }

          if (eventName.includes("Quiz")) { str += eventName; }
          else { str += eventName + " Quiz"; }
        }
        }
      }
     }

    if (eventsByMonth[month] != []) {
      
      //console.log("API:", eventsByMonth[month])
      for (const [eventDay, eventName, year] of eventsForMonth) {
        //console.log(year == curYear)
        if (day === eventDay && year == curYear) {
          if (str !== "") {
            str += ", ";
          }
          
          str += eventName;
          //console.log("STR: " + str)
        }
      }
      return <div className='' > 
      <div className="h-20 text-sm">
        { convertStatetoCode(str) }
      </div>
    </div>
    }
  }

  return null;
}

function Calendar() {

  const [date, setDate] = useState(new Date());
  const [eventsForSelectedMonth, setEventsForSelectedMonth] = useState([]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  var api_url = '/api/news_and_elections/elections?';
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);
  const [isContent, setIsContent] = useState(false);

  const [quizzes, setQuizzes] = useState([]);
    
  function titleInEvents(title, month, grade=null) {
    if (quizzesByMonth[month] == []) {
      return false;
    }
    for (let quiz in quizzesByMonth[month]) {
      console.log(grade);
      console.log(quizzesByMonth[month])
      if (quizzesByMonth[month][quiz][1] == title) {
        if (quizzesByMonth[month][quiz][4] != grade)
        {
          quizzesByMonth[month][quiz][4] = grade;
          setEventsForSelectedMonth(quizzesByMonth[month]);
        }
        return true;
      }
    }
    return false;
  }

  function updateQMonths(quizzes) { 

    setQuizzes(quizzes);
    console.log(quizzes)
    
    for (var i = 0; i < quizzes.length; i++) {
      //console.log("UPDATING QUIZZES: " + i) + quizzes[i]["name"];
      var quizI = quizzes[i];
      var qTitle = quizI["title"];
      var qDate = quizI["due_date"]
      qDate = qDate.split(" ");
      var mth = qDate[2];
      var Qday = qDate[1];
      var Qyear = qDate[3];
      var Qtime = qDate[4];
      var Qsplit = Qtime.split(":");
      Qtime = Qsplit[0] + ":" + Qsplit[1];
      var grade = quizI["grade"];

      // update quizzesByMonth by adding quiz to the correct month in date order
      for (let key in quizzesByMonth) {
        if (key.includes(mth)) {
          if (quizzesByMonth[key].length == 0) {
            quizzesByMonth[key].push([Qday, qTitle, Qyear, Qtime]);
          }
          else {
            for (let quiz in quizzesByMonth[key]) {
                if (!titleInEvents(qTitle, key, grade)) {
                quizzesByMonth[key].push([Qday, quizI["title"], Qyear, Qtime, grade]);
                }
                else {
                  if (quizzesByMonth[key] == []) {
                    quizzesByMonth[key].push([Qday, quizI["title"], Qyear, Qtime, grade]);
                  }
                  else {
                    if (quizzesByMonth[key][quiz][1] == qTitle) {
                    quizzesByMonth[key][quiz][4] = grade;
                    }
                  }
            }
      }
      //console.log("KEY == OCT: " + quizzesByMonth[key]);
      }
    }
      }
    }
    //console.log("QUIZZES IN OCT: " + quizzesByMonth["October"]["name"]);
  }

   function callQuizAPI() {
        //const apiUrl = '/api/quizzes/get_quizzes';
        const user = JSON.parse(localStorage.getItem('user'));
        //console.log(user["role"])
        console.log("fetching quizzes")

        if (user["role"] == "Student") {
              // Define the API endpoint URL
              const apiUrl = `/api/classes/get_student_quizzes?email=${user['email']}`;
              // Fetch data from the API
              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  // Update the state with the fetched data
                  updateQMonths(data);
                  //console.log(data);
                })
                .catch((error) => {
                  console.error('Error fetching news data:', error);
          }); }

          else { setQuizzes([])}
          console.log((quizzes != [] && quizzes != null) ? "Quizzes: " + quizzes : "No quizzes found");

          // if (quizzes != []) { // ins ert into quizzesByMonth (sort before inserting)
          //   for(quiz in quizzes) {console.log(quiz)};
          // }


        }

    // Update the eventsByMonth dictionary with the events from the API
  function updateMonths(eventList, eventsByMonth) {
    eventList.forEach((item) => {

      // console.log(item.election_day)
      // 2025-06-06
      var month = convertToMonthName(item.election_day.substring(5,7));
      var eventName = item.name;
      var day = item.election_day.substring(8,10);
      var eventYear = item.election_day.substring(0,4);
      
       if (!eventsByMonth[month]) {
         eventsByMonth[month] = [];
       }

      const targetArray = [parseInt(day), eventName, eventYear];
      const targetMonth = month;

      const monthEvents = eventsByMonth[targetMonth];
      const found = monthEvents.some(event => JSON.stringify(event) === JSON.stringify(targetArray)); 

      if (!found) {
         eventsByMonth[month].push([parseInt(day), eventName, eventYear]);
         //setEventsForSelectedMonth(eventsByMonth[month]);
       }
    })

    return eventsByMonth;
  }

  // API call to get events 
  function getEventsList() {
    callQuizAPI();   
    console.log("fetching events")
    var api_url = '/api/news_and_elections/elections?';
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
            //console.log(data);
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
  if (events.length == 0 || quizzes.length == 0) {
      getEventsList();

  }
}, []);


  useEffect(() => {
    // Collect events for the selected month whenever the month changes
    
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const eventsForMonth = quizzesByMonth[month] || []; // add a refresh and duplicate check here
    setEventsForSelectedMonth(eventsForMonth.sort(function (a, b) { return a[0] - b[0] }));

    if (eventsForMonth.length > 0) {
      for (let i in eventsForMonth) {
        //console.log(eventsForMonth[i][2], year)
        if (parseInt(eventsForMonth[i][2]) == parseInt(year)) {
          setIsContent(true);
          break;
        }
        else {
          if (i == eventsForMonth.length - 1) {
          setIsContent(false);
        }
      }
      
    }
  }
    else {
      setIsContent(false);
    }
  }, [quizzes, eventsByMonth, date]);

  // Update the selected date when the month changes
  const handleDateChange = (value, event) => {
    if (value instanceof Date) {
      //console.log(value);
      setDate(value);
      
    }
    else {setDate(value.activeStartDate)}
    //useEffect();
  };

  //console.log(eventsByMonth)
  return (
    <div className="p-4 bgblue h-[91vh]">
      <div className="bg-transparent p-2 m-2 flex justify-center">
        <h1 className="text-2xl md:text-4xl mx-auto font-bold mb-6 text-white">Upcoming Events</h1>
      </div>

      <div className="mx-auto flex h-[auto] flex-row p-2 bgnavy shadow-lg rounded-xl">
      {(screenWidth > 1375) ?
        <Cal
          className="w-[50%] h-[full] bg-blue-200 rounded-lg shadow-md hover:shadow-lg border-blue-400 rounded-xl hover:border-blue-500"
          onChange={handleDateChange} // Update the selected date
          onActiveStartDateChange={handleDateChange} // Update the month when navigating
          tileClassName="text-slate-600 h-[8.5vh] mx-auto p-0 m-0 font-semibold rounded-lg hover:text-black"
          tileContent={tileNames}
        ></Cal>
        
        :
        <Cal
          className="w-[100%] h-[full] bg-blue-200 rounded-lg shadow-md hover:shadow-lg border-blue-400 rounded-xl hover:border-blue-500"
          onChange={handleDateChange} // Update the selected date
          onActiveStartDateChange={handleDateChange} // Update the month when navigating
          tileClassName="text-slate-600 h-[8.5vh] mx-auto p-0 m-0 font-semibold rounded-lg hover:text-black"
          tileContent={tileNames}
      ></Cal>
      }

        {(!isContent && screenWidth > 1375) ?  
        
           <div className="w-[50%] flex-col ">
        <div className="w-[100%] text-2xl m-2 text-white font-bold justify-center text-center"> You Have No Upcoming Quizzes this Month. </div>
        </div>
        :
        (isContent && screenWidth > 1375) ?
        <div className="w-[50%] h-[100%] flex-col justify-center hidden md:block">
          <div className="w-[100%] text-4xl m-2 text-white font-bold flex justify-center">Upcoming Quizzes:</div>
          {eventsForSelectedMonth.map((event, index) => (
            <div key={index} className="w-[100%] md:text-xl font-bold flex justify-left">
              <EventCard day={event[0]} month={date.toLocaleString('en-US', { month: 'long' })} year={event[2]} time={event[3]} event={event[1]} calDate={date} grade={event[4]} />
            </div>
          ))}
        </div>
        : 
        <div></div>
}
      </div>
          



    </div>
  );
}

export default Calendar;