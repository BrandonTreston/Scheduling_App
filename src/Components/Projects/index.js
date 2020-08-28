import React, {useState} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';

function Projects() {
    return (
      <Container>
        <Row className="projects">
          <Col>
            <Project
              href="http://brandontreston.com:81/#Bard/"
              text="BARD"
              src={require('../../assets/Project4.png')}
            />
          </Col>
          <Col>
            <Project
              href="https://github.com/BrandonTreston/PyWebScrapper/tree/Development/env"
              text="PyWebScraper"
              src={require('../../assets/project5.png')}
            />
          </Col>
          <Col>
            <Project
              href="http://www.fildoux.com/"
              text="Fil Doux"
              src={require('../../assets/project1.png')}
            />
          </Col>
        </Row>
        <Row className="projects">
        <Col>
            {' '}
            <Project
              href="http://ny1920.com"
              text="New York 1920"
              src={require('../../assets/project2.png')}
            />
          </Col>
          <Col>
            <Project
              href="https://github.com/ImChurch/CPUScheduling/tree/master/src"
              text="CPU Simulation"
              src={require('../../assets/project3.png')}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
  
  function Project(props) {
    const [visibility, setVisibility] = useState(false);
    const [fade, setFade] = useState(false);
  
    function hide() {
      setVisibility(false);
      setFade(false);
    }
    function show() {
      setVisibility(true);
      setFade(true);
    }
  
    let style1 = {};
    let style2 = {};
    if (!visibility && !fade) {
      style1.filter = 'brightness(100%)';
      style2.display = 'none';
    } else {
      style1.filter = 'brightness(25%)';
      style2.display = 'block';
    }
  
    return (
      <div className="projectWrapper" onMouseLeave={hide} onMouseEnter={show}>
        <a href={props.href} class="project">
          <span class="projectThumb" style={style1}>
            <Image src={props.src} roundedCircle fluid />
          </span>
          <h3 style={style2} className="projectLink">
            {props.text}
          </h3>
        </a>
      </div>
    );
  }

  export default Projects;