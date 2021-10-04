import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearch } from '../../util/fetchSubredditThunks';
import './SearchBar.css';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('/r/');
    const dispatch = useDispatch();

    const search = () => {
        dispatch(fetchSearch(searchTerm))
    };

    const handleKeyDown = e => {
        if(e.keyCode === 13) {
            search();
        } 
    };  
    
    return (
        <div className="gridWrapper">
            <div className="searchBar">
                <img 
                    src="./reddit-float-logo.png"
                    alt="reddit float logo" 
                />
                <input 
                    type="text"
                    placeholder="/r/" 
                    spellCheck="false"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
                <button 
                    className="SearchButton" 
                    onClick={search} >
                    GO
                </button>
            </div>
        </div>
    );
}

export default SearchBar; 
