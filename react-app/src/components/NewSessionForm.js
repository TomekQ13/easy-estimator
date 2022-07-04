import React, { useState, useContext }  from 'react'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { authContext } from './App'
import { createSession } from '../models/session'

export default function NewSessionForm() {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const { accessToken } = useContext(authContext)

    async function handleSubmit(event) {
        event.preventDefault()        
        const sessionPassword = event.target.sessionPassword.value
        const sessionId = uuid()
        try {
            const resp = await createSession(sessionId, sessionPassword, {test_param: 'test_param_value'})
            if (resp.status === 201) {
                return navigate(`/session/${sessionId}`)
            }
            // if (resp.status === 403) {
                
            // }
        } catch (e) {
            console.error(e)
            return alert('There has been an issue with creating the session. Please try again.')
        }        
        
    }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label>Session password</label>
            <input type="password" name="sessionPassword" value={inputs.sessionPassword || ''} onChange={ handleChange }></input>
            <button>Create session</button>
        </form>
    )
}
