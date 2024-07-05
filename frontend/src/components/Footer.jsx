import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="navbar-orange">
      <Container>
        <Row>
          <Col className='text-center py-3 text-white'>
            <p>MijnApp &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer