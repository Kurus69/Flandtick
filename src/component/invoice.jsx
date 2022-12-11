import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Stack,
  Table,
  Image,
  Button,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/image/logo1.png";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import Moment from "react-moment";
import { useEffect } from "react";

export default function Invoices() {
  const { id } = useParams();
  let { data: invoice } = useQuery("invoiceTrans", async () => {
    const response = await API.get("/detailtransaction/" + id);
    return response.data.data;
  });
  var randomstring = require("randomstring");

  let navigate = useNavigate();
  const handlePay = useMutation(async (id) => {
    try {
      const response = await API.get("/transactionpayment/" + id);
      console.log("respon Payment :", response);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);

          navigate("/tiket");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/tiket");
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
      console.log("Transaksi", response);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-rIrlvZvI6nm57Qa1";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <Container className="my-5">
        <p className="display-5 my-3">Invoice</p>
        <Row>
          <Col sm={8}>
            <Card>
              <CardHeader className="p-4 border-0">
                <Card.Text>
                  <Stack direction="horizontal" gap={3}>
                    <FontAwesomeIcon
                      icon={faWarning}
                      className="text-warning fs-1"
                    />
                    <label style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      Silakan melakukan pembayaran memalui M-Banking, E-Banking
                      dan ATM Ke No.rek dibawah <br />
                      <b>No.rek : 09812312312</b>
                    </label>
                  </Stack>
                </Card.Text>
              </CardHeader>
            </Card>
            <Card className="my-3 ">
              <div
                style={{
                  background: "#e67e22",
                  width: "170px",
                  borderRadius: "20px 0px 200px 0px",
                  padding: "5px",
                  fontSize: "14pt",
                }}>
                <label className="mx-2 text-white">
                  <b>Land</b>Tick
                </label>
                <Image
                  className="img-fuild mx-0"
                  style={{ width: "25px" }}
                  src={Logo}
                />
              </div>
              <Table className="mt-5" responsive>
                <thead>
                  <tr>
                    <th>No. Tanda Pengenal</th>
                    <th>Nama Pemesan</th>
                    <th>No. Handphone</th>
                    <th>Email</th>
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
                    <td>{invoice?.user.fullname}</td>
                    <td>083896833112</td>
                    <td>{invoice?.user.email}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            <Row className="my-3">
              <Col sm={8}>
                <p className="display-6">Rinician Harga</p>
                <Card>
                  <Card.Body>
                    <Stack direction="horizontal" gap={5}>
                      <Card.Subtitle className="col-8">
                        {invoice?.tiket.train.name} (Dewasa) x{invoice?.qty}
                      </Card.Subtitle>
                      <Card.Text className="col-4 ms-4">
                        Rp. {invoice?.tiket.harga}
                      </Card.Text>
                    </Stack>
                  </Card.Body>
                  <Card.Footer className="border-0">
                    <Stack direction="horizontal">
                      <Card.Subtitle className="col-5">Total</Card.Subtitle>
                      <Card.Title className="col-7 text-end fw-bold">
                        Rp. {invoice?.total}
                      </Card.Title>
                    </Stack>
                  </Card.Footer>
                </Card>
                <Button
                  onClick={() => handlePay.mutate(invoice?.id)}
                  className="mt-3 w-100"
                  style={{
                    background: "#0078b5",
                    border: "1px solid #0078b5",
                  }}>
                  Bayar
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Card>
              <CardHeader>
                <Row>
                  <Col sm={9}>
                    <Card.Subtitle className="fs-3">Kereta Api</Card.Subtitle>
                    <label style={{ fontSize: "11px" }}>
                      <Moment format="dddd" className="fw-bold">
                        {invoice?.tiket.jadwal}
                      </Moment>
                      ,
                      <Moment format="DD MMMM yyyy" className="ms-1">
                        {invoice?.tiket.jadwal}
                      </Moment>
                    </label>
                  </Col>
                  <Col sm={3} className="text-center">
                    <Card.Img
                      style={{
                        width: "40px",
                      }}
                      className="m-1"
                      src="https://www.freepnglogos.com/uploads/barcode-png/barcode-openkm-18.png"
                    />
                    <Card.Subtitle style={{ fontSize: "10px" }}>
                      {invoice?.tiket.kode}
                    </Card.Subtitle>
                  </Col>
                </Row>
              </CardHeader>
              <Card.Body>
                <div className="">
                  <Card.Title className="fw-bold fs-5">
                    {invoice?.tiket.train.name} <br />
                    <label
                      style={{
                        fontSize: "12px",
                        lineHeight: 1,
                        fontWeight: "normal",
                      }}>
                      {invoice?.tiket.train.kelas}
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
                                {invoice?.tiket.waktu_berangkat}
                              </Moment>
                            </Card.Title>
                            <label style={{ fontSize: "12px" }}>
                              <Moment format="DD MMMM yyyy">
                                {invoice?.tiket.jadwal}
                              </Moment>
                            </label>
                          </div>
                          <div style={{ lineHeight: 0.5 }}>
                            <Card.Title style={{ fontSize: "14px" }}>
                              <Moment format="HH:mm">
                                {invoice?.tiket.waktu_tiba}
                              </Moment>
                            </Card.Title>
                            <label style={{ fontSize: "12px" }}>
                              <Moment format="DD MMMM yyyy">
                                {invoice?.tiket.waktu_tiba}
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
                            {invoice?.tiket.stasiunasal.kota}
                          </Card.Title>
                          <label style={{ fontSize: "12px" }}>
                            {invoice?.tiket.stasiunasal.name}
                          </label>
                        </div>
                        <div style={{ lineHeight: 0.5 }}>
                          <Card.Title style={{ fontSize: "14px" }}>
                            {invoice?.tiket.stasiuntujuan.kota}
                          </Card.Title>
                          <label style={{ fontSize: "12px" }}>
                            {invoice?.tiket.stasiuntujuan.name}
                          </label>
                        </div>
                      </Stack>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
