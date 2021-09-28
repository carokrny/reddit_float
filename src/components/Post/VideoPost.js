import { useEffect } from 'react';

function VideoPost(props) {
    const audio_url =props.fallback_url.split("DASH_")[0] + "DASH_audio.mp4";

    const handleAudio = (e) => {
        const video = document.getElementById('redditVideo');
        const audio = document.getElementById('redditAudio');
        if (e.type === 'play') {
            audio.play();
        } else if (e.type === 'pause') {
            audio.pause();
        } else if (e.type === 'seeked') {
            audio.currentTime = video.currentTime;
        } else if (e.type === 'volumechange') {
            audio.volume = video.volume;
        }
    }

    useEffect(() => {
        const video = document.getElementById('redditVideo');
        video.addEventListener('play', handleAudio);
        video.addEventListener('pause', handleAudio);
        video.addEventListener('seeked', handleAudio);
        video.addEventListener('volumechange', handleAudio);

        return () => {
            video.removeEventListener('play', handleAudio);
            video.removeEventListener('pause', handleAudio);
            video.removeEventListener('seeking', handleAudio);
            video.removeEventListener('volumechange', handleAudio);
        };
    }, []);

    return (
        <> 
            <video 
                controls 
                autoPlay
                preload="auto"
                id="redditVideo"
                src={props.fallback_url} 
                type="video/mp4">
                Video not supported by browser.
            </video>
            <audio
                src={audio_url}
                id="redditAudio"
                display='none'>
            </audio>
        </>
    )
}

export default VideoPost;