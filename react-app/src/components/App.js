import React, { useEffect, useContext, useState } from "react";
import "../css/app.css"
import EntryMenu from "./EntryMenu";
import {Session} from "./Session";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Auth from '../contexts/Auth'
import { getUsernameFromLS } from '../contexts/Auth';

function App() {


    const username = getUsernameFromLS()
    

    return (
        <Router>
            <Auth>
                <Routes>
                        <Route path='/' exact element={ <EntryMenu username={username} registerModal={registerModal} setRegisterModal={setRegisterModal} />} />
                        <Route path='/session/:session_id' element={ <Session username={username} registerModal={registerModal} setRegisterModal={setRegisterModal}/>} />
                </Routes>
            </Auth>     
        </Router>
    )
}

export default App