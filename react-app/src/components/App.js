import React from "react";
import "../css/app.css"
import EntryMenu from "./EntryMenu";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Auth from '../contexts/Auth'
import { getUsernameFromLS } from '../contexts/Auth';
import SessionWrapper from "./SessionWrapper";

function App() {

    const username = getUsernameFromLS()
   

    return (
        <Router>
            <Auth>
                <Routes>
                        <Route path='/' exact element={ <EntryMenu />} />
                        <Route path='/session/:session_id' element={<SessionWrapper />} />
                </Routes>
            </Auth>     
        </Router>
    )
}

export default App