import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Col, Row, Card, ListGroup, Button } from 'react-bootstrap'
import Invoice from '../components/Invoice'

const OrderScreen = () => {
  const [order, setOrder] = useState(null)
  const [showInvoice, setShowInvoice] = useState(false);


  const { id: orderId} = useParams()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        console.log(data)
        setOrder(data)
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrder(null);
      }
    }

    fetchOrders();

  }, [orderId])

  // const { billingDetails, orderItems, shipmentDetails } = order
  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  return (
    <>
      <Link to={'/'} className='btn btn-light my-3'>
        Go Back
      </Link>
      <Button onClick={toggleInvoice} className='btn btn-info my-3 text-white'>
        {showInvoice ? 'Hide Invoice' : 'Show Invoice'}
      </Button>
      {showInvoice && <Invoice order={order} />}
      {
      order !== null ? (
      <>
        <Row md={5}>
          <Col md={4}>
            <Card>
              <h4 className='text-center pt-2'>Billing Details</h4>
              <ListGroup variant='flush' className='lead'>
                <ListGroup.Item><strong>Name:</strong> {order.billingDetails?.firstName} {order.billingDetails?.surname }</ListGroup.Item>
                <ListGroup.Item><strong>Company:</strong> {order.billingDetails?.company}</ListGroup.Item>
                <ListGroup.Item><strong>BTW:</strong> {order.billingDetails?.vatNumber}</ListGroup.Item>
                <ListGroup.Item><strong>KVK:</strong> {order.billingDetails?.kvkNumber}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {order.billingDetails?.email}</ListGroup.Item>
                <ListGroup.Item><strong>Country:</strong> {order.billingDetails?.countryCode}</ListGroup.Item>
                <ListGroup.Item><strong>City:</strong> {order.billingDetails?.city}</ListGroup.Item>
                <ListGroup.Item><strong>Zipcode:</strong> {order.billingDetails?.zipCode}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {order.billingDetails?.streetName} {order.billingDetails?.houseNumber} {order.billingDetails?.houseNumberExtension}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <h4 className='text-center pt-2'>Shipment Details</h4>
              <ListGroup variant='flush'  className='lead'>
                <ListGroup.Item><strong>Name:</strong> {order.shipmentDetails?.firstName} {order.shipmentDetails?.surname }</ListGroup.Item>
                <ListGroup.Item><strong>Country:</strong> {order.shipmentDetails?.countryCode}</ListGroup.Item>
                <ListGroup.Item><strong>City:</strong> {order.shipmentDetails?.city}</ListGroup.Item>
                <ListGroup.Item><strong>Zipcode:</strong> {order.shipmentDetails?.zipCode}</ListGroup.Item>
                <ListGroup.Item><strong>Address:</strong> {order.shipmentDetails?.streetName} {order.shipmentDetails?.houseNumber} {order.shipmentDetails?.houseNumberExtension}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <h4 className='text-center pt-2'>Order Items: {order.orderItems?.length}</h4>
              {
                order.orderItems?.map( (item) => (
                  <ListGroup variant='flush' key={item.orderItemId}  className='lead'>
                    <ListGroup.Item><strong>Title:</strong> {item.product.title}</ListGroup.Item>
                    <ListGroup.Item><strong>Unit Price:</strong> €{item.unitPrice}</ListGroup.Item>
                    <ListGroup.Item><strong>Reference:</strong> {item.offer.reference}</ListGroup.Item>
                    <ListGroup.Item><strong>Item type:</strong> {item.offer?.reference.charAt(0).toLowerCase() === 'c' ? 'DVD' : 'Book'}</ListGroup.Item>
                    <ListGroup.Item><strong>Reference:</strong> {item.offer?.reference}</ListGroup.Item>
                    <ListGroup.Item><strong>BTW:</strong> {order.billingDetails?.countryCode}</ListGroup.Item>
                    <ListGroup.Item>
                      <strong>BTW: </strong>
                      {
                        item.offer?.reference.charAt(0).toLowerCase() !== 'c' // c or C it applies both of them
                          ? (order.billingDetails?.countryCode === 'BE' ? '%6' : '%9') 
                          : '%21'
                      }
                    </ListGroup.Item>
                  </ListGroup>
                  )
                )
              }
            </Card>
          </Col>
        </Row>
      </>) :
      <strong>No order found</strong>
    }
    </>
  )
}

export default OrderScreen