import { useDispatch } from 'react-redux';
import { updatePostIndex } from '../../slices/subredditSlice';
import Post from '../Post/Post';
import PrevButton from '../Buttons/PrevButton';
import NextButton from '../Buttons/NextButton';
import './PostPanel.css';

function PostPanel() {
    const dispatch = useDispatch();
  
    const handleKeyDown = (e) => {
        if (e.keyCode === 39) {
            dispatch(updatePostIndex(1));
        } 
        if (e.keyCode === 37) {
            dispatch(updatePostIndex(-1));
        } 
    }
    
    return (
        <div 
            className="postPanel"
            tabIndex="0"
            onKeyDown={(e) => handleKeyDown(e)}>
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