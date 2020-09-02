import React, { useState, useEffect, useRef } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './index.scss';

function Navigator() {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
      <div id="navigator" className="sticky-inner">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <div className="navLinks">
                <span
                  onClick={() =>
                    document.getElementById('tsparticles').scrollIntoView()
                  }
                >
                  Home
                </span>
                <span
                  onClick={() =>
                    document.getElementById('about').scrollIntoView()
                  }
                >
                  About
                </span>
                <span
                  onClick={() =>
                    document.getElementById('projectSection').scrollIntoView()
                  }
                >
                  Projects
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
export default Navigator;
