import { configureStore } from '@reduxjs/toolkit';

import subredditReducer from '../slices/subredditSlice';
import commentReducer from '../slices/commentSlice';

export default configureStore({
  reducer: {
      subreddit: subredditReducer,
      comment: commentReducer,
  },
});
