import React from "react";
import "../css/app.css"
import EntryMenu from "./EntryMenu";
import Session from "./Session";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' exact element={ <EntryMenu/>} />
            <Route path='/session/:session_id' element={ <Session />} />
        </Routes>        
    </Router>
  )
}

export default App;
