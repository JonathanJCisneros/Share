import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import '../static/Conversation.css';
import io from 'socket.io-client';

const Conversation = (props) => {
    const {conversation, user, callBack} = props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [friend, setFriend] = useState({});
    const scrollRef = useRef();

    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        socket.on("Welcome", data => console.log(data));
    }, [socket])

    useEffect(() => {
        const friendId = conversation.members.find((id) => id !== user._id)

        axios.get(`http://localhost:8000/api/user/${friendId}`)
            .then(res => setFriend(res.data))
            .catch(err => console.log(err))
    }, [conversation.members])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/message/${conversation._id}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))
    }, [refresh, conversation._id])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior : "smooth"})
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();
        const message = {
            sender : user._id,
            text : newMessage,
            conversationId : conversation._id
        }
        axios.post(`http://localhost:8000/api/message/new`, message)
            .then(res => setNewMessage('') + setRefresh(!refresh))
            .catch(err => console.log(err))
    }


    return (
        <div>
            <div className='chatHeader'>
            <div className='chatProfileImage' style={{backgroundColor : conversation.color}}>
                    <img src={`https://anonymous-animals.azurewebsites.net/animal/${conversation.animal}`} alt="Animal" />
                </div>
                <h5 style={{color : "white"}}>Anonymous {conversation.animal.charAt(0).toUpperCase() + conversation.animal.slice(1)}</h5>
                <button type="button" onClick={()=> callBack()} className="btn-close" aria-label="Close"></button>
            </div>
            <div className="messageContent" ref={scrollRef}>
                {messages&&
                    messages.map((message, i) => {
                        return (<div key={i} className='messageBubble' style={{backgroundColor : message.sender === user._id? "#1982FC": "lightgray", marginRight : message.sender === user._id? "0px": "auto", marginLeft : message.sender === user._id? "auto" :"0px"}}>
                        <div className='messageHeader'>
                            <div className='messageImage' style={{backgroundColor : message.sender === user._id? user.color : friend.color}}>
                                <img src={`https://anonymous-animals.azurewebsites.net/animal/${message.sender === user._id? user.animal : friend.animal}`} alt="Animal"/>
                            </div>
                            <p> {message.sender === user._id? "You" :"Anonymous " + friend.animal.charAt(0).toUpperCase() + friend.animal.slice(1)}</p>
                        </div>
                        <p className='messages'>{message.text}</p>
                    </div>)
                    })
                }
            </div>
            <div>
                <form onSubmit={sendMessage} className="chatFooter">
                    <textarea name="message" id="message" cols="35" className='form-control'rows="2" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <button type='submit' className='btn btn-outline-primary'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Conversation