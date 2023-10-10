run "yarn start-api" to start flask backend


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

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

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

All pages for the website are found under the page directory.<br/>
Pages are broken down by user groupd (Student/Teacher) or shared pages.<br/>

Student pages:
* [Bills](./Documentation/Students/Bills.md)
* [Politicians](./Documentation/Students/Politicians.md)
* [Elections](./Documentation/Students/Elections.md)
* [News](./Documentation/Students/News.md)
* [Calendar](./Documentation/Students/Calendar.md)

Teacher pages:
* [Mock Elections](./Documentation/Teachers/MockElections/MockElections.md)
* [Classes](./Documentation/Teachers/Classes.md)
* [Quizzes](./Documentation/Teachers/Quizzes.md)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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