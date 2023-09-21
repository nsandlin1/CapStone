import React, { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

function News() {
  const [news, setNews] = useState([]);
  const [loadingBills, setLoadingBills] = useState(true);
  const [error, setError] = useState(null);
  var api_url = 'http://localhost:5000/api/news_and_elections/news_general?';

  function getNewsList() {   
    console.log("fetching news")
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
            var newData = [];
            for (const item of data){
              //console.log(item);
              if (item["title"] == '[Removed]') {
                continue;
              }
              else {
                newData.push(item);
              }
            }
            setNews(newData);
            setError(null);
        })
        .catch((err) => {
            console.log(err.message)
            setError(err);
        })
        .finally(() => {
            console.log("loading is false")
            setLoadingBills(false);
        });
}
  
useEffect(() => {
  if (news.length == 0) {
      getNewsList();
  }
  
}, [])

  const my_text = "sample text..."
  const name = "Author, Author"
  const sample_text = `If you haven’t heard about this book yet, it’s written '
  'by “Anonymous”, edited by Children’s Health Defense '
  'lawyer Mary Holland and Children’s Health Defense '
  'Publisher Liaison and Thinking Moms’ Revolution '
  'co-founder Zoey O’Toole, and published by “The Turtles '
  'Team”. It purports to use only mainstream references to '
  'prove its points. But the gist of the book is that they '
  'are hostile to all vaccines and will not stop until '
  'nobody gets vaccines anymore and all the mandates are '
  'removed.\n'
  '\n'
  "`

    const [more, setMore] = useState("1");

    const handleCatChange = (length) => {
      setMore(length);
    };

    return (
      <div className="flex flex-col justify-center items-center h-[89vh] w-[100%] pb-4 bg-slate-400">

          <div className="flex justify-center w-[100%] h-[8%] bg-transparent text-2xl pt-4 md:text-2xl text-sm font-bold text-white">
            <p> WELCOME TO YOUR CUSTOM NEWS FEED </p>
          </div>

          <div className="flex bg-transparent justify-center w-[80%] gap-2 h-[8%] pb-2">
            <div className="search flex items-center justify-center font-bold rounded-xl bg-sky-50 h-[100%] md:w-[40%] md:text-lg text-sm w-[60%] hover:bg-sky-100">
                        Search News by Title...
              </div>

            <div className="search flex items-center justify-center rounded-xl bg-transparent h-[100%] md:w-[25%] w-[50%]">

                    <select id="lengths" onChange={(event) => handleCatChange(event.target.value)} 
                          className="bg-slate-600 w-[100%] h-[100%] text-white p4-2 md:text-lg text-sm rounded-lg">
                          <option selected value={"1"}>Policy Domain</option>
                          <option value="2" >Policy Domain 2</option>
                          <option value="3" >Policy Domain 3</option>
                      </select>
                </div>
           </div>

          <div style={{ fontSize: '22px' }} className="flex flex-col gap-4 items-center w-[90%] h-[100%] bg-slate-300 rounded-xl overflow-y-auto p-2">
                <div className="flex flex-wrap items-center justify-center w-full gap-4">
                    {loadingBills && <font color="#ffffff">Loading News Feed...</font>}
                        {error && <font color="#ffffff">There has been a problem loading news.</font>}
                        {!loadingBills && (
                            news.map((news) => {
                                return <NewsCard text={news.abstract} date={news.published_date} title={news.title} source={news.company} link={news.url} image={news.imgURL}/>
                            })
                            
                        )}
                </div>
        
            </div>
      </div>
    );
  }
  
  export default News;