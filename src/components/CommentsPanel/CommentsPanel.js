import { useSelector } from 'react-redux';
import { selectComments, selectIsCommentsShowing } from '../../slices/commentSlice';
import Comment from '../Comment/Comment';
import './CommentsPanel.css';

function CommentsPanel() {
    const comments = useSelector(selectComments);
    const isShowingComments = useSelector(selectIsCommentsShowing);

    const commentsClass = isShowingComments ? "commentsPanel open" : "commentsPanel";
    
    return (
        <div className={commentsClass}>
            {
                comments.map((comment, index) => {
                    return <Comment comment={comment} key={index} />
                })
            }
        </div>
    )
}

export default CommentsPanel;