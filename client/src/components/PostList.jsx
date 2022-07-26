import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../static/PostList.css';

const PostList = (props) => {
    const {user} = props;
    const [addPost, setAddPost] = useState(false)
    const [postList, setPostList] = useState([])

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000`)
    })

    const createPost = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/post`, {animal : user.animal, color: user.color, userId : user._id, title, content, likes : 0}, {withCredentials : true})
            .then(res => setAddPost(false))
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
            <div className="post">
                <div className='postHeader'>
                    <div className='postProfileImage'>
                        <p>img</p>
                    </div>
                    <h4>Anonymous User</h4>
                </div>
                <div className='postContent'>
                    <h4>Title</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim inventore modi expedita at aliquid minima exercitationem, pariatur accusamus! Non velit reiciendis ratione saepe a alias sit ipsam. Saepe, exercitationem. Odit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur debitis voluptatibus magnam quae numquam doloribus nostrum dolore expedita ducimus magni, omnis veritatis minima quo mollitia dolorem odio a natus inventore! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto laudantium, ex voluptates maiores illum ipsam. Facilis modi ipsam incidunt culpa architecto ducimus nisi adipisci reprehenderit quasi laudantium, quia, rerum labore.</p>
                </div>
                <div className='likes'>
                    <button>Like</button><button>Comment</button>
                </div>
                <div>Comments/drop down to comment your own</div>
            </div>
            {addPost === true?
            <div className='newPost'>
                <h4>New Post</h4>
                <form onSubmit={createPost}>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input type="text" name='title' onChange={(e)=> setTitle(e.target.value)} value={title}/>
                    <br />
                    <br />
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea type="text" name='content' onChange={(e) => setContent(e.target.value)} value={content} rows="4" cols="40"/>
                    <br />
                    <br />
                    <button onClick={()=> setAddPost(false)} className="btn btn-secondary">Nevermind</button>
                    <button type='submit' className='btn btn-success'>Post</button>
                </form>
            </div>
            :""}
        </div>
    )
}

export default PostList