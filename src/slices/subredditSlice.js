import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* 
Subreddit slice keeps fetches and stores the posts of a particular subreddit. 
Subreddit slice of state includes: 
    posts:                  an array of subreddit post objects
    isSubredditLoading:     a boolean that signals whether the fetch is still loading
    postIndex:              an integer representing the index of the currently displayed post in posts
    atIndexMax:             a boolean that signals whether the postIndex is at the max index in posts
Subreddit slice has actions: 
    fetchSubreddit:         an async thunk that fetches the posts associated with a subreddit ('/r/...')
    updatePostIndex:        updates the postIndex to be += action.payload, if within bounds

*/

export const fetchSubreddit = createAsyncThunk(
    'subreddit/fetchSubreddit', 
    async (subreddit) => {
        if (!subreddit) {
            return null;
        }
        const url = `https://www.reddit.com${subreddit}.json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            const posts = json.data.children.map(post => {
                return {
                    title: post.data.title, 
                    author: post.data.author, 
                    permalink: post.data.permalink,
                    is_video: post.data.is_video, 
                    domain: post.data.domain,
                    post_hint: post.data.post_hint, 
                    selftext: post.data.selftext,
                    ups: post.data.ups,
                    url: post.data.url,
                    media: post.data.media,
                }
            });
            console.log('fetchSubreddit');
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
        isSubredditLoading: false,
        postIndex: null,
        atIndexMax: true,
    }, 
    reducers: {
        updatePostIndex: (state, action) => {
            if(state.posts && (!state.atIndexMax || action.payload < 0)) {
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
            state.isSubredditLoading = true;
        },
        [fetchSubreddit.fulfilled]: (state, action) => {
            state.isSubredditLoading = false;
            state.posts = action.payload;
            state.postIndex = 0;
            if (state.posts.length) {
                state.atIndexMax = false;
            }
        },
        [fetchSubreddit.rejected]: (state) => {
            state.isSubredditLoading = false;
            state.posts = null;
            state.postIndex = null;
            state.atIndexMax = true;
        },
    }
});

export const selectPostIndex = state => state.subreddit.postIndex;
export const selectAtIndexMax = state => state.subreddit.atIndexMax;
export const selectIsSubredditLoading = state => state.subreddit.isSubredditLoading;
export const selectCurrentPost = state => {
    if(!state.subreddit.posts){
        return null;
    }
    return state.subreddit.posts[state.subreddit.postIndex];
}
export const selectPermalink = state => {
    if(!state.subreddit.posts){
        return null;
    }
    return state.subreddit.posts[state.subreddit.postIndex].permalink;
}

export const { updatePostIndex, toggleComments } = subredditSlice.actions;

export default subredditSlice.reducer;