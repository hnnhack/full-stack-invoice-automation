import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from './AuthContext';
import logo from '../assets/images/logo.png';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <Navbar bg='light' variant='light' expand='md' collapseOnSelect className="navbar-orange">
        <Container>
          <NavLink to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                alt='Logo'
                style={{ height: '60px', marginRight: '10px' }}
              />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {isAuthenticated && 
              <>
                <NavLink to='/orders' className='nav-link menu-item'>
                  Orders
                </NavLink>
                <NavLink to='/shipments' className='nav-link menu-item'>
                  Shipments
                </NavLink>
                <LogoutButton />
              </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
