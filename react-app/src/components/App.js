import React from "react";
import "../css/app.css"
import EntryMenu from "./EntryMenu";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' exact element={ <EntryMenu/>} />
        </Routes>        
    </Router>
  )
}

export default App;
