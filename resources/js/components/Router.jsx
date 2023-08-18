import React, {useState, useEffect, useRef, useMemo, useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Login from './Login';


function Router()
{
    return <Routes>
        <Route path="/login" Component={Login}></Route>
    </Routes>
}


let target = document.querySelector('main');
if (target) {
    ReactDOM.createRoot(target).render(
        <React.StrictMode>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </React.StrictMode>
    );
}
