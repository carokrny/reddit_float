import { 
    resetCount, 
    updateCount,
    resetPostIndex,
    updatePostIndex,
    startFetchSubreddit, 
    fulfilledFetchSubreddit, 
    failedFetchSubreddit 
} from '../store/subredditSlice';
import { fetchSubreddit, FETCH_INTERVAL } from '../api/reddit';

// fetchThunks contains thunks used to fetch data from the reddit API to simplify logic within the component files. 

// thunk to fetch new subreddit post based on a search term
export const fetchSearch = (searchTerm) => async (dispatch, getState) => {
    try {
        dispatch(startFetchSubreddit());
        dispatch(resetCount());
        const { count } = getState().subreddit;
        const subredditData = await fetchSubreddit({ subredditName: searchTerm, additionalQuery: `&count=${count}` });
        dispatch(fulfilledFetchSubreddit(subredditData));
        dispatch(updateCount(FETCH_INTERVAL));
        dispatch(resetPostIndex());
    } catch(e) {
        dispatch(failedFetchSubreddit());
    }
}

// thunk to fetch next interval of posts in subreddit
export const fetchNextPosts = () => async (dispatch, getState) => {
    try {
        dispatch(startFetchSubreddit());
        const { count, after, subredditName } = getState().subreddit;
        const subredditData = await fetchSubreddit({ 
            subredditName: subredditName, 
            additionalQuery: `&count=${count}&after=${after}`
        });
        dispatch(fulfilledFetchSubreddit(subredditData));
        dispatch(updateCount(FETCH_INTERVAL));
        dispatch(resetPostIndex());
    } catch(e) {
        dispatch(failedFetchSubreddit());
    }
}

// thunk to fetch previous interval of posts in subreddit 
export const fetchPrevPosts = () => async (dispatch, getState) => {
    try {
        dispatch(startFetchSubreddit());
        dispatch(updateCount(-1*FETCH_INTERVAL));
        const { count, before, subredditName } = getState().subreddit;
        const subredditData = await fetchSubreddit({
            subredditName: subredditName, 
            additionalQuery: `&count=${count}&before=${before}`
        }); 
        dispatch(fulfilledFetchSubreddit(subredditData));
        dispatch(updatePostIndex(FETCH_INTERVAL - 1));
    } catch(e) {
        dispatch(failedFetchSubreddit());
    }
}