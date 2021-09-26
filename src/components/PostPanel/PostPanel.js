import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPermalink, selectIsSubredditLoading } from '../../store/subredditSlice';
import { fetchPostComments } from '../../store/commentSlice';
import PrevButton from '../Buttons/PrevButton';
import NextButton from '../Buttons/NextButton';
import ViewCommentsButton from '../Buttons/ViewCommentsButton';
import Post from '../Post/Post';
import './PostPanel.css';

function PostPanel() {
    const dispatch = useDispatch();
    const permalink = useSelector(selectPermalink);
    const isSubredditLoading = useSelector(selectIsSubredditLoading);

    // fetch comments whenever post updates
    useEffect(() => {
        if (permalink) {
            dispatch(fetchPostComments(permalink));
        }
    }, [dispatch, permalink]);

    const loadingPanel = () => {
        return (
            <h2>loading...</h2>
        )
    }

    const notLoadingPanel = () => {
        return (<>
            <div className="postContainer">
                <Post />
            </div>
            <div className="buttonsContainer">
                <PrevButton />
                <NextButton />
                <ViewCommentsButton />
            </div>
        </>)
    }
    
    return (
        <div 
            className="postPanel" >
            {isSubredditLoading ? loadingPanel() : notLoadingPanel()}
        </div>
    );
}

export default PostPanel;