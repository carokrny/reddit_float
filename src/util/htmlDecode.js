import ReactHtmlParser from 'react-html-parser';

/*
htmlDecode is a helper function to decode the twice-escaped content returned by Reddit API and return a React component.
*/
export const htmlDecode = (str) => {
    const e = document.createElement('div');
    e.innerHTML = str;
    return ReactHtmlParser(e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue);
}