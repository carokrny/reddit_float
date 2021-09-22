import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostIndex, selectPermalink } from '../../slices/subredditSlice';
import { fetchComments } from '../../slices/commentSlice';
import PrevButton from '../Buttons/PrevButton';
import NextButton from '../Buttons/NextButton';
import ViewCommentsButton from '../Buttons/ViewCommentsButton';
import Post from '../Post/Post';
import './PostPanel.css';

function PostPanel() {
    const dispatch = useDispatch();
    const permalink = useSelector(selectPermalink);
    
    useEffect(() => {
        dispatch(fetchComments(permalink));
    }, [dispatch, permalink])

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
                <ViewCommentsButton />
            </div>
        </div>
    );
}

export default PostPanel;