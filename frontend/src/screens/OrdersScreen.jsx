import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Order from '../components/Order'

const OrdersScreen = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data.orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrders();

  }, [])

  return (
    <>
      <h1>Orders list</h1>
      <h5>Total Orders: {orders.length}</h5>
      <Row>
        {orders.length > 0 ? (
          orders.map(order => (
            <Col key={order.orderId} sm={12} md={6} lg={4} xl={3}>
              <Order order={order} quantity={order.orderItems.length} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No API connection or No order...</p>
          </Col>
        )}
      </Row>
    </>
  )
}

export default OrdersScreen