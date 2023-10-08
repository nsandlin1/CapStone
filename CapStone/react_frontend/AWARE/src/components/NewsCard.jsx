import './NewsCard.css';

function NewsCard( props ) {
    //console.log(props.image)

    function truncateString(str) {
        const words = str.split(' ');

        if (str == null) {
            return "No text available";
        }
      
        else if (words.length > 10) {
          const truncatedWords = words.slice(0, 10);
          return truncatedWords.join(' ') + '...';
        }

        else {
            return str;
        }
      }
    
function handleNoText(abs) {
    if (abs == "") {     
        return "No text available. Click the source link to read more.";
    }
    else {
        return abs;
    }
}

function processDate(date) {
    // convert 2023-08-09T10:10:00 to 8-9-2020, 10:10 AM
    var date_time = date.split("T");
    var date = date_time[0].split("-");
    var time = date_time[1].split(":");
    var year = date[0];
    var month = date[1];
    var day = date[2];
    var hour = time[0];
    var minute = time[1];
    var am_pm = "AM";
    if (hour > 12) {
        hour = hour - 12;
        var am_pm = "PM";
    }
    var new_date = month + "-" + day + "-" + year + ", " + hour + ":" + minute + " " + am_pm;
    return new_date;
}

    return (
        <div className="news-card">
            <div className="news-header">
                <div className="news-title">
                    {truncateString(props.title)}
                </div>
                <div className="news-date">
                    {processDate(props.date)}
                </div>
                <div className="news-source">
                    <a href={props.link} target="_blank">{props.source}</a>
                </div>
            </div>
            <div className = "news-image">
                <img src={props.image} alt="No image available"/>
            </div>
            <div className="news-content">
                {handleNoText(props.text)}
            </div>
        </div>
    )
}

export default NewsCard;