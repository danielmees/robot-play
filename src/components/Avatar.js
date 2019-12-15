import React from 'react';
import './Avatar.scss';

const Avatar = ({ type, avatarRef, sadResponse = '', happyResponse = '', hidden = false }) => {
    // hide the crown when robot is at the same place
    const AvatarClass = `avatar avatar--${type} ${(hidden) ? 'hidden' : ''}`;
    return <div ref={avatarRef} className={AvatarClass}>
        {sadResponse.length > 0 && <div className="avatar__response avatar__response--sad">{sadResponse}</div>}
        {happyResponse.length > 0 && <div className="avatar__response avatar__response--happy">{happyResponse}</div>}
    </div>
}

export default Avatar;