import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../static/Conversation.css';

const Conversation = (props) => {
    const {conversation, user, callBack} = props;
    const [messages, setMessages] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [friend, setFriend] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${conversation.members[1]}`)
            .then(res => setFriend(res.data))
            .catch(err => console.log(err))
    }, [conversation.members])

    useEffect (() => {
        axios.get(`http://localhost:8000/api/messages/${conversation._id}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [refresh, conversation._id])

    return (
        <div>
            <div className='chatHeader'>
            <div className='chatProfileImage' style={{backgroundColor : conversation.color}}>
                    <img src={`https://anonymous-animals.azurewebsites.net/animal/${conversation.animal}`} alt="Animal" />
                </div>
                <h5 style={{color : "white"}}>Anonymous {conversation.animal.charAt(0).toUpperCase() + conversation.animal.slice(1)}</h5>
                <button type="button" onClick={()=> callBack()}class="btn-close" aria-label="Close"></button>
            </div>
            <div className="messageContent">
                {messages&&
                    messages.map((message, i) => {
                        return (<div key={i}>
                            <h1>test</h1>
                        </div>)
                    })
                }
            </div>
            <div className="chatFooter">
                <form>
                    <textarea name="message" id="message" cols="35" className='form-control'rows="2"></textarea>
                </form>
                <span style={{width : "3px"}}></span>
                <button type='submit' className='btn btn-outline-primary'>Send</button>
            </div>
        </div>
    )
}

export default Conversation