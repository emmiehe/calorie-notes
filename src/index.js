import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <h2 id="navbar" className="navbar">
      <a href="https://ancient-harbor-28509.herokuapp.com/">Go to Portfolio</a>
    </h2>
    <div><h3 style={{margin: "0.5rem", padding: "1rem", minWidth: "36vh", color: "#f0644b"}}>Calorie notes is a simple application built with React.js. It allows users to add draggable notes. It also updates the total calories accordingly.</h3></div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
