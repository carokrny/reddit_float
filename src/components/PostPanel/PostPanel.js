import Post from '../Post/Post';
import './PostPanel.css';

function PostPanel() {

    return (
        <div className="postPanel">
            <div className="postContainer">
                <Post />
            </div>
        </div>
    );
}

export default PostPanel;