import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddit = createAsyncThunk(
    'subreddit/fetchSubreddit', 
    async (subreddit) => {
        const url = `https://www.reddit.com${subreddit}.json`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data.data.children;
        } catch(e) {
            console.error(e);
        }
    }
);

const subredditSlice = createSlice({
    name: 'subreddit', 
    initialState: {
        subreddit: null,
        isLoading: false,
        postIndex: null,
    }, 
    reducers: {
        updatePostIndex: (state, action) => {
            state.postIndex += action.payload;
        },
    },
    extraReducers: {
        [fetchSubreddit.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchSubreddit.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.subreddit = action.payload;
            state.postIndex = 0;
        },
        [fetchSubreddit.rejected]: (state) => {
            state.isLoading = false;
            state.subreddit = null;
            state.postIndex = null;
        },
    }
});

export const selectSubreddit = state => state.subreddit.subreddit; 
export const selectPostIndex = state => state.subreddit.postIndex;
export const selectIsCommentsShowing = state => state.subreddit.isCommmentsShowing;
export const selectIsLoading = state => state.subreddit.isLoading;

export const selectCurrentPost = state => {
    if(!state.subreddit.subreddit){
        return null;
    }
    return state.subreddit.subreddit[state.subreddit.postIndex].data;
}

export default subredditSlice.reducer;