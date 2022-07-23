import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const [user, setUser] = useState({})
    console.log(user)


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/checkUser`, {withCredentials : true})
            .then(res => setUser({_id : res.data._id, firstName : res.data.firstName, lastName : res.data.lastName, email : res.data.email}))
            .catch(err => navigate('/', {state : {message : "You must be logged in to see this information"}}))
    }, [])

    const logout = () => {
        axios.get(`http://localhost:8000/api/user/logout`, {withCredentials : true})
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Success, Welcome {user.firstName}</h1>
            <h2>You're ID is: {user._id}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Feed