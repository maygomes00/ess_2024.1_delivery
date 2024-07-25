import React, { useState, useEffect } from "react";
import { Restaurant } from "../../../shared/types/Restaurant";
import { registerRestaurant } from "../../../shared/services/RestaurantRegistrationService";
// import "../pages/RestaurantRegistration/styles.css";
import { defineConfig } from "cypress";
import { useNavigate, Link } from "react-router-dom";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonToolbar,
  Alert,
} from "react-bootstrap";

const initialRestaurantState = {
  id: "",
  email: "",
  password: "",
  owner_name: "",
  owner_cpf: "",
  owner_address: "",
  owner_telephone: "",
  restaurant_name: "",
  restaurant_cnpj: "",
  restaurant_address: "",
  restaurant_telephone: "",
  items: [],
};

const dummyRestaurant = {
  id: "",
  email: "undecillion@example.com",
  password: "!secureP4$$W0RD1234",
  owner_name: "UNDECILLION",
  owner_cpf: "123.456.789-00",
  owner_address: "1234 Abcd Ab, Abcdefg, AB",
  owner_telephone: "55 (81) 12345-6789",
  restaurant_name: "Abcde Fghij",
  restaurant_cnpj: "12.345.678/0001-99",
  restaurant_address: "5678 Ijklmn Ij, Ijkmlno, IJ",
  restaurant_telephone: "55 81 1111-1111",
  items: [],
};

const RestaurantForm: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    id: "",
    email: "",
    password: "",
    owner_name: "",
    owner_cpf: "",
    owner_address: "",
    owner_telephone: "",
    restaurant_name: "",
    restaurant_cnpj: "",
    restaurant_address: "",
    restaurant_telephone: "",
    items: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const [successfulRegistration, setsuccessfulRegistration] = useState<
    string | null
  >(null);
  const [lackingInformation, setlackingInformation] = useState<string | null>(
    null
  );
  const [sameCNPJ, setsameCNPJ] = useState<string | null>(null);
  const [sameEmail, setsameEmail] = useState<string | null>(null);
  const [weakPassword, setweakPassword] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Restaurant to submit:", restaurant);
    registerRestaurant(restaurant)
      .then((response) => {
        setsuccessfulRegistration(
          "Restaurante registrado com sucesso, você será redirecionado para a página de login em 3 segundos"
        );
        console.log(response);
        setTimeout(() => {
          navigate("/login-restaurant");
        }, 3000);
      })
      .catch((error) => {
        switch (error.response.data) {
          case "Empresa com mesmo CNPJ já cadastrada":
            setsameCNPJ("Empresa com mesmo CNPJ já cadastrada");
            break;
          case "Restaurante de mesmo email já cadastrado":
            setsameEmail("Restaurante de mesmo email já cadastrado");
            break;
          case "Senha fraca":
            setweakPassword("Senha fraca");
            break;
          case "Faltando informações obrigatórias":
            setlackingInformation("Faltando informações obrigatórias");
        }
      });
  };

  const handleReset = () => {
    setRestaurant(initialRestaurantState);
  };

  const handleDummy = () => {
    setRestaurant(dummyRestaurant);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1>Registre seu restaurante</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_name"
                value={restaurant.restaurant_name}
                onChange={handleChange}
                placeholder="Insira o nome do restaurante"
              />
            </Form.Group>

            <Form.Group controlId="formEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_address"
                value={restaurant.restaurant_address}
                onChange={handleChange}
                placeholder="Insira o endereço do restaurante"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                placeholder="Insira o email do restaurante"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={restaurant.password}
                onChange={handleChange}
                placeholder="Insira uma senha"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerName">
              <Form.Label>Nome do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_name"
                value={restaurant.owner_name}
                onChange={handleChange}
                placeholder="Insira o nome do proprietário"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerCpf">
              <Form.Label>CPF do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_cpf"
                value={restaurant.owner_cpf}
                onChange={handleChange}
                placeholder="Insira o CPF do proprietário"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerAddress">
              <Form.Label>Endereço do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_address"
                value={restaurant.owner_address}
                onChange={handleChange}
                placeholder="Insira o endereço do proprietário"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerTelephone">
              <Form.Label>Telefone do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_telephone"
                value={restaurant.owner_telephone}
                onChange={handleChange}
                placeholder="Insira o telefone do proprietário"
              />
            </Form.Group>

            <Form.Group controlId="formRestaurantCnpj">
              <Form.Label>CNPJ do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_cnpj"
                value={restaurant.restaurant_cnpj}
                onChange={handleChange}
                placeholder="Insira o CNPJ do restaurante"
              />
            </Form.Group>

            <Form.Group controlId="formRestaurantTelephone">
              <Form.Label>Telefone do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_telephone"
                value={restaurant.restaurant_telephone}
                onChange={handleChange}
                placeholder="Insira o telefone do restaurante"
              />
            </Form.Group>

            <ButtonToolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="outline-primary" type="submit">
                Submit
              </Button>
              <Button variant="danger" type="reset" onClick={handleReset}>
                Limpar
              </Button>
              <Button variant="info" onClick={handleDummy}>
                Dummy
              </Button>
            </ButtonToolbar>
            <Container>
              {successfulRegistration && (
                <Alert variant="success">{successfulRegistration}</Alert>
              )}
              {lackingInformation && (
                <Alert variant="danger">{lackingInformation}</Alert>
              )}
              {sameCNPJ && <Alert variant="danger">{sameCNPJ}</Alert>}
              {sameEmail && <Alert variant="danger">{sameEmail}</Alert>}
              {weakPassword && <Alert variant="danger">{weakPassword}</Alert>}
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantForm;
