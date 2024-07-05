import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

let accessToken = null;
let tokenExpiration = 0;

const getAccessToken = async () => {
  try {
    if (!accessToken || Date.now() >= tokenExpiration) {
    const apiUrl = process.env.ACCESS_URL
    const credentials = process.env.ACCESS_CREDENTIALS
    
    const requestData = {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post(apiUrl, null, requestData);

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + 600000;

    }
    return accessToken;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

// Get All Orders
const getAllOrders = async () => {
  try {
      const accessToken = await getAccessToken();

      const apiUrl = `${process.env.BASE_URL}/orders?fulfilment-method=FBR&status=ALL`
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.retailer.v10+json',
      };
      const response = await axios.get(apiUrl, { headers });

      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

// Get Order By Id
const getOrderById = async (orderId) => {
  try {
      const accessToken = await getAccessToken();

      const apiUrl = `${process.env.BASE_URL}/orders/${orderId}`
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.retailer.v10+json',
      };
      const response = await axios.get(apiUrl, { headers });
      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

// Get All List of Invoice Request
const getInvoiceRequest = async () => {
  try {
      const accessToken = await getAccessToken();

      const apiUrl = `${process.env.BASE_URL}/shipments/invoices/requests`
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.retailer.v10+json',
      };
      const response = await axios.get(apiUrl, { headers });

      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

// Get All Shipments
const getAllShipments = async () => {
  try {
      const accessToken = await getAccessToken();

      const apiUrl = `${process.env.BASE_URL}/shipments?fulfilment-method=FBR`
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.retailer.v10+json',
      };
      const response = await axios.get(apiUrl, { headers });

      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

// Get Shipment By Id
const getShipmentById = async (shipmentId) => {
  try {
      const accessToken = await getAccessToken();

      const apiUrl = `${process.env.BASE_URL}/shipments/${shipmentId}`
      const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.retailer.v10+json',
      };
      const response = await axios.get(apiUrl, { headers });
      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Log the error response if a 401 error occurs
      console.error('Token request failed with status 401:', error.response.data);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
    throw new Error('Failed to obtain access token');
  }
}

export { getAllOrders, getOrderById, getInvoiceRequest, getAllShipments, getShipmentById };