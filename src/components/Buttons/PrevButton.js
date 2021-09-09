import { useDispatch, useSelector } from 'react-redux';
import { updatePostIndex, selectPostIndex } from '../../slices/subredditSlice';
import './Buttons.css';

function PrevButton() {
    const dispatch = useDispatch();
    const index = useSelector(selectPostIndex);

    return (
        <button 
            disabled={index <= 0}
            onClick={() => {dispatch(updatePostIndex(-1))}}>
            &#8678;
        </button>
    )
}

export default PrevButton;