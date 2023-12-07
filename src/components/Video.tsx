import React, {useRef, useState, MutableRefObject, Dispatch, SetStateAction} from 'react';
import ReactPlayer from "react-player";
import { Routes, Route, Link, useParams, To} from 'react-router-dom';
import '../App.css';
import {rootPath} from "../config";
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap";
const videoList = [
  {id: 1, title: "1907 Expansion", video: "mbe_1907.mp4"},
  {id: 2, title: "1908 Renovation", video: "mbe_1908.mp4"},
  {id: 3, title: "2015-2023 Expansion", video: "mbe_2015_project_overview.mp4"}
]

type ControlsProps = {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  playedSeconds: number;
  duration: number;
  playerRef: MutableRefObject<ReactPlayer>;
};


const Controls = (props: ControlsProps) => {
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.playerRef.current.seekTo(+e.target.value, "seconds");
  };
  const Play = () => {
    return (
      <img src={require('../assets/images/video/MBE_HH_play.png')} alt="play" />
    )
  }
  const Pause = () => {
    return (
      <img src={require('../assets/images/video/MBE_HH_pause.png')} alt="pause" />
    )
  }
  return (
    <div className="Controls">
      <button onClick={() => props.setPlaying(!props.playing)}>
        {props.playing ? <Pause /> : <Play />}
      </button>
      <input
        className="Zoom"
        type="range"
        value={props.playedSeconds}
        min="0"
        max={props.duration}
        onChange={seek}
      />
    </div>
  )
}

function Video() {
  const videoParams = useParams();
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  // @ts-ignore
  const videoIndex = videoList.findIndex((data) => data.id === +videoParams?.id);
  const nextVideo = videoList[videoIndex + 1];
  const prevVideo = videoList[videoIndex - 1];
  const [expVideo, setExpVideo] = React.useState(videoList[videoIndex].video);
  const [showStillImage, setShowStillImage] = React.useState(false);
  const EndStillImage = () => {
    return (
      <div id="EndStillImage" className={`StillImage ${showStillImage ? 'active' : ''}`}>
        <img src={require('../assets/images/video/MBE_HH_endstill.jpg')} alt="this" />
        <div className="ReplayVideo" onClick={() => {setShowStillImage(false); setPlaying(true)}}>
          <img src={require('../assets/images/video/MBE_HH_replay.png')} />
        </div>
      </div>
    )
  }
  const setVideo = (video: string) => {
    setExpVideo(video);
  }
  return (
    <div className='Container'>
      <div className="Header">
        <div className="Subtitle">400 Beacon Street</div>
        <div className="Title">{videoList[videoIndex].title}</div>
      </div>
      <Link to={`${rootPath}/home`} className="HomeLink"><span>&#x25c0;</span> Back to Menu</Link>
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
            <div className="MultiVideo">
              <ReactPlayer
                ref={playerRef}
                url={require(`../assets/videos/${expVideo}`)}
                controls={false}
                width={1440}
                height={810}
                playing={playing}
                onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
                onSeek={setPlayedSeconds}
                onDuration={setDurationSeconds} // This is called when the player has the duration
                onEnded={() => {setShowStillImage(true); setPlaying(false)}}
              />
              <Controls
                playerRef={playerRef}
                playing={playing}
                setPlaying={setPlaying}
                playedSeconds={playedSeconds}
                duration={durationSeconds}
              />
              <EndStillImage />
              <ToggleButtonGroup type="radio" name="options" defaultValue={0} className="ExpansionButtons">
                <ToggleButton id="tbg-radio-1" value={0} active={expVideo === "mbe_2015_project_overview.mp4"} onClick={() => {setExpVideo("mbe_2015_project_overview.mp4"); setPlaying(true)}}>Project Overview</ToggleButton>
                <ToggleButton id="tbg-radio-2" value={1} active={expVideo === "mbe_2015_systems_upgraded.mp4"} onClick={() => {setExpVideo("mbe_2015_systems_upgraded.mp4"); setPlaying(true)}}>Systems Upgraded</ToggleButton>
                <ToggleButton id="tbg-radio-3" value={2} active={expVideo === "mbe_2015_porches_rebuilt.mp4"} onClick={() => {setExpVideo("mbe_2015_porches_rebuilt.mp4"); setPlaying(true)}}>Porches Rebuilt</ToggleButton>
                <ToggleButton id="tbg-radio-4" value={3} active={expVideo === "mbe_2015_basement_transformed.mp4"} onClick={() => {setExpVideo("mbe_2015_basement_transformed.mp4"); setPlaying(true)}}>Basement Transformed</ToggleButton>
                <ToggleButton id="tbg-radio-5" value={4} active={expVideo === "mbe_2015_rooms_restored.mp4"} onClick={() => {setExpVideo("mbe_2015_rooms_restored.mp4"); setPlaying(true)}}>Rooms Restored</ToggleButton>
                <ToggleButton id="tbg-radio-6" value={5} active={expVideo === "mbe_2015_carriage_house.mp4"} onClick={() => {setExpVideo("mbe_2015_carriage_house.mp4"); setPlaying(true)}}>Carriage House</ToggleButton>
              </ToggleButtonGroup>
            </div>
          )}
          {videoIndex < 2 && (
            <>
              <ReactPlayer
                ref={playerRef}
                url={require(`../assets/videos/${videoList[videoIndex].video}`)}
                playing={playing}
                controls={false}
                width={1440}
                height={810}
                onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
                onSeek={setPlayedSeconds}
                onDuration={setDurationSeconds} // This is called when the player has the duration
                onEnded={() => {setShowStillImage(true); setPlaying(false)}}

              />
              <Controls
                playerRef={playerRef}
                playing={playing}
                setPlaying={setPlaying}
                playedSeconds={playedSeconds}
                duration={durationSeconds}
              />
              <EndStillImage />
            </>
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

