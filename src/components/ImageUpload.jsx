import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { storage, db } from "../firebase"
import firebase from 'firebase/compat/app';
import './ImageUpload.css';
const ImageUpload = ({ username }) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (ev) => {
        if (ev.target.files[0]) {
            setImage(ev.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                /* Progress Function... */
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err) => {
                /* Error Function */
                console.log(err);
            },
            () => {
                /* Complete Function */
                storage.ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        /* post image inside db */
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className="imageupload">
            {/* 
      Caption Input 
      Caption Input
      File Picker
      Post Button
      */}
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder='Enter a caption...' onChange={ev => setCaption(ev.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <div className="imageupload__button" onClick= {handleUpload}><strong>+</strong></div>
        </div>
    );
};

export default ImageUpload;