import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Card,
  Button,
} from "react-bootstrap";
import Header from "../header";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function AddTiket() {
  let navigate = useNavigate();

  const { data: train } = useQuery("trainAdmin", async () => {
    const response = await API.get("/trains");
    return response.data.data;
  });

  const { data: stasiun } = useQuery("stasiunAdmin", async () => {
    const response = await API.get("/stasiuns");
    return response.data.data;
  });

  let now = new Date();
  let liveDateTime = now.toLocaleDateString();
  let date = liveDateTime.split("/");
  let today = date[2] + "-" + date[0] + "-" + date[1];
  let weektomorrow = parseInt(date[0]) + 5;
  let maxToday = date[2] + "-" + date[0] + "-" + weektomorrow;

  const [form, setForm] = useState({
    jadwal: "",
    train: 0,
    stasiunasal: 0,
    waktuberangkat: "",
    stasiuntujuan: 0,
    waktutiba: "",
    harga: 0,
    stock: 0,
  });

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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("jadwal", form.jadwal);
      formData.set("train", form.train);
      formData.set("stasiunasal", form.stasiunasal);
      formData.set("waktuberangkat", form.waktuberangkat);
      formData.set("stasiuntujuan", form.stasiuntujuan);
      formData.set("waktutiba", form.waktutiba);
      formData.set("harga", form.harga);
      formData.set("stock", form.stock);

      // Insert product data
      const response = await API.post("/tiket", formData, config);
      console.log(response);

      navigate("/admintiket");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <Container className="mt-5">
        <p className="display-5">Tambah Tiket</p>
        <Card className="p-5 my-3">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Row md={4}>
              <Col className="mb-3">
                <FormLabel>Jadwal Tiket</FormLabel>
                <FormControl
                  min={today}
                  max={maxToday}
                  type="date"
                  name="jadwal"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <FormLabel>Kereta</FormLabel>
                <Form.Select
                  name="train"
                  onChange={handleChange}
                  value={form.train}>
                  {train?.map((e) => (
                    <option value={e.ID}>{e.name}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Stok Tiket</FormLabel>
                <FormControl
                  onChange={handleChange}
                  type="number"
                  min={1}
                  placeholder={0}
                  name="stock"
                />
              </Col>
              <Col>
                <FormLabel>Harga Tiket</FormLabel>
                <FormControl
                  onChange={handleChange}
                  type="number"
                  min={1}
                  placeholder={0}
                  name="harga"
                />
              </Col>
              <Col>
                <FormLabel>Stasiun Asal</FormLabel>
                <Form.Select name="stasiunasal" onChange={handleChange}>
                  {stasiun?.map((e) => (
                    <option value={e.ID}>
                      {e.name} - {e.kota}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Stasiun Tujuan</FormLabel>
                <Form.Select name="stasiuntujuan" onChange={handleChange}>
                  {stasiun?.map((e) => (
                    <option value={e.ID}>
                      {e.name} - {e.kota}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <FormLabel>Waktu Mulai</FormLabel>
                <FormControl
                  onChange={handleChange}
                  name="waktuberangkat"
                  type="date"
                  min={today}
                  max={maxToday}
                />
              </Col>
              <Col>
                <FormLabel>Waktu Tiba</FormLabel>
                <FormControl
                  onChange={handleChange}
                  name="waktutiba"
                  type="date"
                  min={today}
                  max={maxToday}
                />
              </Col>
            </Row>
            <Button
              type="submit"
              className="w-100 mt-4"
              style={{ background: "#0078b5", border: "1px solid #0078b5" }}>
              Buat Tiket
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
