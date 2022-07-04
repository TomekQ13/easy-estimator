import React, { useEffect, useState } from "react";
import "../css/app.css"
import EntryMenu from "./EntryMenu";
import {Session} from "./Session";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import { saveToLocalStorage } from "../apiAccess/localStorage";


export const authContext = React.createContext()


function App() {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [username, setUsername] = useState()

    const authContextValue = {
        username,
        setUsername,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken 
    }

    useEffect(() => {
        saveToLocalStorage({ key: 'accessToken', value: accessToken })
    }, [accessToken])

    useEffect(() => {
        saveToLocalStorage({ key: 'refreshToken', value: refreshToken })
    }, [refreshToken])


    return (
        <Router>
            <authContext.Provider value={authContextValue}>
                <Routes>
                        <Route path='/' exact element={ <EntryMenu/>} />
                        <Route path='/session/:session_id' element={ <Session />} />
                </Routes>
            </authContext.Provider>     
        </Router>
    )
}

export default App