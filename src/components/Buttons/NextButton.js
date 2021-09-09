import { useDispatch, useSelector } from 'react-redux';
import { updatePostIndex, selectAtIndexMax } from '../../slices/subredditSlice';
import './Buttons.css';

function NextButton() {
    const dispatch = useDispatch();
    const atMax = useSelector(selectAtIndexMax);

    return (
        <button 
            disabled={atMax}
            onClick={() => {dispatch(updatePostIndex(1))}}>
            &#8680;
        </button>
    )
}

export default NextButton;