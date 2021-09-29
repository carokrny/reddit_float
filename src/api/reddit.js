export const FETCH_INTERVAL = 20;
export const API_ROOT = 'https://www.reddit.com';

export const fetchSubreddit = async (fetchData) => {
    const { subredditName, additionalQuery } = fetchData;
    const url = `${API_ROOT}${subredditName}.json?limit=${FETCH_INTERVAL}${additionalQuery}`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        const posts = json.data.children.map(post => post.data);
        return {
            subredditName: subredditName,
            posts: posts, 
            before: json.data.before,
            after: json.data.after,
        }
    } catch(e) {
        console.error(e);
    }
}

export const fetchComments = async (permalink) => {
    if (!permalink) {
        return null;
    }
    const url = `https://www.reddit.com${permalink}.json`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        const comments = json[1].data.children.map(comment => comment.data);
        return comments;
    } catch(e) {
        console.error(e);
    }
}

