import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../../store/subredditSlice';
import { htmlDecode } from '../../util/htmlDecode';
import Vote from '../Vote/Vote';
import VideoPost from './VideoPost';
import './Post.css';

function Post() {
    const post = useSelector(selectCurrentPost);

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11) ? match[2] : null;
    }

    const getGfycatId = (url) => {
        const id = url.replace('https://gfycat.com/', '');
        return id;
    }

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
                {post.is_video && <VideoPost fallback_url={post.media.reddit_video.fallback_url} />}
                {post.domain === "youtube.com" && (
                    <iframe 
                        src={`//www.youtube.com/embed/${getYouTubeId(post.url)}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                        YouTube Video not available.
                    </iframe>
                )}
                {post.domain === "gfycat.com" && (
                    <iframe 
                        src={`//gfycat.com/ifr/${getGfycatId(post.url)}`} 
                        title="gfycat player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                        gfycat not available.
                    </iframe>)}
                {post.domain === "twitter.com" && (
                    htmlDecode(post.media.oembed.html)
                )}
                {post.selftext_html && htmlDecode(post.selftext_html)}
            </>
        )
    }

    return (
        <>
            <div className="voteContainer">
                <Vote ups={!post ? "" : post.ups} />
            </div>
            <div className="post">
                {renderPost()}
            </div>
        </>
    );
}

export default Post;
