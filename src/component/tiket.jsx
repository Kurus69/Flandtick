import React from "react";
import { useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Image,
  Alert,
  Stack,
  Table,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useQuery } from "react-query";
import Logo from "../assets/image/logo1.png";
import { API } from "../config/api";
import Detail from "./modal/detail";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

export default function Tiket() {
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState();

  let navigate = useNavigate();

  let { data: myticket } = useQuery("myticket", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  const handleDetail = (data) => {
    setDataDetail({
      data,
    });
    setShowDetail(true);
  };

  return (
    <>
      <Container className="my-5">
        <label className="display-5">Tiket Saya</label>
        {myticket?.map((element) => (
          <Card
            style={{
              background: "#0078b5",
              marginTop: "30px",
              color: "white",
              border: "0",
            }}>
            <Row className="pe-3">
              {/* data tiket */}
              <Col sm={9}>
                <div
                  style={{
                    background: "#e67e22",
                    width: "170px",
                    borderRadius: "20px 0px 200px 0px",
                    padding: "5px",
                    fontSize: "14pt",
                  }}>
                  <label className="mx-2">
                    <b>Land</b>Tick
                  </label>
                  <Image
                    className="img-fuild mx-0"
                    style={{ width: "25px" }}
                    src={Logo}
                  />
                </div>
                <Card className="m-3" style={{ background: "none", border: 0 }}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title className="fs-2">
                          {element.tiket.train.name}
                        </Card.Title>
                        <Card.Subtitle className="fw-normal">
                          {element.tiket.train.kelas}
                        </Card.Subtitle>
                        {element.status === "pending" ? (
                          <Alert
                            variant="warning"
                            className="text-center p-1 mt-4"
                            style={{ width: "100px" }}>
                            Pending
                          </Alert>
                        ) : element.status === "success" ? (
                          <Alert
                            variant="success"
                            className="text-center p-1 mt-4"
                            style={{ width: "100px" }}>
                            Success
                          </Alert>
                        ) : element.status === "cancel" ? (
                          <Alert
                            variant="danger"
                            className="text-center p-1 mt-4"
                            style={{ width: "100px" }}>
                            Cancel
                          </Alert>
                        ) : null}
                      </Col>
                      <Col>
                        <Stack direction="horizontal">
                          <Stack style={{ width: "5px" }} className="mt-3">
                            <div
                              className="rounded-circle"
                              style={{
                                width: "20px",
                                height: "20px",
                                background: "white",
                                border: "2px solid #e67e22 ",
                              }}></div>
                            <div
                              className="h-50"
                              style={{
                                background: "#e67e22",
                                width: "2px",
                                marginLeft: "8px",
                              }}></div>
                            <div
                              className="rounded-circle"
                              style={{
                                width: "20px",
                                height: "20px",
                                background: "#e67e22",
                              }}></div>
                          </Stack>
                          <Stack gap={5}>
                            <div style={{ lineHeight: 0.5 }}>
                              <Card.Title>
                                <Moment format="HH:mm">
                                  {element.tiket.waktu_berangkat}
                                </Moment>
                              </Card.Title>
                              <label>
                                <Moment format="D MMM YYYY">
                                  {element.tiket.jadwal}
                                </Moment>
                              </label>
                            </div>
                            <div style={{ lineHeight: 0.5 }}>
                              <Card.Title>
                                <Moment format="HH:mm">
                                  {element.tiket.waktu_tiba}
                                </Moment>
                              </Card.Title>
                              <label>
                                <Moment format="D MMM YYYY">
                                  {element.tiket.waktu_tiba}
                                </Moment>
                              </label>
                            </div>
                          </Stack>
                        </Stack>
                      </Col>
                      <Col>
                        <Stack gap={5}>
                          <div style={{ lineHeight: 0.5 }}>
                            <Card.Title>
                              {element.tiket.stasiunasal.name}
                            </Card.Title>
                            <label>{element.tiket.stasiunasal.kota}</label>
                          </div>
                          <div style={{ lineHeight: 0.5 }}>
                            <Card.Title>
                              {element.tiket.stasiuntujuan.name}
                            </Card.Title>
                            <label>{element.tiket.stasiuntujuan.kota}</label>
                          </div>
                        </Stack>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer
                    className="border-0 p-0"
                    style={{ background: "none" }}>
                    <Table responsive="sm" className="text-white">
                      <thead style={{ color: "orange" }}>
                        <tr>
                          <th>Kode</th>
                          <th>Nama Penumpang</th>
                          <th>Email</th>
                          <th>Transaction</th>
                        </tr>
                      </thead>
                      <tbody style={{ border: 0 }}>
                        <tr style={{ border: "none" }}>
                          <td>{element.tiket.kode}</td>
                          <td>{element.user.fullname}</td>
                          <td>{element.user.email}</td>
                          <td>KAI-{element.id}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Footer>
                </Card>
              </Col>
              {/* Button Date kereta */}
              {element.status === "pending" ? (
                <Col sm={3}>
                  <label className="display-5 mt-4 fw-semibold">
                    Kereta Api
                  </label>
                  <label className=" fw-light">
                    <label className=" fw-light">
                      <Moment format="dddd" className="fw-bold">
                        {element.datetrans}
                      </Moment>
                      ,
                      <Moment format="DD MMMM yyyy" className="ms-1">
                        {element.datetrans}
                      </Moment>
                    </label>
                  </label>

                  <Button
                    onClick={() => {
                      navigate(`/invoice/${element.id}`);
                    }}
                    className="w-100 btn-danger"
                    style={{
                      marginTop: 160,
                    }}>
                    Bayar Sekarang
                  </Button>
                </Col>
              ) : (
                <Col sm={3} className="d-flex align-items-center">
                  <Card style={{ background: "none", border: "0" }}>
                    <CardHeader style={{ background: "none", border: 0 }}>
                      <label className="display-6 fw-semibold">
                        Kereta Api
                      </label>
                      <label className=" fw-light">
                        <Moment format="dddd" className="fw-bold">
                          {element.jadwal}
                        </Moment>
                        ,
                        <Moment format="DD MMMM yyyy" className="ms-1">
                          {element.jadwal}
                        </Moment>
                      </label>
                    </CardHeader>
                    <Card.Body className="d-flex justify-content-center">
                      <Card.Img
                        className="w-50"
                        src="https://www.freepnglogos.com/uploads/barcode-png/barcode-openkm-18.png"
                      />
                    </Card.Body>
                    <Card.Footer
                      style={{
                        background: "none",
                        border: 0,
                        textAlign: "center",
                        color: "orange",
                      }}>
                      {element.status === "success" ? (
                        <Button
                          onClick={() => handleDetail(element)}
                          className="w-100"
                          style={{
                            background: "#e67e22",
                            border: "1px solid #e67e22",
                          }}>
                          Detail Ticket
                        </Button>
                      ) : null}
                    </Card.Footer>
                  </Card>
                </Col>
              )}
            </Row>
          </Card>
        ))}
      </Container>
      <Detail show={showDetail} showDetail={setShowDetail} data={dataDetail} />
    </>
  );
}
