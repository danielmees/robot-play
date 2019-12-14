import React from 'react';
import './Button.scss';

const Button = ({ label, type }) => {
    return <button className={`btn btn--${type}`}>{label}</button>
}

export default Button;