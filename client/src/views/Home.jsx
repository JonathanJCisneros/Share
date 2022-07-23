import React from 'react'
import Credentials from '../components/Credentials'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Credentials initialFirstName="" initialLastName="" initialEmail="" initialType={false}/>
        </div>
    )
}

export default Home