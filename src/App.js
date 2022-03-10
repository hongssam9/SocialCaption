import "./App.css";
import logo from "./components/img/blue_image.png";
import Post from "./components/post.jsx"

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="logo" />
      </div>
      <h1> hello world</h1>
      <Post />
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
