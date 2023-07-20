import React, { useState, useEffect } from "react";

function News() {

  var api_url = '';

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
  'Because this is a fairly long book that employs all of '
  'the antivaxxer tactics, I will spread my posts out into '
  '10 more reasonably digestible pieces to show you how, '
  'as with all antivaxxer speeches, it is a paper tiger. '
  'This book has big promises but, to someone who actually '
  'knows the vaccine science, the book doesn’t really '
  'deliver much of anything at all, other than money in '
  'the “Anonymous” author’s bank account. A more '
  'charitable interpretation of this book is a live '
  'masterclass of science denial/antivax techniques as '
  'explained here along with this illustration of the '
  'major tactics:\n'
  '\n'
  'The general way these articles will be constructed is '
  'quotes with their associated debunks, and answers to '
  'the questions at the end of each chapter, that on first '
  'glance, appear to be gotcha questions, but actually are '
  'easy to answer with just a little extra medical '
  'knowledge. Statements that are repetitive will be '
  'addressed only once or twice (which is why not all of '
  'the debunks answer every single set of end-of-chapter '
  'questions).\n'
  '\n'
  'If you only remember one thing from this series, '
  'remember that there is nothing one can say to a '
  'Children’s Health Defense board member, or a dedicated '
  'antivaxxer, that would convince them that vaccines are '
  'safe and effective. Science doesn’t work that way – '
  'even Mary Holland says, in this book, science must be '
  'willing to challenge old paradigms. That has been done '
  'several times over by dedicated scientists (for '
  'example, the removal of an old rotavirus vaccine for '
  'intussusception). It is actually CHD who is never '
  'willing to change their mind, because it would affect '
  'their income if they actually operated honestly.\n'
  '\n'
  '1. “This paternalistic tendency is evident in '
  'long-standing attempts by scientific and medical '
  'entities to portray the public conversation on vaccines '
  'as a lopsided dispute.”\n'
  '\n'
  'Actually, the reality is more complicated. Medicine '
  'does actually have a history of being paternalistic '
  'towards patients, which is something that even '
  'mainstream physicians cannot dispute. I will easily own '
  'up to our profession having this as a stain on its '
  'reputation in the past. This is why the entire '
  'profession has been coaching its medical students, '
  'nurses, nurse practitioners, pharmacists, and physician '
  'assistants, for an extremely long time, about how to '
  'make medicine more of a shared decision making '
  'process.\n'
  '\n'
  'There still are times where it is medically necessary '
  'to be strict in giving out medical interventions – a '
  'classic example of this is a heart attack. A person '
  'actively having a heart attack is actively putting '
  'their life in danger if they were to reach for their '
  'Arizona homeopath instead of an actual interventional '
  'cardiologist trained and ready to help fix the heart '
  'artery blockage. Extreme paternalism is required to '
  'save a life in this case. At other times, it is '
  'medically necessary to give the patient a full '
  'explanation of what is going on, plus the risks and '
  'benefits of each type of treatment. After the '
  'explanation, a shared decision can be made.\n'
  '\n'"`

    const [more, setMore] = useState("1");

    const handleCatChange = (length) => {
      setMore(length);
    };

    return (
      <div className="flex flex-col justify-center items-center h-[89vh] w-[100%] pb-4 bg-slate-400">

          <div className="flex justify-center w-[100%] h-[10%] bg-transparent text-3xl pt-4 text-white">
            <p> WELCOME TO YOUR CUSTOM NEWS FEED </p>
          </div>

          <div className="flex bg-transparent justify-center w-[90%] gap-2 h-[7%] pb-2">
            <div className="search flex items-center justify-center font-bold rounded-xl bg-sky-50 h-[100%] w-[25%] hover:bg-sky-100">
                        Search News by Title...
              </div>

            <div className="search flex items-center justify-center rounded-xl bg-transparent h-[100%] w-[15%]">

                    <select id="lengths" onChange={(event) => handleCatChange(event.target.value)} 
                          className="bg-slate-600 w-[100%] h-[100%] text-white p4-2 text-lg rounded-lg">
                          <option selected value={"1"}>Policy Domain</option>
                          <option value="2" >Policy Domain 2</option>
                          <option value="3" >Policy Domain 3</option>
                      </select>
                </div>
           </div>

          <div style={{ fontSize: '22px' }} className="flex flex-col items-center w-[90%] h-[85%]  bg-zinc-700 rounded-xl overflow-y-auto p-2">

            <div className="flex justify-center m-3 gap-1 w-[90%] h-[50%]">
              <div className="text-white bg-navy rounded-xl overflow-y-auto p-2 m-2 h-[100%] w-[100%]"><p style={{ fontSize: '28px' }}>Title 1, Author 1</p><p>{sample_text}</p></div>
              <div className="text-white bg-navy rounded-xl overflow-y-auto p-2 m-2 h-[100%] w-[100%]"><p style={{ fontSize: '28px' }}>Title 2, Author 2</p><p>{sample_text}</p></div>
            </div>
            <div className="flex justify-center  m-3 gap-1 w-[90%] h-[50%]">
              <div className="text-white bg-navy rounded-xl overflow-y-auto p-2 m-2 h-[100%] w-[100%]"><p style={{ fontSize: '28px' }}>Title 3, Author 3</p><p>{sample_text}</p></div>
              <div className="text-white bg-navy rounded-xl overflow-y-auto p-2 m-2 h-[100%] w-[100%]"><p style={{ fontSize: '28px' }}>Title 4, Author 4</p><p>{sample_text}</p></div>
          </div>
        
            </div>
      </div>
    );
  }
  
  export default News;