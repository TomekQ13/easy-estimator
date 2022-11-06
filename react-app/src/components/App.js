import React from "react";
import "../css/app.css";
import EntryMenu from "./EntryMenu";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Auth from "../contexts/Auth";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./MyNavbar";

function App() {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />
            <Router>
                <Auth>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<EntryMenu />} />
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
