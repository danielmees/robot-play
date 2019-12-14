import React from 'react';
import './Avatar.scss';

const Avatar = ({ type, avatarRef, response = '' }) => {
    return <div ref={avatarRef} className={`avatar avatar--${type}`}>
        {response.length > 0 && <div className="avatar__response avatar__response--sad">{response}</div>}
    </div>
}

export default Avatar;