import React, {useState} from 'react';
import axios from 'axios';
import '../static/Post.css';
import { useEffect } from 'react';

const Post = (props) => {
    const {user, post} = props;
    const [postInfo, setPostInfo] = useState(post)
    const [comment, setComment] = useState(false);
    const [liked, setLiked] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${post._id}`)
            .then(res => setPostInfo(res.data))
            .catch(err => console.log(err))
    },[refresh, post._id])

    const handlePostLikes = (postId) => {
        {liked?
            axios.put(`http://localhost:8000/api/post/${postId}`, {$inc : {likes : -1}})
                .then(res => setLiked(false) + setRefresh(!refresh))
                .catch(err => console.log(err)):
            axios.put(`http://localhost:8000/api/post/${postId}`, {$inc : {likes : 1}})
                .then(res => setLiked(true) + setRefresh(!refresh))
                .catch(err => console.log(err))
        }
    }

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
            .then(res => setCommentPost("") + setPostId("") + setRefresh(!refresh))
            .catch(err => setErrors(err.response.data.errors))
    } 

    return (
        <div className="post" style={{backgroundColor : postInfo.userId === user._id?"#A2BCE0":"#FAFFFD"}}>
            <div className='postHeader'>
                <div className='postProfileImage' style={{backgroundColor : postInfo.userId === user._id? user.color:postInfo.color}}>
                    <img src={`https://anonymous-animals.azurewebsites.net/animal/${postInfo.userId === user._id? user.animal:postInfo.animal}`} alt="Animal" />
                </div>
                <h4 style={{color : postInfo.userId === user._id? "white": "black"}}>{postInfo.userId === user._id? "You": "Anonymous " + postInfo.animal.charAt(0).toUpperCase() + postInfo.animal.slice(1)}</h4>
            </div>
            <div className='postContent'>
                <h4>{postInfo.title}</h4>
                <p>{postInfo.content}</p>
            </div>
            <div className='likes'>
                <span style={{marginRight : "25px"}}>{postInfo.likes} Likes</span><button onClick={()=>handlePostLikes(postInfo._id)} className={liked? "btn btn-outline-success": "btn btn-outline-primary"} id='likes'>{liked? "Liked": "Like"}</button>
                <button onClick={handleCommentSection} id='comment' className='btn btn-outline-dark'>Comment</button>
            </div>
            <div className='commentSection'>
                {postInfo.comments.map((comment, i) => {
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
                    <input type="text" className='form-control' name='comments' onChange={(e) => setCommentPost(e.target.value)} value={commentPost} placeholder="Add your comment here!"/>
                    <button type='submit' onClick={()=> setPostId(post._id)} className='btn btn-outline-success' style={{marginTop : "10px"}}>Comment</button>
                    {errors.hasOwnProperty("comment")&& <p style={{color : "red", fontWeight : "bold"}}>{errors.comment.message}</p>}
                </form>
            </div>:""}
        </div>
    )
}

export default Post