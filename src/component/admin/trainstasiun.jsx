import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { API } from "../../config/api";

export default function TrainStasiun() {
  const { data: train, refetch } = useQuery("trainAdmin", async () => {
    const response = await API.get("/trains");
    return response.data.data;
  });

  const { data: stasiun } = useQuery("stasiunAdmin", async () => {
    const response = await API.get("/stasiuns");
    return response.data.data;
  });
  return (
    <>
      <Container className="mt-5">
        <Row>
          <p className="display-5">Stasiun Kereta Api</p>
          <Col>
            <Table className="mt-4" striped responsive size="sm">
              <thead style={{ background: "#0078b5", color: "white" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Stasiun</th>
                  <th>Kota</th>
                  <th>
                    <Button
                      style={{
                        background: "#e67e22",
                        height: "40px",
                        border: "1px solid #e67e22",
                        float: "right",
                      }}>
                      Add Stasiun
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stasiun?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <td>{number}</td>
                      <td>{element.name}</td>
                      <td>{element.kota}</td>
                      <td>
                        <Button
                          className="btn text-success mx-2 float-end"
                          style={{ background: "none", border: "none" }}>
                          <FontAwesomeIcon icon={faPenSquare} />
                        </Button>
                        <Button
                          className="btn text-danger float-end"
                          style={{ background: "none", border: "none" }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table className="mt-4" striped responsive size="sm">
              <thead style={{ background: "#0078b5", color: "white" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Kereta</th>
                  <th>Tipe</th>
                  <th>
                    <Button
                      style={{
                        background: "#e67e22",
                        height: "40px",
                        border: "1px solid #e67e22",
                        float: "right",
                      }}>
                      Add Train
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {train?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <td>{number}</td>
                      <td>{element.name}</td>
                      <td>{element.kelas}</td>
                      <td>
                        <Button
                          className="btn text-success mx-2 float-end"
                          style={{ background: "none", border: "none" }}>
                          <FontAwesomeIcon icon={faPenSquare} />
                        </Button>
                        <Button
                          className="btn text-danger float-end"
                          style={{ background: "none", border: "none" }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
