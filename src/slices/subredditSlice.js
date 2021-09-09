import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddit = createAsyncThunk(
    'subreddit/fetchSubreddit', 
    async (subreddit) => {
        const url = `https://www.reddit.com${subreddit}.json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const posts = json.data.children;
            console.log(posts);
            return posts;
        } catch(e) {
            console.error(e);
        }
    }
);

const subredditSlice = createSlice({
    name: 'subreddit', 
    initialState: {
        posts: null,
        isLoading: false,
        postIndex: null,
        atIndexMax: true,
    }, 
    reducers: {
        updatePostIndex: (state, action) => {
            if(!state.atIndexMax || action.payload < 0) {
                state.postIndex += action.payload;
                if (state.postIndex >= state.posts.length-1) {
                    state.atIndexMax = true;
                } else if (state.atIndexMax) {
                    state.atIndexMax = false;
                }
            }
        },
    },
    extraReducers: {
        [fetchSubreddit.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchSubreddit.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            state.postIndex = 0;
            if (state.posts.length) {
                state.atIndexMax = false;
            }
        },
        [fetchSubreddit.rejected]: (state) => {
            state.isLoading = false;
            state.posts = null;
            state.postIndex = null;
            state.atIndexMax = true;
        },
    }
});

export const selectPosts = state => state.subreddit.posts; 
export const selectPostIndex = state => state.subreddit.postIndex;
export const selectAtIndexMax = state => state.subreddit.atIndexMax;
export const selectIsCommentsShowing = state => state.subreddit.isCommmentsShowing;
export const selectIsLoading = state => state.subreddit.isLoading;
export const selectCurrentPost = state => {
    if(!state.subreddit.posts){
        return null;
    }
    return state.subreddit.posts[state.subreddit.postIndex].data;
}

export const { updatePostIndex } = subredditSlice.actions;

export default subredditSlice.reducer;