import React from 'react'
import './Loader.css'
import PropTypes from 'prop-types'

const Loader = ({ text = "" }) => {
    
    return (
        <div className="div-loader">
            {text || "Loading Account Info"}
            <div className="div-loader-line"></div>
            <div className="div-loader-line"></div>
            <div className="div-loader-line"></div>
        </div>
    )
}

Loader.propTypes = {
    text: PropTypes.string
}

export default Loader
