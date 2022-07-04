import React, { useContext, useState } from 'react'
import Cookies from 'universal-cookie'
import { authContext } from '../contexts/Auth'
import { saveToLocalStorage } from '../apiAccess/localStorage'

export default function RegisterForm({ handleCloseModal }) {
    const [inputs, setInputs] = useState({})
    const { setUsername, setAccessToken, setRefreshToken} = useContext(authContext)

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
        // setAccessToken(resp.accessToken)
        // setRefreshToken(resp.refreshToken)
        saveToLocalStorage({ key: 'accessToken', value: resp.accessToken })
        saveToLocalStorage({ key: 'refreshToken', value: resp.refreshToken })

        handleCloseModal({ show: false })
    }

    async function registerUser(username) {
        if (username === undefined) return console.error('Username is missing in registerUsername')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username
            })
        }
        let resp
        try {
            resp = await fetch(`http://localhost:4000/user/register`, requestOptions)
        } catch (e) {            
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
