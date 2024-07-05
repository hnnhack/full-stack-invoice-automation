import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Order = ({ order, quantity, quantityShipped }) => {
  return (
    <Link to={`/order/${order.orderId}`}>
      <Card className='my-3 p-3 rounded' >
        <Card.Body>
            <strong>{order.orderId}</strong>
        </Card.Body>
        <p>Quantity: {quantity}</p>
      </Card>
    </Link>
  )
}

export default Order