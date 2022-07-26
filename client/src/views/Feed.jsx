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
    const [addPost, setAddPost] = useState(false)

    const closeUpdate = () => setUpdateInfo(false)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    console.log(title,content)

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/checkUser`, {withCredentials : true})
            .then(res => setUser({_id : res.data._id, firstName : res.data.firstName, lastName : res.data.lastName, animal : res.data.animal, color : res.data.color, email : res.data.email}))
            .catch(err => navigate('/', {state : {message : "You must log in to use this information"}}))
    }, [])

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

    const createPost = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, title, content, likes : 0}, {withCredentials : true})
            .then(res => setAddPost(false))
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
                <br />
                <br />
                <button className='btn btn-secondary' onClick={()=> setUpdateInfo(true)}>Update Profile</button>
                <br />
                <br />
                <button className='btn btn-success' onClick={()=>setDeleteAttempt(true)}>Delete Account</button>
                <br />
                <button className="btn btn-success" onClick={()=>setAddPost(true)}>New Post</button>
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
            {addPost === true?
            <div className='newPost'>
                <h4>New Post</h4>
                <form onSubmit={createPost}>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)} value={title}/>
                    <br />
                    <br />
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea type="text" name='content' onChange={(e) => setContent(e.target.value)} value={content} rows="4" cols="40"/>
                    <br />
                    <br />
                    <button onClick={()=> setAddPost(false)} className="btn btn-secondary">Nevermind</button>
                    <button type='submit' className='btn btn-success'>Post</button>
                </form>
            </div>
            :""}
        </div>
    )
}

export default Feed