import React from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";

export default function FormTrain({ show, showModal }) {
  const handleClose = () => showModal(false);
  const [form, setForm] = React.useState({
    name: "",
    kelas: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async () => {
    try {
      const response = await API.post("/train", form);
      if (response.data.code === 200) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body>
          <Form onSubmit={() => handleSubmit.mutate()}>
            <p className="fs-3">Input Train</p>
            <FloatingLabel
              controlId="floatingInput"
              label="Train name"
              className="mb-3">
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Train name ..."
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Train Class">
              <Form.Control
                type="text"
                name="kelas"
                onChange={handleChange}
                placeholder="Train city"
              />
            </FloatingLabel>
            <Button
              type="submit"
              className="my-3 w-100"
              style={{ background: "#e67e22", borderColor: "#e67e22" }}>
              Add Train
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
