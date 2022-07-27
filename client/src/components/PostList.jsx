import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../static/PostList.css';
import Post from './Post';

const PostList = (props) => {
    const {user} = props;
    const [addPost, setAddPost] = useState(false)
    const [postList, setPostList] = useState([])
    const [motivationList, setMotivationList] = useState([])
    console.log(motivationList)

    const [quoteOfTheDay, setQuoteOfTheDay] = useState({})

    console.log(quoteOfTheDay)

    const createMotivation = () => {
        axios.get(`https://type.fit/api/quotes`)
            .then(res => setMotivationList(res.data))
            .catch(err => console.log(err))
        let random = Math.floor(Math.random() * motivationList.length)
        setQuoteOfTheDay(motivationList[random])
    }

    const DailyQuote = () => {
        let random = Math.floor(Math.random() * motivationList.length)
        
    }
    

    // New Post
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    

    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts`)
            .then(res => setPostList(res.data))
            .catch(err => console.log(err))
    }, [])

    const createPost = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, userId : user._id, title, content, likes : 0})
            .then(res => setAddPost(false) + setTitle("") + setContent(""))
            .catch(err => setErrors(err.response.data.errors))
    }


    return (
        <div>
            <div className='dailyPost'>
                {/* <h1>{quoteOfTheDay.author}</h1>
                <h3>{quoteOfTheDay.text}</h3> */}
            </div>
            <button onClick={createMotivation}>Start API</button><button onClick={DailyQuote}>Get Quote of the Day</button>
            <button className="btn btn-outline-primary" onClick={()=> setAddPost(true)} id='newPost'>Tell Us How You Are Feeling Today!</button>                
            {addPost === true?
            <div className='newPost'>
                <h4>New Post</h4>
                <form onSubmit={createPost}>
                    <label htmlFor="title" className='form-label'>Title</label>
                    <br />
                    <input type="text" name='title' className="form-control" onChange={(e)=> setTitle(e.target.value)} value={title}/>
                    {errors.hasOwnProperty("title")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.title.message}</p>}
                    <label htmlFor="content" className='form-label'>Content</label>
                    <br />
                    <textarea type="text" name='content' className="form-control" onChange={(e) => setContent(e.target.value)} value={content} rows="4" cols="40"/>
                    {errors.hasOwnProperty("content")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.content.message}</p>}
                    <br />
                    <div className='footer'>
                        <button onClick={()=> setAddPost(false) + setTitle("") + setContent("")} className="btn btn-outline-secondary">Nevermind</button>
                        <button type='submit' className='btn btn-outline-success'>Post</button>
                    </div>
                    
                </form>
            </div>
            :""}
            {postList.map((post, i) => {
                return (<div key={i}>
                    <Post post={post} user={user}/>
                </div>)
            })}
        </div>
    )
}

export default PostList