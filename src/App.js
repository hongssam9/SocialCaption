import React, { useState, useEffect } from 'react';
import "./App.css";
import { db, auth } from './firebase';
import logo from "./components/img/SoCap.png";
import Post from "./components/Post.jsx";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'
import ImageUpload from './components/ImageUpload.jsx'

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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        /* USER HAS LOGGED IN  */
        console.log(authUser);
        setUser(authUser);
      } else {
        /* USER HAS LOGGED OUT */
        setUser(null);
      }
    })
    return () => {
      // performo cleanup actions
      unsubscribe();
    }
  }, [user, username]) /* anytime  they change, have to be fired off*/

  useEffect(() => {
    /* Where code runs */
    db.collection('posts')/* .orderBy('timestamp', 'desc') */.onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    }) /* Every single time a document adds, changes, modified, run this code */
  }, []); /* []when blank, runs once and not run again. When "posts" in there, runs everytime the variable posts change */

  const signUp = (ev) => {
    ev.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => alert(err.message))
  }

  const signIn = (ev) => {
    ev.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      {/* Sign Up */}
      <Modal
        open={open}
        onClose={() => setOpen(false)} /* everyime i press outside of modal, it'll close */
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className="app__signup">
              <center>
                <img className="app__headerImage" src={logo} alt="logo" />
              </center>

              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
      {/* End Sign Up */}

      {/* Logout / Sign In */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)} /* everyime i press outside of modal, it'll close */
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className="app__signup">
              <center>
                <img className="app__headerImage" src={logo} alt="logo" />
              </center>

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
      {/* End Sign In / Login */}

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="logo" />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {/* To map out (list) all posts without having to hardcode posts */}
        {posts.map(({ id, post }) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))}
      </div>

      {/* <InstagramEmbed
        url='https://www.instagram.com/p/CX6lB94p9Tk/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => { }}
        onSuccess={() => { }}
        onAfterRender={() => { }}
        onFailure={() => { }}
      /> */}

     

      {user?.displayName ? ( 
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className="app__post-error">Login to Upload & Comment</h3>
      )}
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
