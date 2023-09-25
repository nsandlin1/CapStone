# Getting started with React-Frontend

run 'npm run dev' to launch the frontend on a local server

# Overview

The entry point of the application is App.jsx. <br/>
This is where the navbar and homepage are displayed. The app uses routing to display the different pages.


# Folder Breakdown

All project files besides App.jsx and main.jsx are found under /pages & /components

The file structure is as follows:

```├── App.css
├── App.jsx
├── assets
│   ├── Photo-unavailable.png
│   └── react.svg
├── components
│   ├── BillCard.jsx
│   ├── Buttons.jsx
│   ├── Classes
│   │   ├── ClassCard.jsx
│   │   └── CreateClass.jsx
│   ├── EventCard.jsx
│   ├── Legends.jsx
│   ├── MockElections
│   │   ├── BallotForm.jsx
│   │   ├── CreateBallot.jsx
│   │   └── ElectionCard.jsx
│   ├── Navbar.jsx
│   ├── NewsCard.css
│   ├── NewsCard.jsx
│   ├── Politicians
│   │   ├── FedHouseReps.jsx
│   │   ├── FedSenateReps.jsx
│   │   └── Politician.jsx
│   ├── Quizzes
│   │   ├── CreateQuiz.jsx
│   │   ├── Quiz.jsx
│   │   └── QuizCard.jsx
│   ├── SmallStateCards.jsx
│   ├── StateCard.jsx
│   ├── StateElectionsMap.jsx
│   ├── StateMajMap.jsx
│   ├── StatePoliticians.jsx
│   └── widgets.jsx
├── index.css
├── main.jsx
├── pages
│   ├── Homepage.jsx
│   ├── Login
│   ├── Login.jsx
│   ├── News.jsx
│   ├── PoliticianLanding.jsx
│   ├── Profile.jsx
│   ├── SignUp.jsx
│   ├── Student
│   │   ├── Bills.jsx
│   │   ├── Calendar.jsx
│   │   ├── Elections.jsx
│   │   └── Politicians.jsx
│   └── Teacher
│       ├── Classes.jsx
│       ├── MockElections.jsx
│       └── Quizzes.jsx
└── utils
    └── ProtectedRoutes.jsx
```

### Pages

All pages for the website are found under the page directory.<br/>
Pages are broken down by user groupd (Student/Teacher) or shared pages.<br/>

Student pages:
* [Bills]
* [Homepage]
* [Politicians]

Teacher pages:
* [Mock Elections](./Documentation/Teachers/MockElections.md)
* [Classes](./Documentation/Teachers/Classes.md)
* [Quizzes](./Documentation/Teachers/Quizzes.md)

### Components

This is where all of the components of the application live.<br/>
The current components are:

* BillCard - displays the title of the bill in a side div on Bills.jsx
* FederalButton - used to change data from state to federal level
* StateButton - used to change data from federal to state level
* FedHouseReps - holds data for current house of representatives
* FedSenateReps - holds data for current senators
* Navbar - the navbar
* Politician - this is the card that houses the politians information

# Testing


### Bills.jsx
The bills page utilizes the BillCard component which can be found under `components/BillCard.jsx` 

When the page is loaded, a call to the backend is made to get a list of the current bills. The bills are placed in an array and then mapped to the BillCard component.

Bills are displayed on the left-hand side of the page.
The right-hand side of the page houses information on the page, on load this section will be blank.

#### Selecting a Bill
Upon selection of a bill, the right-hand side of the page will be populated with the title of the bill, the number of the bill, and the bill summary.

There are three lengths of summary a user can select: short, medium, and long.


[a relative link](./Documentation/Test.md)