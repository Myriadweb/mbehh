import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import {TransformWrapper, TransformComponent, ReactZoomPanPinchRef} from "react-zoom-pan-pinch";
import '../App.css';
import photos from '../assets/hh.json';
import {rootPath} from "../config";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {zoomIn} from "react-zoom-pan-pinch/dist/src/core/handlers/handlers.logic";

function PhotoAlbum() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photoCount = photos.length;
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOffset, setZoomOffset] = useState(0);
  const offset = 0.1;
  const [startCoords, setStartCoords] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const Image = React.useRef<HTMLDivElement>(null)
  const ImageWrapper = React.useRef<ReactZoomPanPinchRef>(null)
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
    ImageWrapper.current?.setTransform(0, 0, 1);
    setCurrentPhotoIndex(direction === 'next' ? currentPhotoIndex + 1 : currentPhotoIndex - 1);
  }
  function AddZoom() {
    Image.current?.classList.contains('Zoom') ? Image.current?.classList.remove("Zoom") : Image.current?.classList.add("Zoom");
  }
  const handleZoom = (event: any) => {
    const newZoomLevel = parseFloat(event.target.value);
    setZoomLevel(newZoomLevel);
    setZoomOffset((newZoomLevel - 1) * 10);
    ImageWrapper.current?.centerView(zoomLevel - .1);
    console.log('zoomLevel', zoomLevel);
  }

  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - .1);
      ImageWrapper.current?.centerView(zoomLevel);
      console.log('zoomLevel', zoomLevel);
    }
  }

  const zoomIn = () => {
    setZoomLevel(zoomLevel + .1);
    ImageWrapper.current?.centerView(zoomLevel);
    console.log('zoomLevel', zoomLevel);
  }


  return (
    <div className='Container'>
      <div className="Header" style={{marginBottom: 20}}>
        <div className="Subtitle">400 Beacon Street</div>
        <div className="Title">Historic Album of the Home</div>
      </div>
      <div className="Intro" style={{marginBottom: 20}}>Mary Baker Eddy’s handyman John Salchow published these photographs in a 1911 “souvenir&nbsp;album.”
        Pinch and drag, or use the controls below, to zoom and pan around the photo album.</div>
      <Link to={`${rootPath}/home`} className="HomeLink"><span>&#x25c0;</span> Back to Menu</Link>
      <div className="ImageContainer">
        <div className="PageNav">
          {currentPhotoIndex > 0 && (
            <div key={currentPhotoIndex} className="Prev">
              <Link onClick={() => PrevNextPhoto('prev')} to="#">Previous</Link>
            </div>
          )}
        </div>
        <div className="ImageTransformContainer">
          <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} ref={ImageWrapper}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <TransformComponent>
                  <AlbumImage image={photos[currentPhotoIndex].IMAGE} />
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
          <div className="ImageCount" style={{marginTop: 20}}>{currentPhotoIndex+1} of {photoCount}</div>
        </div>
        <div className="PageNav">
          {currentPhotoIndex < photos.length-1 && (
            <div key={currentPhotoIndex} className="Next">
              <Link onClick={() => PrevNextPhoto('next')} to="#">Next</Link>
            </div>
          )}
        </div>
      </div>
      <div className="ZoomContainer" style={{marginTop: 50}}>
        <span id="zoomOut" className="zoomControls" onClick={zoomOut}>&ndash;</span>
        <input className="Zoom" type="range" min="1" max="3" step=".05" value={zoomLevel} onChange={handleZoom}  />
        <span id="zoomIn" className="zoomControls" onClick={zoomIn}>+</span>
      </div>
    </div>
  );
}

function AlbumImage({image}: {image: string}) {
  return (
    <div className="Image" key={image}>
      <img
        src={require(`../assets/images/photo-album/${image}`)}
        alt={`Photo ${image}`}
        className="Current"
        id="AlbumPhoto"
        style={{position: 'relative'}}
      />
    </div>
  )
}
export default PhotoAlbum;

