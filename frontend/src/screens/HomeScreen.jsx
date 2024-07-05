import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeScreen = () => {

  return (
    <>
      <h1>Welcome</h1>
      <h5> If you refresh the page you have to login again</h5>
      <Row>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Link to={`/orders`} className="text-decoration-none">
            <Card className='my-3 p-3 rounded' >
              <Card.Body>
                <h4 className='text-center'>Orders</h4>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Link to={`/shipments`} className="text-decoration-none">
            <Card className='my-3 p-3 rounded' >
              <Card.Body>
                <h4 className='text-center'>Shipments</h4>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default HomeScreen