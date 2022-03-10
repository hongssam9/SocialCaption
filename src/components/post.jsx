import React from 'react';
import blackimage from "./img/black_image.png"

const post = () => {
    return (
        <div>
            <h3>Username</h3>
            <img src={blackimage} alt="" />
            <h4>Username: cpation</h4>
        </div>
    );
};

export default post;

/* OUTLINE
Header -> avatar + username
image
username + caption
*/