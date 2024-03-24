import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app.jsx";
import {BrowserRouter as Router} from "react-router-dom";
import "./style/style.scss";
import {Provider} from "react-redux";
import store from "./redux/store.js";




const root = document.getElementById("root");
const rootContainer = ReactDOM.createRoot(root);
rootContainer.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
