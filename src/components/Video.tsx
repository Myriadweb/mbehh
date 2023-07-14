import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import { Routes, Route, Link, useParams, To} from 'react-router-dom';
import {Modal, Tooltip, OverlayTrigger} from "react-bootstrap";
import '../App.css';
import {rootPath} from "../config";

const videoList = [
  {id: 1, title: "1907 Expansion", video: "MBE_FOW_Attract2.mp4"},
  {id: 2, title: "1908 Expansion", video: "MBE_FOW_Attract2.mp4"},
  {id: 3, title: "2015-2023 Expansion", video: "MBE_FOW_Attract2.mp4"}]
function Video() {
  const videoParams = useParams();
  // @ts-ignore
  const videoIndex = videoList.findIndex((data) => data.id === +videoParams?.id);
  const nextVideo = videoList[videoIndex + 1];
  const prevVideo = videoList[videoIndex - 1];
  const [showKidsFacts, setShowKidsFacts] = React.useState(false);
  return (
    <div className='Container'>
      <div className="Header">
        <div className="Subtitle">400 Beacon St</div>
        <div className="Title">{videoList[videoIndex].title}</div>
      </div>
      <Link to={`${rootPath}`} className="HomeLink"><span>&#x25c0;</span> Back to Menu</Link>
      <div className="VideoContainer">
        <div className="PageNav">
          {prevVideo && (
            <div key={prevVideo.id} className="Prev">
              <Link to={`${rootPath}/video/${prevVideo.id}`} onClick={() => setShowKidsFacts(false)}>{prevVideo.title}</Link>
            </div>
          )}
        </div>
        <ReactPlayer url={require(`../assets/videos/${videoList[videoIndex].video}`)} playing={true} controls={true} width={1440} height={810} />
        <div className="PageNav">
          {nextVideo && (
            <div key={nextVideo.id} className="Next">
              <Link to={`${rootPath}/video/${nextVideo.id}`} onClick={() => setShowKidsFacts(false)}>{nextVideo.title}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Video;

