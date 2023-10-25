import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import '../App.css';
import photos from '../assets/hh.json';
import {rootPath} from "../config";

function PhotoAlbum() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
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
    console.log('zoomLevel', zoomLevel);
  }

  return (
    <div className='Container'>
      <div className="Header" style={{marginBottom: 20}}>
        <div className="Subtitle">400 Beacon Street</div>
        <div className="Title">Historic Album of the Home</div>
      </div>
      <div className="Intro" style={{marginBottom: 20}}>Mary Baker Eddy’s handyman John Salchow published these photographs in a 1911 “souvenir album.”</div>
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
    </div>

  );
}
export default PhotoAlbum;

