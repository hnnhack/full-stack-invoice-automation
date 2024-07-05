import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../components/AuthContext';
import '../assets/styles/index.css';

const LoginScreen = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useRef(null);

  const handleChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    // Add hyphens
    const formattedValue = value
      .replace(/(.{4})/g, '$1-')
      .slice(0, value.length + Math.floor(value.length / 4) - (value.length % 4 === 0 ? 1 : 0));

    setInput(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const strippedInput = input.replace(/-/g, '');
    const correctPassword = 'FOFOGWELCOME'
    // const correctPassword = process.env.PASS_CODE
    console.log(process.env)

    if (strippedInput === correctPassword) {
      login();
      navigate('/');
    } else {
      setError('Invalid pass code');
      if (formRef.current) {
        formRef.current.classList.add('shake');
        setTimeout(() => {
          formRef.current.classList.remove('shake');
        }, 500);
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Form.Group controlId="password">
              <Form.Label>PASS CODE</Form.Label>
              <Form.Control
                type="text"
                value={input}
                onChange={handleChange}
                maxLength="14" // 12 characters + 2 hyphens
                placeholder="Enter password"
              />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;