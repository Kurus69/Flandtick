import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faIdCard,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Card, Modal, Row, Col, Image, Stack, Table } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Logo from "../../assets/image/logo1.png";
import Moment from "react-moment";

export default function Detail({ show, showDetail, data }) {
  const handleClose = () => showDetail(false);
  var randomstring = require("randomstring");

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <Card>
            <CardHeader>
              <Row>
                <Col style={{ lineHeight: 0.5 }}>
                  <Card.Title className="fs-1">E-Tiket</Card.Title>
                  <Card.Text className="text-secondary">
                    Kode Invoice: {data?.data.id}
                  </Card.Text>
                </Col>
                <Col className="text-end fs-2">
                  <label>
                    <b style={{ color: "#e67e22" }}>Land</b>Tick
                  </label>
                  <Image
                    className="img-fuild mx-0"
                    style={{ width: "35px" }}
                    src={Logo}
                  />
                </Col>
              </Row>
            </CardHeader>
            <Card.Body>
              <Row>
                <Col sm={7}>
                  <Card.Title className="fw-bold fs-2">Kereta Api</Card.Title>
                  <Card.Subtitle
                    className="fw-normal text-secondary"
                    style={{ fontSize: "13px" }}>
                    <Moment format="dddd" className="fw-bold">
                      {data?.jadwal}
                    </Moment>
                    ,
                    <Moment format="DD MMMM yyyy" className="ms-1">
                      {data?.jadwal}
                    </Moment>
                  </Card.Subtitle>
                  <div className="mt-5">
                    <Card.Title className="fw-bold fs-5">
                      {data?.data.tiket.train.name} <br />
                      <label
                        style={{
                          fontSize: "12px",
                          lineHeight: 1,
                          fontWeight: "normal",
                        }}>
                        {data?.data.tiket.train.kelas}
                      </label>
                    </Card.Title>
                    <Row>
                      <Col>
                        <Stack direction="horizontal">
                          <Stack style={{ width: "5px" }} className="mt-1">
                            <div
                              className="rounded-circle"
                              style={{
                                width: "10px",
                                height: "10px",
                                background: "white",
                                border: "2px solid #e67e22 ",
                              }}></div>
                            <div
                              className="h-100"
                              style={{
                                background: "#e67e22",
                                width: "2px",
                                marginLeft: "3px",
                              }}></div>
                            <div
                              className="rounded-circle"
                              style={{
                                width: "10px",
                                height: "10px",
                                background: "#e67e22",
                              }}></div>
                          </Stack>
                          <Stack gap={5}>
                            <div style={{ lineHeight: 0.5 }}>
                              <Card.Title style={{ fontSize: "14px" }}>
                                <Moment format="HH:mm">
                                  {data?.data.tiket.waktu_berangkat}
                                </Moment>
                              </Card.Title>
                              <label style={{ fontSize: "12px" }}>
                                <Moment format="DD MMMM yyyy">
                                  {data?.data.tiket.jadwal}
                                </Moment>
                              </label>
                            </div>
                            <div style={{ lineHeight: 0.5 }}>
                              <Card.Title style={{ fontSize: "14px" }}>
                                <Moment format="HH:mm">
                                  {data?.data.tiket.waktu_tiba}
                                </Moment>
                              </Card.Title>
                              <label style={{ fontSize: "12px" }}>
                                <Moment format="DD MMMM yyyy">
                                  {data?.data.tiket.waktu_tiba}
                                </Moment>
                              </label>
                            </div>
                          </Stack>
                        </Stack>
                      </Col>
                      <Col>
                        <Stack gap={5}>
                          <div style={{ lineHeight: 0.5 }}>
                            <Card.Title style={{ fontSize: "14px" }}>
                              {data?.data.tiket.stasiunasal.kota}
                            </Card.Title>
                            <label style={{ fontSize: "12px" }}>
                              {data?.data.tiket.stasiunasal.name}
                            </label>
                          </div>
                          <div style={{ lineHeight: 0.5 }}>
                            <Card.Title style={{ fontSize: "14px" }}>
                              {data?.data.tiket.stasiuntujuan.kota}
                            </Card.Title>
                            <label style={{ fontSize: "12px" }}>
                              {data?.data.tiket.stasiuntujuan.name}
                            </label>
                          </div>
                        </Stack>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col className="text-center">
                  <Card.Img
                    className="w-50 mt-5"
                    src="https://www.freepnglogos.com/uploads/barcode-png/barcode-openkm-18.png"
                  />
                  <Card.Title style={{ color: "#e67e22", marginTop: "20px" }}>
                    {data?.data.tiket.kode}
                  </Card.Title>
                </Col>
              </Row>
              <div className="w-100 border-top mt-3 text-secondary p-1">
                <Row className="mt-2">
                  <Col sm={4} className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faIdCard} className="m-2 fs-5" />
                    <label style={{ fontSize: "8pt" }}>
                      Tunjukkan e-ticket dan identitas para penumpang saat
                      checkin
                    </label>
                  </Col>
                  <Col sm={4} className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faClock} className="m-2 fs-5" />
                    <label style={{ fontSize: "8pt" }}>
                      Check-in paling lambat 90 menit sebelum keberangkatan
                    </label>
                  </Col>
                  <Col sm={4} className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faWarning} className="m-2 fs-5" />
                    <label style={{ fontSize: "8pt" }}>
                      Waktu tertera adalah waktu stasiunsetempat
                    </label>
                  </Col>
                </Row>
              </div>
            </Card.Body>
            <Card.Footer className="p-0">
              <Table style={{ fontSize: "12px" }}>
                <thead>
                  <tr>
                    <td>No. Tanda Pengenal</td>
                    <td>Nama Pemesan</td>
                    <td>No. Handphone</td>
                    <td>Email</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {randomstring.generate({
                        length: 12,
                        charset: "numeric",
                      })}
                    </td>
                    <td>{data?.data.user.fullname}</td>
                    <td>087701006245 </td>
                    <td>{data?.data.user.email}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}
