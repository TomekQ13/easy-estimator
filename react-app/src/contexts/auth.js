import React, { useState, useEffect } from "react";
import {
    saveToLocalStorage,
    getFromLocalStorage,
} from "../apiAccess/localStorage";
import RegisterModal from "../components/RegisterModal";
import config from "../config.json";

export const authContext = React.createContext();

export function getUsernameFromLS() {
    return getFromLocalStorage({ key: "easy-username" });
}

export default function Auth({ children }) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [username, setUsername] = useState();
    const [registerModal, setRegisterModal] = useState({ show: false });

    useEffect(() => {
        const accessToken = getFromLocalStorage({ key: "accessToken" });
        if (config.debug)
            console.log(
                `Access token read from local storage. Value ${accessToken}`
            );
        if (
            accessToken !== undefined &&
            accessToken !== null &&
            accessToken !== ""
        )
            setAccessToken(accessToken);
    }, [setAccessToken]);

    useEffect(() => {
        if (config.debug) console.log("Refresh token read from local storage");
        const refreshToken = getFromLocalStorage({ key: "refreshToken" });
        if (
            refreshToken !== undefined &&
            refreshToken !== null &&
            refreshToken !== ""
        )
            setRefreshToken(refreshToken);
    }, [setRefreshToken]);

    useEffect(() => {
        if (config.debug) console.log("Username read from local storage");
        const username = getFromLocalStorage({ key: "easy-username" });
        if (username !== undefined && username !== null && username !== "") {
            setUsername(username);
            setRegisterModal({ show: false });
        }
    }, [setUsername, setRegisterModal]);

    useEffect(() => {
        if (config.debug)
            console.log(
                "Attepmting to save access token to local storage value: " +
                    accessToken
            );
        if (accessToken !== undefined && accessToken !== "") {
            saveToLocalStorage({ key: "accessToken", value: accessToken });
            if (config.debug) console.log("AccessToken saved to local storage");
        }
    }, [accessToken]);

    useEffect(() => {
        if (refreshToken !== undefined && refreshToken !== "") {
            saveToLocalStorage({ key: "refreshToken", value: refreshToken });
            if (config.debug)
                console.log("RefreshToken saved to local storage");
        }
    }, [refreshToken]);

    useEffect(() => {
        if (username !== undefined && username !== "") {
            saveToLocalStorage({ key: "easy-username", value: username });
            if (config.debug) console.log("Username saved to local storage");
        }
    }, [username]);

    const authContextValue = {
        username,
        setUsername,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        getUsernameFromLS,
        registerModal,
        setRegisterModal,
    };

    return (
        <authContext.Provider value={authContextValue}>
            {children}
            <RegisterModal
                setRegisterModal={setRegisterModal}
                registerModal={registerModal}
            />
        </authContext.Provider>
    );
}
