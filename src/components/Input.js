import React from 'react';
import './Input.scss';

const Input = ({ placeholder, onChange, value }) => {
    return <input 
        type='number'
        className="number-input"
        placeholder={placeholder}
        onChange={(evt) => onChange(evt)}
        value={value === false ? '' : value.toString()}
    /> 
}

export default Input;