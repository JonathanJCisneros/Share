import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../static/PostList.css';
import Post from './Post';
import Quote from './Quote';

const PostList = (props) => {
    const {user, callBack} = props;
    const [addPost, setAddPost] = useState(false)
    const [postList, setPostList] = useState([])
    const [refresh, setRefresh] = useState(false)

    // New Post
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts`)
            .then(res => setPostList(res.data))
            .catch(err => console.log(err))
    }, [refresh])

    const createPost = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, userId : user._id, title, content, likes : 0})
            .then(res => setAddPost(false) + setTitle("") + setContent("") + setRefresh(!refresh))
            .catch(err => setErrors(err.response.data.errors))
    }


    return (
        <div>
            <Quote/>
            <button className="btn btn-outline-primary" onClick={()=> setAddPost(true)} id='newPost'>Tell Us How You Are Feeling Today!</button>                
            {addPost === true?
            <div className='newPost'>
                <h4>New Post</h4>
                <form onSubmit={createPost}>
                    <div className='formRow'>
                        <label htmlFor="title" className='form-label'>Title</label>
                        <input type="text" name='title' className="form-control" onChange={(e)=> setTitle(e.target.value)} value={title}/>
                        {errors.hasOwnProperty("title")&& <p className='error'>{errors.title.message}</p>}
                    </div>
                    <div className='formRow'>
                        <label htmlFor="content" className='form-label'>Content</label>
                        <textarea type="text" name='content' className="form-control" onChange={(e) => setContent(e.target.value)} value={content} rows="4" cols="40"/>
                        {errors.hasOwnProperty("content")&& <p className='error'>{errors.content.message}</p>}
                    </div>
                    <div className='footer'>
                        <button onClick={()=> setAddPost(false) + setTitle("") + setContent("")} className="btn btn-outline-secondary">Nevermind</button>
                        <button type='submit' className='btn btn-outline-success'>Post</button>
                    </div>
                </form>
            </div>
            :""}
            
            {postList.map((post, i) => {
                return (<div key={i}>
                    <Post post={post} user={user} callBack={callBack}/>
                    {i % 4 === 0&&
                    <Quote/>}
                </div>)
            })}
        </div>
    )
}

export default PostList