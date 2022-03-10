import React, { useState, useEffect } from 'react';
import "./App.css";
import { db } from './firebase';
import logo from "./components/img/blue_image.png";
import Post from "./components/post.jsx";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /* Where code runs */
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    }) /* Every single time a document adds, changes, modified, run this code */
  }, []); /* []when blank, runs once and not run again. When "posts" in there, runs everytime the variable posts change */

  const signup = (ev) => {

  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)} /* everyime i press outside of modal, it'll close */
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            I am a modal
          </Typography>
        </Box>

      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="logo" />
      </div>

      <Button onClick={() => setOpen(true)}>Sign up</Button>

      <h1> hello world</h1>

      {/* To map out (list) all posts without having to hardcode posts */}
      {posts.map(({ id, post }) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
}

export default App;

/* Objectives */
/*
--Outline-- 
- Header
- Bunch of Posts

*/
