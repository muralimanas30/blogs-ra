import React, { useState } from 'react';
import './SearchBox.css'; // Optional for styling
import PropTypes from 'prop-types'

const SearchBox = ({inputValue, setInputValue}) => {
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    return (
            <input
                type="text"
                className="searchbox-input"
                placeholder="Search Users 👤"
                value={inputValue}
                onChange={handleInputChange}
            />
    );
};
SearchBox.propTypes ={
    inputValue:PropTypes.string,
    setInputValue:PropTypes.func,
    handleSearch:PropTypes.func
}

export default SearchBox;
