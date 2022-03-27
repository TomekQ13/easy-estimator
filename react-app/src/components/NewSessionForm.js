import React, { useState }  from 'react'
import uuid from 'react-uuid'

export default function NewSessionForm() {
    const [inputs, setInputs] = useState({})

    function handleSubmit(event) {
        event.preventDefault()        
        const sessionPassword = event.target.sessionPassword.value
        createSession(uuid(), sessionPassword, {test_param: 'test_param_value'})

    }

    async function createSession(sessionId, sessionPassword, params) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hostId: 'test',
                sessionPassword: sessionPassword,
                params: params
            })
        }        
        const resp = await fetch(`http://localhost:4000/session/${sessionId}`, requestOptions)
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
