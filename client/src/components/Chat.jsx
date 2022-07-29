import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../static/Chat.css';
import io from 'socket.io-client'

const Chat = (props) => {
    const {user, callBack} = props;
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/conversations/${user._id}`)
            .then(res => setConversations(res.data))
            .catch(err => console.log(err))
    }, [user._id])
    
    
    return (
        <div>
            {conversations.map((conversation, i) => {
                return(
                    <div key={i} className='chatOption'>
                        <div className='chatImage' style={{backgroundColor : conversation.color}}>
                            <img src={`https://anonymous-animals.azurewebsites.net/animal/${conversation.animal}`} alt="Animal" />
                        </div>
                        <button onClick={()=> callBack(conversation)} className='btn btn-link'>Anonymous {conversation.animal.charAt(0).toUpperCase() + conversation.animal.slice(1)}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Chat