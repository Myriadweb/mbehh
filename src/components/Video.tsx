import React from 'react';
import ReactPlayer from "react-player";
import { Routes, Route, Link, useParams, To} from 'react-router-dom';
import '../App.css';
import {rootPath} from "../config";
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap";

const videoList = [
  {id: 1, title: "1907 Expansion", video: "mbe_1907.mp4"},
  {id: 2, title: "1908 Expansion", video: "mbe_1908.mp4"},
  {id: 3, title: "2015-2023 Expansion", video: "mbe_1907.mp4"}
]
function Video() {
  const videoParams = useParams();
  // @ts-ignore
  const videoIndex = videoList.findIndex((data) => data.id === +videoParams?.id);
  const nextVideo = videoList[videoIndex + 1];
  const prevVideo = videoList[videoIndex - 1];
  const [expVideo, setExpVideo] = React.useState(videoList[videoIndex].video);
  const setVideo = (video: string) => {
    setExpVideo(video);
  }
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
              <Link to={`${rootPath}/video/${prevVideo.id}`}>{prevVideo.title}</Link>
            </div>
          )}
        </div>
        <div className="Video">
          {videoIndex === 2 && (
            <>
              <ReactPlayer url={require(`../assets/videos/${expVideo}`)} playing={true} controls={true} width={1440} height={810} />
              <ToggleButtonGroup type="radio" name="options" defaultValue={0} className="ExpansionButtons">
                <ToggleButton id="tbg-radio-1" value={0} active={expVideo === "mbe_1907.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Preservation</ToggleButton>
                <ToggleButton id="tbg-radio-2" value={1} active={expVideo === "vid2.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Entrance</ToggleButton>
                <ToggleButton id="tbg-radio-3" value={2} active={expVideo === "vid3.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Utilities</ToggleButton>
                <ToggleButton id="tbg-radio-4" value={3} active={expVideo === "vid4.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Interior</ToggleButton>
                <ToggleButton id="tbg-radio-5" value={4} active={expVideo === "vid5.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Furnishings</ToggleButton>
                <ToggleButton id="tbg-radio-6" value={5} active={expVideo === "vid6.mp4"} onClick={() => setExpVideo("mbe_1907.mp4")}>Landscaping</ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
          {videoIndex < 2 && (
            <ReactPlayer url={require(`../assets/videos/${videoList[videoIndex].video}`)} playing={true} controls={true} width={1440} height={810} />
          )}
        </div>
        <div className="PageNav">
          {nextVideo && (
            <div key={nextVideo.id} className="Next">
              <Link to={`${rootPath}/video/${nextVideo.id}`}>{nextVideo.title}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Video;

