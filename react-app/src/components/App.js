import React from "react";
import "../css/app.css";
import EntryMenu from "./EntryMenu";
import Error from "./Error";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Auth from "../contexts/Auth";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./MyNavbar";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
    return (
        <>
            <Router>
                <Auth>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<EntryMenu />} />
                        <Route
                            path="/privacy"
                            exact
                            element={<PrivacyPolicy />}
                        />
                        <Route path="/error" exact element={<Error />} />
                        <Route
                            path="/session/:session_id"
                            element={<SessionWrapper />}
                        />
                    </Routes>
                </Auth>
            </Router>
        </>
    );
}

export default App;
