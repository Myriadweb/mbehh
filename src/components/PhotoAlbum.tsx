import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import {Modal, Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import '../App.css';
import photos from '../assets/hh.json';
import {rootPath} from "../config";
import ReactPlayer from "react-player";
import {CSSTransition} from "react-transition-group";

function PhotoAlbum() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showKidsFacts, setShowKidsFacts] = React.useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const offset = 0.1;
  function PrevPhoto() {
    setZoomLevel(1);
    setZoomOffset(0);
    setCurrentPhotoIndex(currentPhotoIndex - 1);
  }
  function NextPhoto() {
    setZoomLevel(1);
    setZoomOffset(0);
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  }

  function PrevNextPhoto(direction: string) {
    setZoomLevel(1);
    setZoomOffset(0);
    setCurrentPhotoIndex(direction === 'next' ? currentPhotoIndex + 1 : currentPhotoIndex - 1);
  }
  function AddZoom() {
    const element = document.getElementById("Image");
    element?.classList.contains('Zoom') ? element?.classList.remove("Zoom") : element?.classList.add("Zoom");
  }
  const handleZoom = (event: any) => {
    const newZoomLevel = parseFloat(event.target.value);
    setZoomLevel(newZoomLevel);
    setZoomOffset((newZoomLevel - 1) * 10);
  }

  // @ts-ignore
  return (
    <div className='Container'>
      <div className="Header">
        <div className="Subtitle">400 Beacon St</div>
        <div className="Title">Historic Album of the Home</div>
      </div>
      <Link to={`${rootPath}`} className="HomeLink"><span>&#x25c0;</span> Back to Menu</Link>
      <div className="ImageContainer">
        <div className="PageNav">
          {currentPhotoIndex > 0 && (
            <div key={currentPhotoIndex} className="Prev">
              <Link onClick={() => PrevNextPhoto('prev')} to="#">Previous</Link>
            </div>
          )}
        </div>
        <div id="Image" className="Image">
          {photos.map((photo, index) => {
            return (
              <img
                src={require(`../assets/images/photo-album/${photo.IMAGE}`)}
                key={index}
                alt={`Photo ${index}`}
                className={index === currentPhotoIndex ? 'Current' : ''}
                style={{transform: `scale(${zoomLevel}) translateX(-${zoomOffset}%)`}}
              />
            )
          })}
        </div>
        <div className="PageNav">
          {currentPhotoIndex < photos.length && (
            <div key={currentPhotoIndex} className="Next">
              <Link onClick={() => PrevNextPhoto('next')} to="#">Next</Link>
            </div>
          )}
        </div>
      </div>
      <div className="ZoomContainer">
        <span>&ndash;</span>
        <input className="Zoom" type="range" min="1" max="3" step="0.1" value={zoomLevel} onChange={handleZoom}  />
        <span>+</span>
      </div>
      <div className="KidsFacts">
        <div className="acorn active" onClick={() => setShowKidsFacts(true)}>
          <img src={require('../assets/images/MBE_acorn.png')} alt="acorn" />
        </div>
        <div className={showKidsFacts ? "acorn-popup active" : "acorn-popup"} onClick={() => setShowKidsFacts(false)}>
          <div className="close"></div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>
      <div className="acorn">
        <img src={require('../assets/images/MBE_acorn.png')} alt="acorn" />
      </div>
    </div>

  );
}
export default PhotoAlbum;

