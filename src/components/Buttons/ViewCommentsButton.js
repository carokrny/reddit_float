import { useDispatch, useSelector } from 'react-redux';
import { toggleComments, selectComments, selectIsCommentsLoading } from '../../slices/commentSlice';
import './Buttons.css';

function ViewCommentsButton() {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const commentsIsLoading = useSelector(selectIsCommentsLoading);

    return (
        <button 
            disabled={!commentsIsLoading && !comments}
            onClick={() => {dispatch(toggleComments())}}>
            Comments
        </button>
    )
}

export default ViewCommentsButton;