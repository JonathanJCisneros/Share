import React from 'react'
import { useLocation } from 'react-router-dom'
import Credentials from '../components/Credentials'

const Home = () => {
    const location = useLocation();

    return (
        <div>
            <h1>Home</h1>
            {location.state !== null?<h3 style={{color : "red", fondWeight : "bold"}}>{location.state.message}</h3>: ""}
            <Credentials initialFirstName="" initialLastName="" initialEmail="" initialType={false}/>
        </div>
    )
}

export default Home