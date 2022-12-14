import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
  faClock,
  faMoneyBill1Wave,
  faTicket,
  faTrain,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  Badge,
  Container,
  Row,
  Table,
  Col,
  Card,
  NavLink,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function Dasboard() {
  const { data: tiket } = useQuery("tiketAdmin", async () => {
    const response = await API.get("/tikets");
    return response.data.data;
  });

  const { data: train } = useQuery("trainAdmin", async () => {
    const response = await API.get("/trains");
    return response.data.data;
  });

  const { data: stasiun } = useQuery("stasiunAdmin", async () => {
    const response = await API.get("/stasiuns");
    return response.data.data;
  });

  const { data: transaction } = useQuery("transAdmin", async () => {
    const response = await API.get("/transall");
    return response.data.data;
  });
  let income = 0;

  transaction?.map((element) => {
    if (element.status === "success") {
      income += element.total;
    }
    return income;
  });

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <Card className="border-0 shadow">
              <CardHeader
                className="border-0 text-white"
                style={{ background: "#0078b5" }}>
                Income
              </CardHeader>
              <Card.Text className="text-secondary p-3">
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="fs-2 " />{" "}
                <span className="ms-2 fs-4">Rp. {income}</span>
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <NavLink href="/admintiket">
              <Card className="border-0 shadow">
                <CardHeader
                  className="border-0 text-white"
                  style={{ background: "#0078b5" }}>
                  Ticket
                </CardHeader>
                <Card.Text className="text-secondary p-3">
                  <FontAwesomeIcon icon={faTicket} className="fs-2 " />{" "}
                  <span className="ms-2 fs-4">{tiket?.length} Ticket</span>
                </Card.Text>
              </Card>
            </NavLink>
          </Col>
          <Col>
            <NavLink href="/admintrain">
              <Card className="border-0 shadow">
                <CardHeader
                  className="border-0 text-white"
                  style={{ background: "#0078b5" }}>
                  Kereta
                </CardHeader>
                <Card.Text className="text-secondary p-3">
                  <FontAwesomeIcon icon={faTrain} className="fs-2 " />{" "}
                  <span className="ms-2 fs-4">{train?.length} Kereta</span>
                </Card.Text>
              </Card>
            </NavLink>
          </Col>
          <Col>
            <Card className="border-0 shadow">
              <CardHeader
                className="border-0 text-white"
                style={{ background: "#0078b5" }}>
                Stasiun
              </CardHeader>
              <Card.Text className="text-secondary p-3">
                <FontAwesomeIcon icon={faCity} className="fs-2 " />{" "}
                <span className="ms-2 fs-4">{stasiun?.length} Stasiun</span>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <p className="fs-3 my-3">List Transaction</p>
        <Table striped hover responsive size="sm">
          <thead style={{ background: "#e67e22", color: "white" }}>
            <tr>
              <th>No Invoice</th>
              <th>Pemesan</th>
              <th>Tiket</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((element) => {
              return (
                <>
                  <tr>
                    <td>{element?.id}</td>
                    <td>{element?.user.fullname}</td>
                    <td>
                      {element.tiket.stasiunasal.kota} -{" "}
                      {element.tiket.stasiuntujuan.kota}
                    </td>
                    <td>{element.total}</td>
                    <td>
                      {element.status === "pending" ? (
                        <span className="text-warning">Pending</span>
                      ) : element.status === "cancel" ? (
                        <span className="text-danger">Cancel</span>
                      ) : element.status === "success" ? (
                        <span className="text-success">Success</span>
                      ) : null}
                    </td>
                    <td>
                      {element.status === "pending" ? (
                        <Badge className="bg-warning rounded-circle">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-black"
                            style={{
                              width: "15px",
                              height: "20px",
                              fontSize: "10px",
                            }}
                          />
                        </Badge>
                      ) : element.status === "cancel" ? (
                        <Badge className="bg-danger rounded-circle">
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-white"
                            style={{ width: "15px", height: "20px" }}
                          />
                        </Badge>
                      ) : element.status === "success" ? (
                        <Badge className="bg-success rounded-circle">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-white"
                            style={{
                              fontSize: "10px",
                              width: "15px",
                              height: "20px",
                            }}
                          />
                        </Badge>
                      ) : null}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
