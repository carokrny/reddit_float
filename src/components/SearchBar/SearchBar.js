import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSubreddit } from '../../slices/subredditSlice';
import './SearchBar.css';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('/r/');
    const dispatch = useDispatch();

    const search = () => {
        dispatch(fetchSubreddit(searchTerm)); 
    };

    const handleKeyDown = e => {
        if(e.keyCode === 13) {
            search();
        } 
    };  
    
    return (
        <div className="searchBar">
            <input 
                type="text"
                placeholder="/r/" 
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
    );
}

export default SearchBar; 
