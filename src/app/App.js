import { useSelector } from 'react-redux';
import { selectIsCommentsShowing } from '../store/commentSlice';
import SearchBar from '../components/SearchBar/SearchBar';
import PostPanel from '../components/PostPanel/PostPanel';
import CommentsPanel from '../components/CommentsPanel/CommentsPanel';
import './App.css';

function App () {
  const isShowingComments = useSelector(selectIsCommentsShowing);

  const mainClass = isShowingComments ? "commentsOpen" : "commentsNotOpen";

  return (
    <div className="App">
      <main className={mainClass}>
        <SearchBar />
        <PostPanel />
      </main>
      {isShowingComments ? <CommentsPanel /> : ""}
    </div>
  );
}

export default App;
