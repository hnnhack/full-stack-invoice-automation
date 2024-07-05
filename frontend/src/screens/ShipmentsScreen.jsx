import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Shipment from '../components/Shipment'

const ShipmentsScreen = () => {
  const [shipments, setShipments] = useState([])

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const { data } = await axios.get('/api/shipments');
        setShipments(data.shipments)
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    }

    fetchShipments();

  }, [])

  return (
    <>
      <h1>Shipments list</h1>
      <h5>Total Shipments: {shipments.length}</h5>
      <Row>
        {shipments.length > 0 ? (
          shipments.map(shipment => (
            <Col key={shipment.shipmentId} sm={12} md={6} lg={4} xl={3}>
              <Shipment shipment={shipment} quantity={shipment.shipmentItems.length} />
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

export default ShipmentsScreen