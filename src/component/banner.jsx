import React from "react";
import {
  Card,
  CardImg,
  Col,
  Container,
  Row,
  ListGroup,
  Button,
  Form,
  FormControl,
  Stack,
} from "react-bootstrap";
import Banner1 from "../assets/image/banner1.png";
import Banner2 from "../assets/image/banner2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faTrain } from "@fortawesome/free-solid-svg-icons";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Success from "./modal/success";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

export default function Banner() {
  const [state] = useContext(UserContext);
  const [isShow, setShow] = useState(false);
  const [showModal, setModal] = useState(false);
  const [result, setResult] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let now = new Date();
  let liveDateTime = now.toLocaleDateString();
  let date = liveDateTime.split("/");
  let today = date[2] + "-" + date[0] + "-" + date[1];
  let weektomorrow = parseInt(date[0]) + 7;
  let maxToday = date[2] + "-" + date[0] + "-" + weektomorrow;

  console.log("week =>", weektomorrow);

  const handleDisabled = (event) => {
    if (event.target.checked) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const [form, setForm] = useState({
    asal: "",
    tujuan: "",
    jadwal: "",
    qty: 0,
  });
  const { asal, tujuan, jadwal, qty } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.type === "date") {
      let newDate = new Date(e.target.value).format("yyyy-dd-mm");
      setForm({ jadwal: newDate });
    }
  };

  let { data: tikets } = useQuery("tikets", async () => {
    const response = await API.get("/tikets");
    return response.data.data;
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const request = form;
    const respone = await API.post("/search-tiket", request);
    setResult(respone.data.data);
    return respone.data.data;
  };

  const handleBuy = async (id) => {
    const request = {
      qty: parseInt(form.qty),
    };
    if (state.isLogin) {
      await API.post("/tiket-transaction/" + id, request);
      setModal(true);
    } else {
      setShowLogin(true);
    }
  };

  const { data: stasiun } = useQuery("stasiunAdmin", async () => {
    const response = await API.get("/stasiuns");
    return response.data.data;
  });

  return (
    <>
      <div
        className=" fuild py-5 position-relative "
        style={{ height: "450px", background: "#0078b5" }}>
        <Card
          className="border-0 text-start ps-5 mt-5"
          style={{ background: "none" }}>
          <p className="fs-2 text-light">Selamat Pagi, Ticket Seekers !</p>
          <p className="fs-5 text-light fw-light">
            Ingin Pulkam dengan Good Deal ?<br /> Masuk atau Daftar Sekarang ! !
          </p>
        </Card>
        <CardImg
          className="img-fuild w-50 position-absolute"
          style={{ top: 50, right: 50 }}
          src={Banner2}
        />
        <CardImg
          className="img-fuild w-50 position-absolute"
          style={{ top: 70, right: 75 }}
          src={Banner1}
        />
      </div>
      <Container style={{ zIndex: 1, marginTop: -70, marginBottom: 50 }}>
        <Card className="border-0 shadow-sm pe-2">
          <Row>
            <Col sm={3}>
              <ListGroup
                variant="flush"
                style={{
                  height: "200px",
                  background: "#F2F2F2",
                  borderRadius: "10px 0px 0px 0px",
                }}
                className="text-start py-3 h-100">
                <ListGroup.Item
                  style={{ borderLeft: "5px solid #E67E22", borderRadius: 0 }}
                  className="fw-semibold">
                  <FontAwesomeIcon
                    icon={faTrain}
                    style={{ color: "#E67E22", fontSize: "20px" }}
                    className="me-3"
                  />
                  Tiket Kereta Api
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={9}>
              <Card className="border-0 py-2">
                <CardHeader style={{ background: "none", border: "0px" }}>
                  <Card.Title className="text-start fw-light fs-4">
                    <b>Tiket Kereta Api</b>
                  </Card.Title>
                </CardHeader>
                <Card.Body>
                  <Form
                    onSubmit={(e) => handleSearch(e)}
                    className="text-start">
                    <Stack gap={3}>
                      <Row className="d-flex align-items-center">
                        <Col sm={5}>
                          <Form.Label className="fw-semibold">
                            Stasiun Asal
                          </Form.Label>
                          <Form.Select name="asal" onChange={handleChange}>
                            {stasiun?.map((e) => (
                              <option value={e.kota}>
                                {e.name} - {e.kota}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col sm={2} className="d-flex justify-content-center">
                          <Button
                            className="rounded-circle"
                            style={{
                              background: "#E67E22",
                              border: "1px solid #E67E22",
                              marginTop: "25px",
                            }}>
                            <FontAwesomeIcon icon={faRepeat} />
                          </Button>
                        </Col>
                        <Col sm={5}>
                          <Form.Label className="fw-semibold">
                            Stasiun Tujuan
                          </Form.Label>
                          <Form.Select name="tujuan" onChange={handleChange}>
                            {stasiun?.map((e) => (
                              <option value={e.kota}>
                                {e.name} - {e.kota}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="d-flex align-items-center">
                        <Col>
                          <Form.Label className="fw-semibold">
                            Tanggal Berangkat
                          </Form.Label>
                          <FormControl
                            type="date"
                            min={today}
                            max={maxToday}
                            name="jadwal"
                            value={jadwal}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Pulang Pergi"
                            className="fw-semibold"
                            onChange={handleDisabled}
                          />
                        </Col>
                        <Col>
                          <Form.Label className="fw-semibold">
                            Tanggal Pulang
                          </Form.Label>
                          {isShow ? (
                            <FormControl
                              type="date"
                              min="2022-12-07"
                              name="date"
                              required
                            />
                          ) : (
                            <FormControl
                              type="date"
                              min="2022-12-07"
                              name="date"
                              disabled
                            />
                          )}
                        </Col>
                        <Col>
                          <Form.Label className="fw-semibold">
                            Dewasa
                          </Form.Label>
                          <FormControl
                            type="number"
                            name="qty"
                            value={qty}
                            onChange={handleChange}
                            min={0}
                            placeholder="0"
                            id="qty"
                            required
                          />
                        </Col>
                        <Col>
                          <Button
                            type="submit"
                            // onClick={() => handleSearch(form)}
                            style={{
                              background: "#E67E22",
                              border: "1px solid #E67E22",
                              marginTop: "30px",
                            }}>
                            Cari Tiket
                          </Button>
                        </Col>
                      </Row>
                    </Stack>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
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
        {!!result ? (
          result.length > 0 ? (
            result.map((element) => {
              let start = moment(element.waktu_berangkat);
              let end = moment(element.waktu_tiba);
              let diff = end.diff(start);
              return (
                <Card
                  className="p-3 lh-1 mb-2 w-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleBuy(element.id)}>
                  <Row>
                    <Col sm={3} className="text-center">
                      <Card.Title>{element.train.name}</Card.Title>
                      <Card.Text
                        className="text-secondary"
                        style={{ fontSize: "10pt" }}>
                        {element.train.kelas}
                      </Card.Text>
                    </Col>
                    <Col sm={2}>
                      <Card.Title>
                        <Moment format="HH:mm">
                          {element.waktu_berangkat}
                        </Moment>
                      </Card.Title>
                      <Card.Text
                        className="text-secondary lh-lg"
                        style={{ fontSize: "10pt" }}>
                        {element.stasiunasal.name}
                      </Card.Text>
                    </Col>
                    <Col sm={1} className="d-flex align-items-center">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ right: 0, top: 20 }}
                      />
                    </Col>
                    <Col sm={2}>
                      <Card.Title>
                        <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                      </Card.Title>
                      <Card.Text
                        className="text-secondary"
                        style={{ fontSize: "10pt" }}>
                        {element.stasiuntujuan.name}
                      </Card.Text>
                    </Col>
                    <Col sm={2}>
                      <Card.Title>
                        {moment.duration(diff).format("hh " + "J" + " mm ")} m
                      </Card.Title>
                    </Col>
                    <Col sm={2}>
                      <Card.Title style={{ color: "#0078b5" }}>
                        Rp. {element.harga}
                      </Card.Title>
                    </Col>
                  </Row>
                </Card>
              );
            })
          ) : (
            <>
              <Card className="p-4 lh-1 mb-2 w-100 text-center">
                <Card.Subtitle
                  style={{
                    color: "#e67e22",
                    fontWeight: "normal",
                    lineHeight: 1.5,
                  }}>
                  Mohon maaf tiket tidak tersedia, silakan merubah rute
                  perjalanan anda
                  <br /> <b>Terimakasih</b>
                </Card.Subtitle>
              </Card>
            </>
          )
        ) : (
          tikets?.map((element) => {
            let start = moment(element.waktu_berangkat);
            let end = moment(element.waktu_tiba);
            let diff = end.diff(start);
            return (
              <Card className="p-3 lh-1 mb-2 w-100">
                <Row>
                  <Col sm={3} className="text-center">
                    <Card.Title>{element.train.name}</Card.Title>
                    <Card.Text
                      className="text-secondary"
                      style={{ fontSize: "10pt" }}>
                      {element.train.kelas}
                    </Card.Text>
                  </Col>
                  <Col sm={2}>
                    <Card.Title>
                      <Moment format="HH:mm">{element.waktu_berangkat}</Moment>
                    </Card.Title>
                    <Card.Text
                      className="text-secondary lh-lg"
                      style={{ fontSize: "10pt" }}>
                      {element.stasiunasal.name}
                    </Card.Text>
                  </Col>
                  <Col sm={1} className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ right: 0, top: 20 }}
                    />
                  </Col>
                  <Col sm={2}>
                    <Card.Title>
                      <Moment format="HH:mm">{element.waktu_tiba}</Moment>
                    </Card.Title>
                    <Card.Text
                      className="text-secondary"
                      style={{ fontSize: "10pt" }}>
                      {element.stasiuntujuan.name}
                    </Card.Text>
                  </Col>
                  <Col sm={2}>
                    <Card.Title>
                      {moment.duration(diff).format("hh " + "j" + " mm ")}
                    </Card.Title>
                  </Col>
                  <Col sm={2}>
                    <Card.Title style={{ color: "#0078b5" }}>
                      Rp. {element.harga}
                    </Card.Title>
                  </Col>
                </Row>
              </Card>
            );
          })
        )}
      </Container>
      <Success show={showModal} showModal={setModal} />
      <Login
        show={showLogin}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        showLogin={setShowLogin}
        showRegister={setShowRegister}
      />
    </>
  );
}
