import { useEffect } from 'react';
import { htmlDecode } from '../../util/htmlDecode';

function TwitterPost(props) {
    const script_url = 'https://platform.twitter.com/widgets.js';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = script_url;
        script.async = true;
        script.id = 'twitter-script';
        document.body.appendChild(script);
        return (() => {
            let allsuspects = document.getElementsByTagName("script");
            for (let i=allsuspects.length; i>=0; i--) {
                if (allsuspects[i] && allsuspects[i].getAttribute("src") !== null && allsuspects[i].getAttribute("src").indexOf(`${script_url}`) !== -1 ) {
                    allsuspects[i].parentNode.removeChild(allsuspects[i])
                }    
            }
        });
    }, [])

    return (
        <div>
            {htmlDecode(props.twitterHtml)}
        </div>
    );
}

export default TwitterPost;