import React, {useState} from 'react'
import axios from 'axios';
import '../static/Post.css'

const Post = (props) => {
    const {user, post} = props;
    const [comment, setComment] = useState(false)

    const [errors, setErrors] = useState({})

    console.log(errors)

    // Add Comment
    const [commentPost, setCommentPost] = useState("")
    const [postId, setPostId] = useState("")

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
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div className="post" style={{backgroundColor : post.userId === user._id?"#A2BCE0":"#FAFFFD"}}>
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
                <span style={{marginRight : "25px"}}>{post.likes} Likes</span><button className="btn btn-outline-primary" id='likes'>Like</button>
                <button onClick={handleCommentSection} id='comment' className='btn btn-outline-dark'>Comment</button>
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
                    {errors.hasOwnProperty("comment")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.comment.message}</p>}
                </form>
            </div>:""}
        </div>
    )
}

export default Post