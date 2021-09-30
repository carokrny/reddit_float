import { createSlice } from '@reduxjs/toolkit';

/* 
Subreddit slice keeps fetches and stores the posts of a particular subreddit. 
Subreddit slice of state includes: 
    subredditName:          a string representing the '/r/...' of the current subreddit page.
    posts:                  an array of subreddit post objects
    count:                  integer representing the number of reddit posts seen by the user 
    before:                 reddit api identifier used to fetch previous page
    after:                  reddit api identifier used to fetch next page
    isSubredditLoading:     a boolean that signals whether the fetch is still loading
    postIndex:              an integer representing the index of the currently displayed post in posts
    atIndexMax:             a boolean that signals whether the postIndex is at the max index in posts
    atIndexMin:             a boolean that signals whether the postIndex is at the min index in posts
Subreddit slice has actions: 
    updatePostIndex:        updates the postIndex to be += action.payload and atIndexMax, atIndexMin accordingly
    resetPostIndex:         resets postIndex to 0 and atIndexMax, atIndexMin accordingly
    updateCount:            updates the count to be += action.payload
    resetCount:             resets count to 0
    startFetchSubreddit:    updates state to be ready to fetch a subreddit
    fulfilledFetchSubreddit:updates state according to payload from fetching a subreddit
    failedFetchSubreddit:   updates state to initial state if fetch encounters an error 
*/

const subredditSlice = createSlice({
    name: 'subreddit', 
    initialState: {
        subredditName: '/r/',
        posts: null,
        count: null,
        before: null,
        after: null,
        isSubredditLoading: false,
        postIndex: null,
        atIndexMax: true,
        atIndexMin: true,
    }, 
    reducers: {
        updatePostIndex: (state, action) => {
            state.postIndex += action.payload;
            if (state.postIndex >= state.posts.length-1) {
                state.atIndexMax = true;
            } else {
                state.atIndexMax = false;
            }
            if (state.postIndex === 0) {
                state.atIndexMin = true;
            } else {
                state.atIndexMin = false;
            }
        },
        resetPostIndex: (state) => {
            state.postIndex = 0;
            state.atIndexMin = true;
            if (state.posts.length) {
                state.atIndexMax = false;
            } else {
                state.atIndexMax = true;
            }
        },
        updateCount: (state, action) => {
            state.count += action.payload;
        }, 
        resetCount: (state) => {
            state.count = 0;
        }, 
        startFetchSubreddit: (state) => {
            state.isSubredditLoading = true;
        }, 
        fulfilledFetchSubreddit: (state, action) => {
            state.isSubredditLoading = false;
            state.subredditName = action.payload.subredditName;
            state.posts = action.payload.posts;
            state.before = action.payload.before;
            state.after = action.payload.after;
        }, 
        failedFetchSubreddit: (state) => {
            state.isSubredditLoading = false;
            state.subredditName = '/r/';
            state.posts = null;
            state.before = null;
            state.after = null;
            state.count = null;
            state.postIndex = null;
            state.atIndexMax = true;
            state.atIndexMin = true;
        },
    },
});

// selectors 
export const selectSubredditName = state => state.subreddit.subredditName;
export const selectCount = state => state.subreddit.count;
export const selectBefore = state => state.subreddit.before;
export const selectAfter = state => state.subreddit.after;
export const selectPostIndex = state => state.subreddit.postIndex;
export const selectAtIndexMax = state => state.subreddit.atIndexMax;
export const selectAtIndexMin = state => state.subreddit.atIndexMin;
export const selectIsSubredditLoading = state => state.subreddit.isSubredditLoading;
export const selectCurrentPost = state => {
    if(!state.subreddit.posts || state.subreddit.postIndex === null){
        return null;
    }
    return state.subreddit.posts[state.subreddit.postIndex];
}
export const selectPermalink = state => {
    if(!state.subreddit.posts || !state.subreddit.posts[state.subreddit.postIndex]){
        return null;
    }
    return state.subreddit.posts[state.subreddit.postIndex].permalink;
}

export const { updatePostIndex, 
    resetPostIndex, 
    updateCount, 
    resetCount, 
    startFetchSubreddit, 
    fulfilledFetchSubreddit, 
    failedFetchSubreddit } = subredditSlice.actions;

export default subredditSlice.reducer;

// Redux thunks to handle fetching subreddit are found in fetchSubredditThunks under ./util