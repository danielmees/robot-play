import React from 'react';
import './Avatar.scss';

const Avatar = ({ type, response }) => {
    return <div className={`avatar avatar--${type}`}>
        {response && <div>{response}</div>}
    </div>
}

export default Avatar;