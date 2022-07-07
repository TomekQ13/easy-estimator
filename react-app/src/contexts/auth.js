import React, {  useState, useEffect } from "react"
import { saveToLocalStorage } from "../apiAccess/localStorage"

export const authContext = React.createContext()

export default function Auth({ children }) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        saveToLocalStorage({ key: 'accessToken', value: accessToken || '' })
        console.log('AccessToken saved to local storage')
    }, [accessToken])

    useEffect(() => {
        saveToLocalStorage({ key: 'refreshToken', value: refreshToken || '' })
        console.log('RefreshToken saved to local storage')
    }, [refreshToken])


    const authContextValue = {
        username,
        setUsername,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken 
    }

    return (
        <authContext.Provider value={authContextValue}>
            { children }
        </authContext.Provider>
    )
}

