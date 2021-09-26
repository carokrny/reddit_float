import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAtIndexMax, 
    selectAfter,
    updatePostIndex } from '../../store/subredditSlice';
import { fetchNextPosts } from '../../util/fetchSubredditThunks';
import './Buttons.css';

function NextButton() {
    const dispatch = useDispatch();
    const atIndexMax = useSelector(selectAtIndexMax);
    const after = useSelector(selectAfter);
    
    // helper function to determine which action to dispatch when NextButton is clicked
    const handleClick = useCallback(() => {
        if (atIndexMax && after) { 
            dispatch(fetchNextPosts());
        } else if (!atIndexMax) {        
            dispatch(updatePostIndex(1));
        }
    }, [atIndexMax, after, dispatch]);

    // helper function to determine if a key is the right arrow key
    const handleKeyDown = useCallback((e) => {
        if (e.keyCode === 39) {
            handleClick();
        }
    }, [handleClick]);

    // use Effect hook to add a keydown event listener to the window
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
         };
    }, [handleKeyDown]);

    return (
        <button 
            disabled={atIndexMax && !after}
            onClick={handleClick} >
            &#8680;
        </button>
    );
}

export default NextButton;