import React from 'react';
import '../static/PostList.css';

const PostList = () => {
    return (
        <div>
            <div className='dailyPost'>
                <h1>Post of the Day</h1>
            </div>
            <h1>Post List</h1>
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
        </div>
    )
}

export default PostList