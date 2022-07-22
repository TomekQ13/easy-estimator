import React, { useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { authContext } from '../contexts/Auth'
import { saveToLocalStorage } from '../apiAccess/localStorage'
import { makeApiCallFunction } from '../apiAccess/makeCall'

export default function RegisterForm({ handleCloseModal }) {
    const [inputs, setInputs] = useState({})
    const { setUsername, setAccessToken, setRefreshToken, accessToken, refreshToken} = useContext(authContext)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    async function handleSubmit(event) {
        event.preventDefault()        
        const username = event.target.username.value
        
        const resp = await registerUser(username)
        if (resp === null) return
        setUsernameCookie(username)
        setUsername(username)
        setAccessToken(resp.accessToken)
        setRefreshToken(resp.refreshToken)

        handleCloseModal({ show: false })
    }

    async function registerUser(username) {
        if (username === undefined) throw new Error('Username is missing in registerUsername')

        const registerUserFunction = makeApiCallFunction({
            url:`/user/register`,
            body: {
                username
            },
            method: 'POST',
            accessToken,
            refreshToken,
            setAccessToken
        })

        let resp
        try {
            resp = await registerUserFunction()
        } catch (e) {            
            console.error(e)
            console.error('There has been an error when registering the user')
            return null
        }
        if (resp.status === 201) {
            return await resp.json()
        }
        console.error('There has been an error when registering the user')
        return null
    }

    function setUsernameCookie(username) {
        const cookies = new Cookies()
        cookies.set('username', username, { path: '/', maxAge: 60*60*24*30 })
    }

    return (
        <form onSubmit={ handleSubmit }>
            <input type="text" name="username" value={ inputs.username || '' } onChange={ handleChange }></input>
            <button>Continue</button>
        </form>
    )
}
