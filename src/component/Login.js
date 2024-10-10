
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, setRegister] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/register')
      .then(response => {
        setRegister(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const user = register.find(user => user.username === username && user.password === password);

    if (user) {
      navigate('/home');
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGuestLogin = () => {
    navigate('/guest');
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Button variant="secondary" onClick={handleGuestLogin} style={{ marginTop: '10px' }}>
            Login as Guest
          </Button>
          <Button variant="secondary" onClick={handleRegister} style={{ marginTop: '10px' }}>
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
