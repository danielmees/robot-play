import React from 'react';
import './Avatar.scss';

const Avatar = ({ type, avatarRef, response }) => {
    return <div ref={avatarRef} className={`avatar avatar--${type}`}>
        {response && <div>{response}</div>}
    </div>
}

export default Avatar;