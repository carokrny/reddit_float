import { useEffect, useState, useCallback } from 'react';

function VideoPost(props) {
    const [audioError, setAudioError] = useState(false)
    const audio_url = props.fallback_url.split("DASH_")[0] + "DASH_audio.mp4";

    const handleAudio = useCallback((e) => {
        const video = document.getElementById('redditVideo');
        const audio = document.getElementById('redditAudio');
        if (!audio || audioError) {
            return;
        }
        switch(e.type) {
            case 'play': 
                audio.play();
                break;
            case 'pause': 
                audio.pause();
                break;
            case 'seeked': 
                audio.currentTime = video.currentTime;
                break;
            case 'volumechange': 
                audio.volume = video.volume;
                break;
            default:
                break;
        }
    }, [audioError]);

    useEffect(() => {
        const video = document.getElementById('redditVideo');
        video.addEventListener('play', handleAudio);
        video.addEventListener('pause', handleAudio);
        video.addEventListener('seeked', handleAudio);
        video.addEventListener('volumechange', handleAudio);

        return () => {
            //const video = document.getElementById('redditVideo');
            video.removeEventListener('play', handleAudio);
            video.removeEventListener('pause', handleAudio);
            video.removeEventListener('seeking', handleAudio);
            video.removeEventListener('volumechange', handleAudio);
        };
    }, [handleAudio, audioError]);

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
            { !audioError && (
                <audio
                    src={audio_url}
                    onError={(e) => {
                        e.target.onError = null;
                        setAudioError(true);
                    }}
                    id="redditAudio"
                    display='none'>
                </audio>
            )}
        </>
    )
}
     
export default VideoPost;