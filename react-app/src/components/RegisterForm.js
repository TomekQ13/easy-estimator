import React, { useState } from 'react'

export default function RegisterForm() {
    const [inputs, setInputs] = useState({})

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    function handleSubmit() {

    }

    function registerUser(username) {
        
    }

    return (
        <form onSubmit={ handleSubmit }>
            <input type="text" name="username" value={ inputs.username } onChange={ handleChange }></input>
        </form>
    )
}
