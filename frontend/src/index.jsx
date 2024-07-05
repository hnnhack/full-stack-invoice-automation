import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/styles/bootstrap.min.css'
import './assets/styles/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import OrdersScreen from './screens/OrdersScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import ShipmentsScreen from './screens/ShipmentsScreen';
import ShipmentScreen from './screens/ShipmentScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginScreen />} />
      <Route 
        index 
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/order/:id' 
        element={
          <ProtectedRoute>
            <OrderScreen />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/orders' 
        element={
          <ProtectedRoute>
            <OrdersScreen />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/shipments' 
        element={
          <ProtectedRoute>
            <ShipmentsScreen />
          </ProtectedRoute>
        }
      />
      <Route 
        path='/shipment/:id' 
        element={
          <ProtectedRoute>
            <ShipmentScreen />
          </ProtectedRoute>
        }
      />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
