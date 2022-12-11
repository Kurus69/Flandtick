import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";

export default function Dasboard() {
  const { data: transaction } = useQuery("transAdmin", async () => {
    const response = await API.get("/transall");
    return response.data.data;
  });
  let income = 0;

  return (
    <>
      <Container className="my-5">
        <p className="display-5 my-3">List Transaction</p>
        <Table striped hover responsive size="sm">
          <thead style={{ background: "#0078b5", color: "white" }}>
            <tr>
              <th>No Transaction</th>
              <th>Users</th>
              <th>Tiket</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((element) => {
              if (element.status === "success") {
                income += element.total;
              }
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
          <tfoot style={{ background: "#e67e22", color: "white" }}>
            <tr>
              <th colSpan={6}>Income : Rp {income}</th>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </>
  );
}
