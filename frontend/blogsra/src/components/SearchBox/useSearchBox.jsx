import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';

const useSearchBox = () => {
    const [inputValue, setInputValue] = useState('')

    return (
        {
            inputValue, setInputValue
        }
    )
}


export default useSearchBox
