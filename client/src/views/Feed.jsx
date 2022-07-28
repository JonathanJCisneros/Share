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

    const [refresh, setRefresh] = useState(true)

    const closeUpdate = () => setUpdateInfo(false) + setRefresh(!refresh)


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/checkUser`, {withCredentials : true})
            .then(res => setUser({_id : res.data._id, firstName : res.data.firstName, lastName : res.data.lastName, animal : res.data.animal, color : res.data.color, email : res.data.email}))
            .catch(err => navigate('/', {state : {message : "You must log in to use this information"}}))
    }, [refresh])

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


    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        } 
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <body>
            <div>
                <div className="nav">
                    <h1>Share.</h1>
                </div>
                <div className='feedContainer'>
                    <div className="left">
                        <div id="ltop">
                            <div className='profileImage' style={{backgroundColor : user.color}}>
                                <img src={`https://anonymous-animals.azurewebsites.net/animal/${user.animal}`} alt="Animal" />
                            </div>
                            <h4 className='userName'>{user.firstName} {user.lastName}</h4>
                            <br />
                            <button className='btn btn-outline-secondary' onClick={()=> setUpdateInfo(true)}>Update Profile</button>
                        </div>
                        <div id="lbottom">
                            <button className='btn btn-outline-success'>Chat</button>
                        </div>
                    </div>
                    <div className="feed">
                        <PostList user={user}/>
                    </div>
                    <div className="right">
                        <div id="rtop">
                            <button onClick={logout} className='btn btn-outline-danger'>Logout</button>
                            <br />
                            <br />
                            <button className='btn btn-outline-success' onClick={()=>setDeleteAttempt(true)}>Delete Account</button>
                        </div>
                        <div id="rbottom">
                            <h4>Resource Links</h4>
                            <a href="tel:988">Suicide and Crisis Lifeline</a>
                            <br />
                            <a href="https://medium.com/mental-health-league/7-inspiring-stories-on-mental-health-you-should-read-bb5bf1552e95" target="_blank">7 Inspiring Stories</a>
                            <br />
                            <a href="https://www.verywellmind.com/what-is-mental-health-2330755" target="_blank">What is Mental Health?</a>
                            <br />
                            <a href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/" target="_blank">The Do's and Don'ts</a>
                            <br />
                            <a href="https://www.mentalhealth.gov/">Mental Health Gov</a>
                        </div>
                        
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
                            <button className='btn btn-outline-danger' onClick={deleteAccount}>Delete Account</button>
                            <button className='btn btn-outline-success' onClick={()=> setDeleteAttempt(false)}>Nevermind</button>
                        </div>
                    </div>:""
                    }
                </div>
                <button onClick={scrollToTop} id="myBtn" style={{display : visible? "inline": "none"}}>Top</button>
            </div>
        </body>
    )
}

export default Feed