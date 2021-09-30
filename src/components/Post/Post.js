import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../../store/subredditSlice';
import { htmlDecode } from '../../util/htmlDecode';
import Vote from '../Vote/Vote';
import VideoPost from './VideoPost';
import TwitterPost from './TwitterPost';
import './Post.css';

function Post() {
    const post = useSelector(selectCurrentPost);

    const renderPost = () => {
        if (!post) {
            return (
                <>
                    <h2>Welcome to Reddit Float, a pared down Reddit client for mild visual impairments.</h2>
                    <p>Use the search bar to search for a subreddit and view posts.</p> 
                    <p>One post is displayed at a time to reduce eye strain. Use the mouse or arrow keys to toggle between posts. </p>
                    <p>Use the comments button toggle viewing the comments.</p>
                    <p>Reddit Float is read-only. Click on a post's title to view on Reddit!</p>
                </>
            );
        }
        return (
            <>
                <a 
                    href={`https://www.reddit.com${post.permalink}`} 
                    target="_blank"  
                    rel="noreferrer" 
                    className="link" >
                    <h2>{htmlDecode(post.title)}</h2>
                </a>
                <p className="author">- {post.author}</p>
                {post.post_hint==="image" && (
                    <img 
                        src={post.url}
                        alt="" />
                )}
                {post.post_hint==="link" && post.domain !== "twitter.com" && (
                    <a href={post.url}>
                        {`${post.url.substring(8,38)}...`} 
                    </a>
                )}
                {post.is_video && 
                    post.media.reddit_video && (
                    <VideoPost fallback_url={post.media.reddit_video.fallback_url}/>
                )}
                {(post.domain === "gfycat.com" || post.domain === "youtube.com") && 
                    post.media.oembed && 
                    htmlDecode(post.media.oembed.html
                )}
                {post.domain === "twitter.com" && 
                    post.media.oembed && 
                    <TwitterPost twitterHtml={post.media.oembed.html} />}
                {post.selftext_html && 
                    htmlDecode(post.selftext_html)
                }
            </>
        )
    }

    return (
        <>
            <div className="voteContainer">
                {!post ? "" : <Vote ups={post.ups} />}
            </div>
            <div className="post">
                {renderPost()}
            </div>
        </>
    );
}

export default Post;
