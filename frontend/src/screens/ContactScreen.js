import React, { useState } from "react";
import axios from "axios";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import contact from "../image/contact.png";

const ContactScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await axios.post("/api/contacts", { name, email, message });
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setLoading(false);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Share your query and ideas with us!</p>
      </div>
      <Row>
        <Col md={6}>
          <img className="d-block w-100" src={contact} alt="contact-img" />
        </Col>
        <Col md={6}>
          <FormContainer>
            {loading && <Loader />}
            {success && (
              <Message variant="success">
                Your message has been sent successfully
              </Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>
                  <i className="fas fa-user"></i> Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>
                  <i className="fas fa-envelope-square"></i> Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="text">
                <Form.Label>
                  <i className="fas fa-pen"></i> Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your message"
                  value={message}
                  required
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="signin-btn"
                disabled={loading}
                block
              >
                Send
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
      <Row>
        <Col className="contact-end">
          <h6>Address</h6>
          <p>
            Uttura <br />
            Dhaka-1229
          </p>
        </Col>
        <Col className="contact-end">
          <h6>Phone</h6>
          <p>+########</p>
        </Col>
        <Col className="contact-end">
          <h6>Email</h6>
          <p>onlinesp@gmail.com</p>
        </Col>
      </Row>
    </div>
  );
};

export default ContactScreen;
