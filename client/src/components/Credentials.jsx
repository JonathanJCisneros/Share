import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Credentials = (props) => {
    const {initialFirstName, initialLastName, initialEmail, initialType} = props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newOrUpdate, setNewOrUpdate] = useState(initialType)


    const [errors, setErrors] = useState({})

    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault()
        {newOrUpdate === false?
            axios.post(`http://localhost:8000/api/user/login`, {email, password}, {withCredentials : true})
                .then(res => navigate('/feed'))
                .catch(err => setErrors(err.response.data.errors)):
            axios.post(`http://localhost:8000/api/user/register`, {firstName, lastName, email, password, confirmPassword}, {withCredentials : true})
                .then(res => navigate('/feed'))
                .catch(err => setErrors(err.response.data.errors))
        }
    }

    return (
        <div>
            <div>
                
                <form onSubmit={submitHandler}>
                    {newOrUpdate === true?
                    <>
                        <h1>Register</h1>
                        <div>
                            <label htmlFor="firstName">First Name: </label>
                            <input type="text" name='firstName' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                            {errors.hasOwnProperty("firstName")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name: </label>
                            <input type="text" name='lastName' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                            {errors.hasOwnProperty("lastName")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.lastName.message}</p>}
                        </div>
                    </>
                    :<h1>Login</h1>
                    }
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        {errors.hasOwnProperty("email")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {errors.hasOwnProperty("password")&&<p style={{color : "red", fontWeight : "bold"}}>{errors.password.message}</p>}
                    </div>
                    {newOrUpdate === true?
                    <>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input type="password" name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                            {errors.hasOwnProperty("confirmPassword")&&<p style={{color : "red", fontWeight : "bold"}}>{errors.confirmPassword.message}</p>}
                        </div>
                        <button onClick={()=>setNewOrUpdate(false) + setErrors({}) + setFirstName("") + setLastName("") + setEmail("") + setPassword("")}>I have an account, Go Back!</button>
                    </>
                        :<button onClick={()=>setNewOrUpdate(true) + setErrors({}) + setEmail("") + setPassword("")}>Don't have an account yet? Sign Up!</button>
                    }
                    <br />
                    <button type='submit'>{newOrUpdate? "Create Account": "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default Credentials