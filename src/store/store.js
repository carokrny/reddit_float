import { configureStore } from '@reduxjs/toolkit';

import subredditReducer from './subredditSlice';
import commentReducer from './commentSlice';

export default configureStore({
  reducer: {
      subreddit: subredditReducer,
      comment: commentReducer,
  },
});
