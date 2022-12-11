import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Success from "./modal/success";

export default function Listticket() {
  const [showModal, setModal] = useState(false);
  return (
    <>
      <Container className="mb-5">
        {/* Header content */}
        <Card className="px-3 mb-4 border-0">
          <Row>
            <Col sm={3} className="text-center">
              Nama Kereta
            </Col>
            <Col sm={2}>Berangkat</Col>
            <Col sm={1}></Col>
            <Col sm={2}>Tiba</Col>
            <Col sm={2}>Dusari</Col>
            <Col sm={2}>Harga/pax</Col>
          </Row>
        </Card>
        {/* content */}
        <Card
          className="p-3 lh-1 mb-2 w-100"
          style={{ cursor: "pointer" }}
          onClick={() => setModal(true)}>
          <Row>
            <Col sm={3} className="text-center">
              <Card.Title>Anjasmoro</Card.Title>
              <Card.Text
                className="text-secondary"
                style={{ fontSize: "10pt" }}>
                Eksekutif(H)
              </Card.Text>
            </Col>
            <Col sm={2}>
              <Card.Title>05.00</Card.Title>
              <Card.Text
                className="text-secondary"
                style={{ fontSize: "10pt" }}>
                Gambir
              </Card.Text>
            </Col>
            <Col sm={1} className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ right: 0, top: 20 }}
              />
            </Col>
            <Col sm={2}>
              <Card.Title>15.00</Card.Title>
              <Card.Text
                className="text-secondary"
                style={{ fontSize: "10pt" }}>
                Surabaya
              </Card.Text>
            </Col>
            <Col sm={2}>
              <Card.Title>10J 05m</Card.Title>
            </Col>
            <Col sm={2}>
              <Card.Title style={{ color: "#0078b5" }}>Rp. 300,000</Card.Title>
            </Col>
          </Row>
        </Card>
      </Container>
      <Success show={showModal} showModal={setModal} />
    </>
  );
}
