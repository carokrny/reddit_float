import './Comment.css';
import Vote from '../Vote/Vote';

function Comment(props) {
    return (
        <div className='comment'>
            <Vote ups={props.comment.ups} />
            <div className='comment-text'>
                <h4>{props.comment.author}</h4>
                <p>{props.comment.body}</p>
            </div>
        </div>
    )
}

export default Comment;