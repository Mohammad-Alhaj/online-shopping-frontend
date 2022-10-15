import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import cookie from "react-cookies";

export default function UpdateCards({ data, id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const discRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = () => {
    const sendData = {
      id: id,
      title: titleRef.current.value,
      description: discRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
      userID: cookie.load("userID"),
    };
    data(sendData);
  };

  return (
    <>
      <i className="fa-solid fa-pen-to-square" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your title"
                autoFocus
                ref={titleRef}
              />
            </Form.Group>
            {/* *****************  */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="ex 10$" ref={priceRef} />
            </Form.Group>
            {/* *****************  */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Image</Form.Label>
              <Form.Control type="text" placeholder="http//" ref={imageRef} />
            </Form.Group>
            {/* *****************  */}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Disruption</Form.Label>
              <Form.Control as="textarea" rows={3} ref={discRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
