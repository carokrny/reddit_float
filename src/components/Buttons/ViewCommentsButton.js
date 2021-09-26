import { useDispatch, useSelector } from 'react-redux';
import { toggleComments, selectComments } from '../../store/commentSlice';
import './Buttons.css';

function ViewCommentsButton() {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);

    return (
        <button 
            disabled={!comments}
            onClick={() => {dispatch(toggleComments())}}>
            Comments
        </button>
    )
}

export default ViewCommentsButton;