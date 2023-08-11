import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import {rootPath} from "../config";

function Home() {
    return (
      <div className="Container HomeContainer">
        <div className="HomeHeader">
          <div className="Subtitle">400 Beacon St</div>
          <div className="Title">History of the House</div>
          <div className="Intro">Watch these videos to learn about major renovations and restoration work spanning more than a century.</div>
        </div>
        <div className="Content">
          <CardGroup className="videos">
            <Card>
              <Link to={`${rootPath}/video/1`}>
                <Card.Img variant="top" src={require('../assets/images/video1_thumb.png')} alt="..." />
                <Card.Body>
                  <Card.Title>1907 Expansion</Card.Title>
                </Card.Body>
              </Link>
            </Card>
            <Card>
              <Link to={`${rootPath}/video/2`}>
                <Card.Img variant="top" src={require('../assets/images/video2_thumb.png')} alt="..." />
                <Card.Body>
                  <Card.Title>1908 Expansion</Card.Title>
                </Card.Body>
              </Link>
            </Card>
            <Card>
              <Link to={`${rootPath}/video/3`}>
                <Card.Img variant="top" src={require('../assets/images/video3_thumb.png')} alt="..." />
                <Card.Body>
                  <Card.Title>2015-2023 Expansion</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </CardGroup>
          <div className="separator"></div>
          <Link to={`${rootPath}/album`} style={{textDecoration: 'none'}}>
            <div className="album">
              <img src={require('../assets/images/photo-album/MBE_HH_04.png')} alt="..." />
              <div className="album-title">
                Explore a book of <br />historic photographs
                <img src={require('../assets/images/MBE_arrow_white.png')} alt="arrow" />
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}
export default Home;

