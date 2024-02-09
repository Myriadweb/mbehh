import React, { useEffect } from 'react';
import {Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootPath } from "./config";
import './App.css';
import Home from './components/Home';
import PhotoAlbum from "./components/PhotoAlbum";
import Video from "./components/Video";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ReactPlayer from "react-player";
function App() {
  useEffect(() => {
    document.title = "House History";
  })
  let location = useLocation();
  const timeoutRef = React.useRef(null);
  const navigate = useNavigate();
  const TIME_TO_SPLASH = 180000;
  const handleResetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      navigate(rootPath);
    }, TIME_TO_SPLASH);
  };
  return (
    <div className="App" onClick={() => handleResetTimeout()}>
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
            <Routes>
              <Route path={rootPath} element={<Splash />} />
              <Route path={`${rootPath}/home`} element={<Home />} />
              <Route path={`${rootPath}/album`} element={<PhotoAlbum />} />
              <Route path={`${rootPath}/video/:id`} element={<Video />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    </div>
  );
}

function Splash() {
  return (
    <Link to={`${rootPath}/home`}>
      <ReactPlayer url={require('../src/assets/hh_intro.webm')} playing={true} muted={true} loop={true} controls={false} height={1080} width={1920} />
    </Link>
  )
}

export default App;
