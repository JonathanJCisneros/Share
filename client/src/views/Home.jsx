import React from 'react'
import '../static/Home.css';
import { useLocation } from 'react-router-dom'
import Credentials from '../components/Credentials'

const Home = () => {
    const location = useLocation();

    return (
        <div className='page'>
            <div className='header'>
                <h1 className='title'>Share.</h1>
            </div>
            {location.state !== null?<h2 style={{color : "red", fondWeight : "bold"}}>{location.state.message}</h2>: ""}
            <div className='login'>
                <Credentials initialFirstName="" initialLastName="" initialEmail="" initialAnimal="" initialColor="" initialType={false}/>
            </div>
        </div>
    )
}

export default Home