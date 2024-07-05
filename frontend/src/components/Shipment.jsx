import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Shipment = ({ shipment, quantity }) => {
  return (
    <Link to={`/shipment/${shipment.shipmentId}`}>
      <Card className='my-3 p-3 rounded' >
        <Card.Body>
            <strong>{shipment.shipmentId}</strong>
        </Card.Body>
        <p>Quantity: {quantity}</p>
      </Card>
    </Link>
  )
}

export default Shipment