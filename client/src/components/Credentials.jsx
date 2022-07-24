import React, { useState } from 'react'
import '../static/Credentials.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const animalList = ["Alligator", "Anteater", "Armadillo", "Auroch", "Axolotl", "Badger", "Bat", "Beaver", "Buffalo", "Camel", "Capybara", "Chameleon", "Cheetah", "Chinchilla", "Chipmunk", "Chupacabra", "Cormorant", "Coyote", "Crow", "Dingo", "Dinosaur", "Dolphin", "Duck", "Elephant", "Ferret", "Fox", "Frog", "Giraffe", "Gopher", "Grizzly", "Hedgehog", "Hippo", "Hyena", "Ibex", "Ifrit", "Iguana", "Jackal", "Kangaroo", "Koala", "Kraken", "Lemur", "Leopard", "Liger", "Llama", "Manatee", "Mink", "Monkey", "Moose", "Narwhal", "Orangutan", "Otter", "Panda", "Penguin", "Platypus", "Pumpkin", "Python", "Quagga", "Rabbit", "Raccoon", "Rhino", "Sheep", "Shrew", "Skunk", "Squirrel", "Tiger", "Turtle",  "Walrus", "Wolf", "Womba", "Wolverine"]

const Credentials = (props) => {
    const {initialFirstName, initialLastName, initialAnimal, initialColor, initialEmail, initialType} = props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [animal, setAnimal] = useState(initialAnimal);
    const [color, setColor] = useState(initialColor)
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
            axios.post(`http://localhost:8000/api/user/register`, {firstName, lastName, animal, color, email, password, confirmPassword}, {withCredentials : true})
                .then(res => navigate('/feed'))
                .catch(err => setErrors(err.response.data.errors))
        }
    }

    return (
            <div className='container'>
                <form onSubmit={submitHandler}>
                    {newOrUpdate === true?
                    <>
                        <h1>Register</h1>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor="firstName" className='form-label'>First Name: </label>
                                <input type="text" className='form-control' name='firstName' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                                {errors.hasOwnProperty("firstName")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.firstName.message}</p>}
                            </div>
                            <div className='col'>
                                <label htmlFor="lastName" className='form-label'>Last Name: </label>
                                <input type="text" className='form-control' name='lastName' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                                {errors.hasOwnProperty("lastName")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className='col-12' id='animal'>
                            <div>
                                <label htmlFor="animal">Select Avatar</label>
                                <select class="form-select" name='animal' onChange={e => setAnimal(e.target.value)} value={animal} aria-label="Default select example">
                                    <option selected>Choose your avatar...</option>
                                    {animalList.map((animal, i) => <option key={i} value={animal.toLowerCase()}>{animal}</option>)}
                                </select>
                                {errors.hasOwnProperty("animal")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.animal.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="color">Select Background Color</label>
                                <br />
                                <input type="color" name='color' onChange={(e) => setColor(e.target.value)} value={color}/>
                                {errors.hasOwnProperty("color")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.color.message}</p>}
                            </div>
                            <div className='registerProfileImage' style={{backgroundColor : color}}>
                                <img src={`https://anonymous-animals.azurewebsites.net/animal/${animal}`} alt="Animal" />
                            </div>
                        </div>
                    </>
                    :<h1>Login</h1>
                    }
                    <div className='col-12'>
                        <label htmlFor="email" className='form-label'>Email: </label>
                        <input type="text" id='email' name='email' className='form-control' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        {errors.hasOwnProperty("email")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.email.message}</p>}
                    </div>
                    <div className='col-12'>
                        <label htmlFor="password" className='form-label'>Password: </label>
                        <input type="password" id='password' className='form-control' name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {errors.hasOwnProperty("password")&&<p style={{color : "red", fontWeight : "bold"}}>{errors.password.message}</p>}
                    </div>
                    {newOrUpdate === true?
                    <>
                        <div>
                            <label htmlFor="confirmPassword" className='form-label'>Confirm Password: </label>
                            <input type="password" className='form-control' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                            {errors.hasOwnProperty("confirmPassword")&&<p style={{color : "red", fontWeight : "bold"}}>{errors.confirmPassword.message}</p>}
                        </div>
                        <button type='button' className='btn btn-link' onClick={()=>setNewOrUpdate(false) + setErrors({}) + setFirstName("") + setLastName("") + setAnimal('') + setEmail("") + setPassword("")}>I have an account, Go Back!</button>
                    </>
                        :<button type='button' className='btn btn-link' onClick={()=>setNewOrUpdate(true) + setErrors({}) + setEmail("") + setPassword("")}>Don't have an account yet? Sign Up!</button>
                    }
                    <br />
                    <button type='submit' className='btn btn-success'>{newOrUpdate? "Create Account": "Log In"}</button>
                </form>
            </div>
    )
}

export default Credentials