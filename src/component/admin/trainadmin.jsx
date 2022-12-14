import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import FormTrain from "../modal/formtrain";
import FormUpdateTrain from "../modal/formupdatetrain";

export default function TrainAdmin() {
  const [showModal, setModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dataTrain, setDataTrain] = useState();

  const { data: trains, refetch } = useQuery("trainAdmin", async () => {
    const response = await API.get("/trains");
    return response.data.data;
  });

  const HandleDel = useMutation(async (id) => {
    try {
      const response = await API.delete("/train/" + id);
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  const HandleEdit = useMutation(async (id) => {
    try {
      const response = await API.get("/train/" + id);
      setDataTrain(response.data.data);
      setShowUpdate(true);
    } catch (error) {
      console.log(error);
    }
  });
  console.log(dataTrain);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <p className="display-5">Data Kereta Api</p>
          <Col>
            <Table className="mt-4" striped responsive size="sm">
              <thead style={{ background: "#0078b5", color: "white" }}>
                <tr>
                  <th>No</th>
                  <th>Nama Kereta</th>
                  <th>Tipe Kelas</th>
                  <th>
                    <Button
                      onClick={() => setModal(true)}
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
                {trains?.map((element, number) => {
                  number += 1;
                  return (
                    <tr>
                      <td>{number}</td>
                      <td>{element.name}</td>
                      <td>{element.kelas}</td>
                      <td>
                        <Button
                          onClick={() => HandleEdit.mutate(element.ID)}
                          className="btn text-success mx-2 float-end"
                          style={{ background: "none", border: "none" }}>
                          <FontAwesomeIcon icon={faPenSquare} />
                        </Button>
                        <Button
                          onClick={() => HandleDel.mutate(element.ID)}
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
      <FormTrain show={showModal} showModal={setModal} />
      <FormUpdateTrain
        show={showUpdate}
        showModal={setShowUpdate}
        data={dataTrain}
      />
    </>
  );
}
