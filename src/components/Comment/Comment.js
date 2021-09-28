import { useState } from 'react';
import Vote from '../Vote/Vote';
import { htmlDecode } from '../../util/htmlDecode';
import './Comment.css';

function Comment(props) {
    const [repliesShowing, setRepliesShowing]  = useState(false);
    const replies = [];
    // extract replies from extraneous data
    if (props.comment.replies && props.comment.replies !== '') {
        props.comment.replies.data.children.forEach(reply => {
            if (reply.kind === 't1') {
                replies.push(reply);
            }
        })
    }
    const numReplies = replies.length;

    const toggleReplies = () => {
        setRepliesShowing(!repliesShowing);
    }

    const getRepliesButton = () => {
        if (numReplies) {
            if (!repliesShowing) {
                if (numReplies === 1) {
                    return <button onClick={toggleReplies}>&#9660; {numReplies} reply</button>;
                }
                return <button onClick={toggleReplies}>&#9660; {numReplies} replies</button>;
            } else {
                return <button onClick={toggleReplies}>&#9650; hide</button>;
            }
        }
    }

    return (
        <div className='comment-and-replies'>
            <div className='comment'>
                <div className='comment-votes'>
                    <Vote ups={props.comment.ups} />
                </div>
                <div className='comment-content'>
                    <h4>{props.comment.author}</h4>
                    <div className="comment-body">{htmlDecode(props.comment.body_html)}</div>
                    {getRepliesButton()}
                </div>
            </div>
            {repliesShowing && <div className="replies">
                {   
                    replies.map((reply, index) => {
                        return <Comment comment={reply.data} key={index} />;
                    })
                }
            </div>}
        </div>
    )
}

export default Comment;