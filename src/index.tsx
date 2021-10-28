
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme
} from 'amazon-chime-sdk-component-library-react';
import Meeting from './components/Meeting';
import MeetingForm from './components/MeetingForm';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

window.addEventListener('load', () => {
  ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <MeetingProvider>
      <MeetingForm />
      <Meeting/>
    </MeetingProvider>
  </ThemeProvider>
  , document.getElementById('root'));
});






// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

