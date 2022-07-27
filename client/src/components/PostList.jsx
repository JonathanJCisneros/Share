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
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, userId : user._id, title, content, likes : 0})
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
            <button className="btn btn-outline-primary" onClick={()=> setAddPost(true)} id='newPost'>Tell Us How You Are Feeling Today!</button>
            {postList.map((post, i) =>{
            return (<div className="post" key={i} style={{backgroundColor : post.userId === user._id?"#A2BCE0":"#FAFFFD"}}>
                <div className='postHeader'>
                    <div className='postProfileImage' style={{backgroundColor : post.userId === user._id? user.color:post.color}}>
                        <img src={`https://anonymous-animals.azurewebsites.net/animal/${post.userId === user._id? user.animal:post.animal}`} alt="Animal" />
                    </div>
                    <h4 style={{color : post.userId === user._id? "white": "black"}}>{post.userId === user._id? "You": "Anonymous " + post.animal.charAt(0).toUpperCase() + post.animal.slice(1)}</h4>
                </div>
                <div className='postContent'>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                </div>
                <div className='likes'>
                    <span style={{marginRight : "25px"}}>{post.likes} Likes</span><button class="btn btn-outline-primary" id='likes'>Like</button><button onClick={handleCommentSection} id='comment' className='btn btn-outline-dark'>Comment</button>
                </div>
                <div className='commentSection'>
                    {post.comments.map((comment, i) => {
                        return (<div key={i} className='commentBubble' style={{backgroundColor : comment.userId === user._id? "#1982FC": "lightgray", marginRight : comment.userId === user._id? "0px": "auto", marginLeft : comment.userId === user._id? "auto" :"0px"}}>
                            <div className='commentHeader'>
                                <div className='commentImage' style={{backgroundColor : comment.userId === user._id? user.color:comment.color}}>
                                    <img src={`https://anonymous-animals.azurewebsites.net/animal/${comment.userId === user._id? user.animal:comment.animal}`} alt="Animal"/>
                                </div>
                                <p > {comment.userId === user._id? "You" :"Anonymous " + comment.animal.charAt(0).toUpperCase() + comment.animal.slice(1)}</p>
                            </div>
                            <p className='comments'>{comment.comment}</p>
                        </div>)
                    })}
                </div>
                {comment?
                <div>
                    <form onSubmit={handleComment}>
                        <input type="text" name='comments' onChange={(e) => setCommentPost(e.target.value)} value={commentPost}/>
                        <button type='submit' onClick={()=> setPostId(post._id)}>Comment</button>
                    </form>
                </div>:""}
            </div>)})}
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
        </div>
    )
}

export default PostList