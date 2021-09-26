import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAtIndexMin, 
    selectBefore, 
    updatePostIndex } from '../../store/subredditSlice';
import { fetchPrevPosts } from '../../util/fetchSubredditThunks';
import './Buttons.css';

function PrevButton() {
    const dispatch = useDispatch();
    const atIndexMin = useSelector(selectAtIndexMin);
    const before = useSelector(selectBefore);

    // helper function to determine which action to dispatch when PrevButton is clicked
    const handleClick = useCallback(() => {
        if (atIndexMin && before) {
            dispatch(fetchPrevPosts());
        } else if (!atIndexMin) { 
            dispatch(updatePostIndex(-1));
        }
    }, [atIndexMin, before, dispatch]);

    // helper function to determine if a key is the left arrow key
    const handleKeyDown = useCallback((e) => {
        if (e.keyCode === 37) {
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
            disabled={atIndexMin && !before}
            onClick={handleClick} >
            &#8678;
        </button>
    );
}

export default PrevButton;