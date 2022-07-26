import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../static/PostList.css';

const PostList = (props) => {
    const {user} = props;
    const [addPost, setAddPost] = useState(false)
    const [postList, setPostList] = useState([])
    const [comment, setComment] = useState(false)

    // New Post
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    // Add Comment
    const [commentPost, setCommentPost] = useState("")
    const [postId, setPostId] = useState("")

    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts`)
            .then(res => setPostList(res.data))
            .catch(err => console.log(err))
    }, [postList])

    const createPost = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, userId : user._id, title, content, likes : 0}, {withCredentials : true})
            .then(res => setAddPost(false) + setTitle("") + setContent(""))
            .catch(err => console.log(err.response))
    }

    const handleCommentSection = () => {
        {comment?
            setComment(false):
            setComment(true)
        }
    }

    const handleComment = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/comment`, {animal : user.animal, color: user.color, postId, userId : user._id, comment : commentPost, likes : 0})
            .then(res => setCommentPost("") + setPostId(""))
            .catch(err => console.log(err))
    }


    return (
        <div>
            <div className='dailyPost'>
                <h1>Post of the Day</h1>
            </div>
            <h1>Post List</h1>
            <br />
            <button className="btn btn-success" onClick={()=> setAddPost(true)}>New Post</button>
            {postList.map((post, i) =>{
            return (<div className="post" key={i}>
                <div className='postHeader'>
                    <div className='postProfileImage' style={{backgroundColor : post.color}}>
                        <img src={`https://anonymous-animals.azurewebsites.net/animal/${post.animal}`} alt="Animal" />
                    </div>
                    <h4>Anonymous {post.animal}</h4>
                </div>
                <div className='postContent'>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                </div>
                <div className='likes'>
                    <button>Like</button><button onClick={handleCommentSection}>Comment</button>
                </div>
                <div>
                    {post.comments.map((comment, i) => {
                        return (<h3 key={i}>{comment.comment}</h3>)
                    })}
                    <form onSubmit={handleComment}>
                        <input type="text" name='comments' onChange={(e) => setCommentPost(e.target.value)} value={commentPost}/>
                        <button type='submit' onClick={()=> setPostId(post._id)}>Comment</button>
                    </form>
                </div>
            </div>)})}
            {addPost === true?
            <div className='newPost'>
                <h4>New Post</h4>
                <form onSubmit={createPost}>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)} value={title}/>
                    {errors.hasOwnProperty("title")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.title.message}</p>}
                    <br />
                    <br />
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea type="text" name='content' onChange={(e) => setContent(e.target.value)} value={content} rows="4" cols="40"/>
                    {errors.hasOwnProperty("content")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.content.message}</p>}
                    <br />
                    <br />
                    <button onClick={()=> setAddPost(false) + setTitle("") + setContent("")} className="btn btn-secondary">Nevermind</button>
                    <button type='submit' className='btn btn-success'>Post</button>
                </form>
            </div>
            :""}
        </div>
    )
}

export default PostList