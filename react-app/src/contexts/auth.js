import React, { useState, useEffect } from "react";
import {
    saveToLocalStorage,
    getFromLocalStorage,
} from "../apiAccess/localStorage";
import RegisterModal from "../components/RegisterModal";
import { useUser } from "../hooks/user";

export const authContext = React.createContext();

export function getUsernameFromLS() {
    return getFromLocalStorage({ key: "easy-username" });
}

export default function Auth({ children }) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [registerModal, setRegisterModal] = useState({ show: false });
    const [userId, setUserId] = useState();
    const [userRegistered, setUserRegistered] = useState(false);
    const storedTheme = localStorage.getItem("theme");
    const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");
    const { username, setUsername } = useUser({ userId });

    useEffect(() => {
        const accessToken = getFromLocalStorage({ key: "accessToken" });
        if (window._env_.DEBUG === "true")
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
        if (window._env_.DEBUG === "true")
            console.log("Refresh token read from local storage");
        const refreshToken = getFromLocalStorage({ key: "refreshToken" });
        if (
            refreshToken !== undefined &&
            refreshToken !== null &&
            refreshToken !== ""
        )
            setRefreshToken(refreshToken);
    }, [setRefreshToken]);

    // useEffect(() => {
    //     const userId = getFromLocalStorage({ key: "easy-userId" });
    //     setUserId(userId);
    //     if (window._env_.DEBUG === "true")
    //         console.log("Retrieved userId from local storage " + userId);
    //     if (username === undefined) return;
    //     if (username === null) {
    //         setRegisterModal({ show: true });
    //         return;
    //     }
    //     setRegisterModal({ show: false });
    // }, [setRegisterModal, username]);

    useEffect(() => {
        if (window._env_.DEBUG === "true")
            console.log(
                "Attepmting to save access token to local storage value: " +
                    accessToken
            );
        if (accessToken !== undefined && accessToken !== "") {
            saveToLocalStorage({ key: "accessToken", value: accessToken });
            if (window._env_.DEBUG === "true")
                console.log("AccessToken saved to local storage");
        }
    }, [accessToken]);

    useEffect(() => {
        if (refreshToken !== undefined && refreshToken !== "") {
            saveToLocalStorage({ key: "refreshToken", value: refreshToken });
            if (window._env_.DEBUG === "true")
                console.log("RefreshToken saved to local storage");
        }
    }, [refreshToken]);

    useEffect(() => {
        if (userId !== undefined && userId !== "" && userId !== null) {
            saveToLocalStorage({ key: "easy-userId", value: userId });
            if (window._env_.DEBUG === "true")
                console.log("UserId saved to local storage");
        }
    }, [userId]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark"); // Save the dark mode preference
        } else {
            document.body.setAttribute("data-bs-theme", "light");
            localStorage.setItem("theme", "light"); // Save the light mode preference
        }
    }, [isDarkMode]);

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
        userId,
        setUserId,
        userRegistered,
        setUserRegistered,
        isDarkMode,
        setIsDarkMode,
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
