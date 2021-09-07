import Post from '../Post/Post';
import PrevButton from '../Buttons/PrevButton';
import NextButton from '../Buttons/NextButton';
import './PostPanel.css';

function PostPanel() {

    return (
        <div className="postPanel">
            <div className="postContainer">
                <Post />
            </div>
            <div className="buttonsContainer">
                <PrevButton />
                <NextButton />
            </div>
        </div>
    );
}

export default PostPanel;