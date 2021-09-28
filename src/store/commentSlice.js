import { createSlice } from '@reduxjs/toolkit';
import { fetchComments } from '../api/reddit';

/* 
Comment slice keeps fetches and stores the comments of a particular post. 
Comment slice of state includes: 
    comments:               an array of comment objects assocaited with a particular post
    isCommentsLoading:      a boolean that signals whether the fetch is still loading
    isCommentsShowing:      a boolean that signals whether the comments are showing
Subreddit slice has actions: 
    toggleComments:         toggles whether comments are showing (i.e., isCommentsShowing)
    startFetchComments:     updates state to be ready to fetch comments
    fulfilledFetchComments: updates state according to payload from fetching comments
    failedFetchComments:    updates state to initial state if fetch encounters an error
*/

const commentSlice = createSlice({
    name: 'comment', 
    initialState: {
        comments: null,
        isCommentsLoading: false,
        isCommentsShowing: false, 
    }, 
    reducers: {
        toggleComments: (state) => {
            state.isCommentsShowing = !state.isCommentsShowing;
        }, 
        startFetchComments: (state) => {
            state.isCommentsLoading = true;
            state.isCommentsShowing = false;
        }, 
        fulfilledFetchComments: (state, action) => {
            state.isCommentsLoading = false;
            state.comments = action.payload;
        }, 
        failedFetchComments: (state) => {
            state.isCommentsLoading = false;
            state.comments = null;
        }
    },
});

export const selectIsCommentsLoading = state => state.comment.isCommentsLoading;
export const selectIsCommentsShowing = state => state.comment.isCommentsShowing;
export const selectComments = state => state.comment.comments;

export const { 
    toggleComments, 
    startFetchComments, 
    fulfilledFetchComments, 
    failedFetchComments 
} = commentSlice.actions;

export default commentSlice.reducer;

// Redux thunk to get comments for a particular post 
export const fetchPostComments = (permalink) => async (dispatch) => {
    try {
        dispatch(startFetchComments());
        const comments = await fetchComments(permalink);
        dispatch(fulfilledFetchComments(comments));
    } catch (e) {
        dispatch(failedFetchComments());
    }
}