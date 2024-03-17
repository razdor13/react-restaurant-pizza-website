import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.jsx';
import {BrowserRouter  as Router } from 'react-router-dom';
import './style/style.scss';




const root = document.getElementById('root');
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
   <Router>
     <App />
   </Router>
);