import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/Feed.css';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';

const Feed = () => {
    const [user, setUser] = useState({})
    console.log(user)


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/checkUser`, {withCredentials : true})
            .then(res => setUser({_id : res.data._id, firstName : res.data.firstName, lastName : res.data.lastName, animal : res.data.animal, color : res.data.color}))
            .catch(err => navigate('/', {state : {message : "You must be logged in to see this information"}}))
    }, [])

    const logout = () => {
        axios.get(`http://localhost:8000/api/user/logout`, {withCredentials : true})
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }
    return (
        <div className='feedContainer'>
            <div className="left">
                <div className='profileImage' style={{backgroundColor : user.color}}>
                    <img src={`https://anonymous-animals.azurewebsites.net/animal/${user.animal}`} alt="Animal" />
                </div>
                <h3>{user.firstName} {user.lastName}</h3>
                <p>You're ID is: {user._id}</p>
                <br />
                <p>Link to Dashboard</p>
            </div>
            <div className="feed">
                <PostList/>
            </div>
            <div className="right">
                <button onClick={logout} className='btn btn-danger'>Logout</button>
            </div>
        </div>
    )
}

export default Feed