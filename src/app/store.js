import { configureStore } from '@reduxjs/toolkit';

import subredditReducer from '../slices/subredditSlice';

export default configureStore({
  reducer: {
      subreddit: subredditReducer,
  },
});
