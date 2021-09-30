import './Vote.css';

function Vote(props) { 
    const formatUps = () => {
        const ups = props.ups;
        if (ups>1000) {
            return `${(ups/1000).toFixed(1)}k`;
        }
        return ups;
    }

    return (
        <div className="vote">
            <h4>&#8679;</h4>
            <h5>{formatUps()}</h5>
            {/*<h4>&#8681;</h4>*/}
        </div>
    );
}

export default Vote;