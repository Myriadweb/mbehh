import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootPath } from "./config";
import './App.css';
import Home from './components/Home';
import PhotoAlbum from "./components/PhotoAlbum";
import Video from "./components/Video";
import {CSSTransition, TransitionGroup} from "react-transition-group";
function App() {
  let location = useLocation();
  return (
    <div className="App">
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
            <Routes>
              <Route path={rootPath} element={<Home />} />
              <Route path={`${rootPath}/album`} element={<PhotoAlbum />} />
              <Route path={`${rootPath}/video/:id`} element={<Video />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
    </div>
  );
}

export default App;
