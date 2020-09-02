import React from 'react';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Projects from '../Projects';
import Navigator from '../Nav';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/Brandon_Icon.png';
import Particles from 'react-particles-js';

function Home() {
  return (
    <div>
      <div className="headSection">
        <Canvas />
        <HeadSection />
      </div>
      <Navigator />
      <div className="bodySection">
        <BodySection />
      </div>
      <div id='footSection'>
      <FootSection />
      </div>
    </div>
  );
}

function HeadSection() {
  return (
    <div id="titleText">
      <Row className="justify-content-md-center justify-content-sm-center">
        <SiteTitle />
      </Row>
    </div>
  );
}

function BodySection() {
  return (
    <div>
      <div>
        <Container>
          <Row>
            <About />
          </Row>
        </Container>
      </div>
      <div className="altdiv">
        <Container>
          <Row>
            <h2 id="projectSection">Projects</h2>
          </Row>
          <Row>
            <Projects />
          </Row>
        </Container>
      </div>
    </div>
  );
}

function FootSection(){
  return(
        <span>Brandon Treston <strong>©2020</strong></span>
  );
}

function SiteTitle() {
  return (
    <div className="siteTitle fadeIn">
      <h1>
        Hi, I'm <span id="name">Brandon Treston</span>.
      </h1>
      <h2>I'm a Full-Stack Developer And Tech Enthusiast.</h2>
    </div>
  );
}

function Logo() {
  return (
    <Image
      src={logo}
      alt="logo"
      width="300px"
      className="logo"
      roundedCircle
      fluid
    />
  );
}

function Canvas() {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 65,
          },
          links: {
            color: '#e6925a',
          },
          size: {
            value: 2,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
            onDiv: {
              elementId: 'titleText',
              mode: 'repulse',
              enable: true,
            },
          },
        },
      }}
    />
  );
}

function About() {
  return (
    <div id="about">
      <h2>About</h2>
      <br />
      <div className="div-flex">
        <div className="div-column">
          <Logo />
          <br />
          <strong>
            <h3>Summary</h3>
          </strong>
          <p>
            I'm a web developer and technologist based in NYC. I currently
            attend New York Tech and will be graduating in December of 2020.
          </p>
        </div>
        <div>
          <h4>Skills</h4>
          <ul>
            <li>
              <strong>Front-End: </strong>JavaScript (React, jQuery), Java,
              HTML5, CSS3, Bootstrap
            </li>
            <li>
              <strong>Back-End:</strong> Node.js, Express, SQL, MongoDB, Python,
              PHP
            </li>
            <li>
              <strong>Tools: </strong>HTTP, JSON, Webpack, Babel, REST, Git,
              npm, Google Cloud, AWS, IIS
            </li>
            <li>
              <strong>Miscellaneous: </strong>WordPress, Adobe Creative Suite,
              Microsoft Office, DNS, Eclipse
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
