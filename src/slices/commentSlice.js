import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* 
Comment slice keeps fetches and stores the comments of a particular post. 
Comment slice of state includes: 
    comments:              an array of comment objects assocaited with a particular post
    isCommentsLoading:     a boolean that signals whether the fetch is still loading
    isCommentsShowing:     a boolean that signals whether the comments are showing
Subreddit slice has actions: 
    fetchComments:         an async thunk that fetches the comments associated with a post's permalink
    toggleComments:        toggles whether comments are showing (i.e., isCommentsShowing)
*/

export const fetchComments = createAsyncThunk(
    'post/fetchComments', 
    async (permalink) => {
        if (!permalink) {
            return null;
        }
        const url = `https://www.reddit.com${permalink}.json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json[1].data.children);
            const comments = json[1].data.children.map(comment => {
                return {
                    author: comment.data.author,
                    body: comment.data.body,
                    ups: comment.data.ups,
                }
            });
            console.log(comments);
            return comments
        } catch(e) {
            console.error(e);
        }
    }
);

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
        }
    },
    extraReducers: {
         [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
            state.isCommentsShowing = false;
        },
        [fetchComments.rejected]: (state) => {
            state.isLoading = false;
            state.posts = null;
            state.isCommentsShowing = false;
        },
    }
});

export const selectIsCommentsLoading = state => state.comment.isCommentsLoading;
export const selectIsCommentsShowing = state => state.comment.isCommentsShowing;
export const selectComments = state => state.comment.comments;

export const { toggleComments } = commentSlice.actions;

export default commentSlice.reducer;