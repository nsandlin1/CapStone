import { NavLink } from 'react-router-dom';
import './EventCard.css';
import React, { useState, useEffect } from 'react';

export const EventCard = ({ onClass, day, month, year, time, event, calDate, grade}) => {

    var color = "#555";
    const [isHovered, setIsHovered] = useState(false);

   if (isNaN(grade)) {
        color = "#555";}
    else if (grade >= 90) {
         color = '#006400'; // Dark green for 90-100}
    } else if (grade >= 80) {
    color = '#8F8'; // Light green for 80-89
   } else if (grade >= 70) {
     color = 'yellow'; // Yellow for 70-79
    } else if (grade >= 60) {
      color = 'orange'; // Orange for 60-69
     } else {
        color = 'red'; // Red for anything below
      }
    

    const handleClick = () => {
        onClass(day, month, event);
    };



    function AMPM(t) {
    var am_pm = " AM";
    var h = parseInt(t.slice(0,2));
    var m = t.slice(2,5);
    if (parseInt(t.slice(0,2)) > 12) {
        h = h - 12;
        var m=t.slice(2,5);

        var am_pm = " PM";
    }
    return (h) + (m) + am_pm;
}

    if (event != null) {
        const words = event.split(' ');

        if (words[words.length - 1] !== 'Quiz') {
        // If not, add "Election" to the end of the array
        words.push('Quiz');
    }

  // Join the words back together into a single string
        const resultString = words.join(' ');

        event = resultString;
    }

    if (year != null && year == calDate.getFullYear()) {

    return (

        <div className="w-full">
        <NavLink to="/Quiz">
            <div className="quiz-container">
                <div className="event-title">{event}</div>
                <div className="date-info">
                    Due: {month} {day}, by {AMPM(time)}
                </div>
                <div className="grade-info" style={{ color: isHovered ? color : '#555' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>

                    Grade: {grade == null ? "N/A" : grade}
                </div>
            </div>
        </NavLink>
        </div>


    ) }
    else {
        return ("")
    }
}