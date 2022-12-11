import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Moment from "react-moment";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

export default function TiketAdmin() {
  const { data: tiket, refetch } = useQuery("tiketAdmin", async () => {
    const response = await API.get("/tikets");
    return response.data.data;
  });

  let navigate = useNavigate();

  const HandleDel = useMutation(async (id) => {
    try {
      const response = await API.delete("/tiket/" + id);
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <p className="display-6">List Ticket</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() => navigate("/formtiket")}
              className="btn"
              style={{
                background: "#e67e22",
                height: "40px",
                border: "1px solid #e67e22",
              }}>
              Add Ticket
            </Button>
          </Col>
        </Row>
        <Table className="mt-4" striped responsive size="sm">
          <thead style={{ background: "#0078b5", color: "white" }}>
            <tr>
              <th>Kode</th>
              <th>Jadwal</th>
              <th>Kereta</th>
              <th>Stasiun Asal</th>
              <th>Stasiun Tujuan</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tiket?.map((element) => (
              <tr>
                <td>{element.kode}</td>
                <td>
                  <Moment format="DD MMMM yyyy">{element.jadwal}</Moment>
                </td>
                <td>
                  {element.train.name} - ({element.train.kelas})
                </td>
                <td>
                  {element.stasiunasal.name}- {element.stasiunasal.kota}
                </td>
                <td>
                  {element.stasiuntujuan.name}- {element.stasiuntujuan.kota}
                </td>
                <td>Rp. {element.harga}</td>
                <td>{element.stock}</td>
                <td>
                  <Button className="btn btn-success me-2">
                    <FontAwesomeIcon icon={faPenSquare} />
                  </Button>
                  <Button
                    onClick={() => HandleDel.mutate(element.id)}
                    className="btn btn-danger">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
