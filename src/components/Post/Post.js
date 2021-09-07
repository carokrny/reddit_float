import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../../slices/subredditSlice';
import './Post.css';

function Post() {
    const post = useSelector(selectCurrentPost);

    const renderPost = () => {
        if (!post) {
            return;
        }
        return (
            <>
                <h2>{post.title}</h2>
                <p className="author">- {post.author}</p>
                <p>{post.selftext}</p>
            </>
        )
    }

    return (
        <div className="post">
            {renderPost()}
        </div>
    );
}

export default Post;