import React, { useState, useEffect } from "react";
import { Restaurant } from "../../../shared/types/Restaurant";
import { registerRestaurant } from "../../../shared/services/RestaurantRegistrationService";
// import "../pages/RestaurantRegistration/styles.css";
import { defineConfig } from 'cypress';

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonToolbar,
} from "react-bootstrap";

const initialRestaurantState = {
  id: '',
  email: '',
  password: '',
  owner_name: '',
  owner_cpf: '',
  owner_address: '',
  owner_telephone: '',
  restaurant_name: '',
  restaurant_cnpj: '',
  restaurant_address: '',
  restaurant_telephone: '',
  items: [],
};

const dummyRestaurant = {
  id: '',
  email: 'undecillion@example.com',
  password: '!secureP4$$W0RD1234',
  owner_name: 'UNDECILLION',
  owner_cpf: '123.456.789-00',
  owner_address: '1234 Abcd Ab, Abcdefg, AB',
  owner_telephone: '55 (81) 12345-6789',
  restaurant_name: 'Abcde Fghij',
  restaurant_cnpj: '12.345.678/0001-99',
  restaurant_address: '5678 Ijklmn Ij, Ijkmlno, IJ',
  restaurant_telephone: '55 81 1111-1111',
  items: [],
}


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Restaurant to submit:", restaurant);
    registerRestaurant(restaurant)
      .then((response) => {
        console.log("Restaurant registered successfully:", response);
      })
      .catch((error) => {
        console.error("Error registering restaurant:", error);
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
                placeholder="Enter restaurant name"
              />
            </Form.Group>

            <Form.Group controlId="formEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_address"
                value={restaurant.restaurant_address}
                onChange={handleChange}
                placeholder="Enter restaurant address"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                placeholder="Enter restaurant email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={restaurant.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerName">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="owner_name"
                value={restaurant.owner_name}
                onChange={handleChange}
                placeholder="Enter owner's name"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerCpf">
              <Form.Label>Owner CPF</Form.Label>
              <Form.Control
                type="text"
                name="owner_cpf"
                value={restaurant.owner_cpf}
                onChange={handleChange}
                placeholder="Enter owner's CPF"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerAddress">
              <Form.Label>Owner Address</Form.Label>
              <Form.Control
                type="text"
                name="owner_address"
                value={restaurant.owner_address}
                onChange={handleChange}
                placeholder="Enter owner's address"
              />
            </Form.Group>

            <Form.Group controlId="formOwnerTelephone">
              <Form.Label>Owner Telephone</Form.Label>
              <Form.Control
                type="text"
                name="owner_telephone"
                value={restaurant.owner_telephone}
                onChange={handleChange}
                placeholder="Enter owner's telephone"
              />
            </Form.Group>

            <Form.Group controlId="formRestaurantCnpj">
              <Form.Label>Restaurant CNPJ</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_cnpj"
                value={restaurant.restaurant_cnpj}
                onChange={handleChange}
                placeholder="Enter restaurant CNPJ"
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantForm;
