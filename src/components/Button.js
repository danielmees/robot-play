import React from 'react';
import './Button.scss';

const Button = ({ label, type, handleClick }) => {
    return <button 
        className={`btn btn--${type}`}
        onClick={() => handleClick()}
        >
        {label}
    </button>
}

export default Button;