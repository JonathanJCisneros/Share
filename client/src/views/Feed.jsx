import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/Feed.css';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import Credentials from '../components/Credentials';

const Feed = () => {
    const [user, setUser] = useState({})
    const [updateInfo, setUpdateInfo] = useState(false)
    const [deleteAttempt, setDeleteAttempt] = useState(false)

    const closeUpdate = () => setUpdateInfo(false)


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/checkUser`, {withCredentials : true})
            .then(res => setUser({_id : res.data._id, firstName : res.data.firstName, lastName : res.data.lastName, animal : res.data.animal, color : res.data.color, email : res.data.email}))
            .catch(err => navigate('/', {state : {message : "You must log in to use this information"}}))
    }, [user])

    const logout = () => {
        axios.get(`http://localhost:8000/api/user/logout`, {withCredentials : true})
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    const deleteAccount = () => {
        axios.delete(`http://localhost:8000/api/user/${user._id}`)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    

    return (
        <div>
            <div className="nav">
                <h1>Share.</h1>
            </div>
            <div className='feedContainer'>
                <div className="left">
                    <div className='profileImage' style={{backgroundColor : user.color}}>
                        <img src={`https://anonymous-animals.azurewebsites.net/animal/${user.animal}`} alt="Animal" />
                    </div>
                    <h4 className='userName'>{user.firstName} {user.lastName}</h4>
                </div>
                <div className="feed">
                    <PostList user={user}/>
                </div>
                <div className="right">
                    <button onClick={logout} className='btn btn-danger'>Logout</button>
                    <br />
                    <br />
                    <button className='btn btn-secondary' onClick={()=> setUpdateInfo(true)}>Update Profile</button>
                    <br />
                    <br />
                    <button className='btn btn-success' onClick={()=>setDeleteAttempt(true)}>Delete Account</button>
                </div>
                {updateInfo? 
                <div className='updateProfile'>
                    <Credentials user={user._id} initialFirstName={user.firstName} initialLastName={user.lastName} initialAnimal={user.animal} initialColor={user.color} initialEmail={user.email} initialType={true} initialProfile={true} callBack={closeUpdate}/>
                </div>: ""
                }
                {deleteAttempt?
                <div className='deleteAttempt'>
                    <h3>Are you sure?</h3>
                    <div className='choices'>
                        <button className='btn btn-danger' onClick={deleteAccount}>Delete Account</button>
                        <button className='btn btn-success' onClick={()=> setDeleteAttempt(false)}>Nevermind</button>
                    </div>
                </div>:""
                }
            </div>
        </div>
    )
}

export default Feed