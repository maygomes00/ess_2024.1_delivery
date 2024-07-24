import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  createRestaurant,
  updateRestaurant,
} from "../../../shared/services/restaurantCRUDService";
import { Restaurant } from "../../../shared/types/Restaurant";

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSave: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  restaurant,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Restaurant>>(
    restaurant || {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurant) {
      await updateRestaurant(restaurant.id, formData);
    } else {
      await createRestaurant(formData as Restaurant);
    }
    onSave();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1>
            {restaurant
              ? "Edição do cadastro do restaurante"
              : "Add Restaurant"}
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Novo nome do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_name"
                value={formData.restaurant_name || ""}
                onChange={handleChange}
                placeholder="Insira o novo nome do restaurante"
                required
              />
            </Form.Group>

            <Form.Group controlId="formRestaurantAddress">
              <Form.Label>Novo endereço do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_address"
                value={formData.restaurant_address || ""}
                onChange={handleChange}
                placeholder="Insira o novo endereço do restaurante"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Novo e-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Insira o novo email do restaurante"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Nova senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Insira a nova senha"
                required
              />
            </Form.Group>
            <Form.Group controlId="formOwnerName">
              <Form.Label>Novo nome do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_name"
                value={formData.owner_name || ""}
                onChange={handleChange}
                placeholder="Insira o novo nome do proprietário"
                required
              />
            </Form.Group>
            <Form.Group controlId="formOwnerCpf">
              <Form.Label>Novo CPF do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_cpf"
                value={formData.owner_cpf || ""}
                onChange={handleChange}
                placeholder="Insira o novo CPF do proprietário"
                required
              />
            </Form.Group>
            <Form.Group controlId="formOwnerAddress">
              <Form.Label>Novo endereço do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_address"
                value={formData.owner_address}
                onChange={handleChange}
                placeholder="Insira o novo endereço do proprietário"
              />
            </Form.Group>
            <Form.Group controlId="formOwnerTelephone">
              <Form.Label>Novo telefone do proprietário</Form.Label>
              <Form.Control
                type="text"
                name="owner_telephone"
                value={formData.owner_telephone}
                onChange={handleChange}
                placeholder="Insira o telefone do proprietário"
              />
            </Form.Group>
            <Form.Group controlId="formRestaurantCnpj">
              <Form.Label>Novo CNPJ do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_cnpj"
                value={formData.restaurant_cnpj}
                onChange={handleChange}
                placeholder="Insira o novo CNPJ do restaurante"
              />
            </Form.Group>
            <Form.Group controlId="formRestaurantCnpj">
              <Form.Label>Novo telefone do restaurante</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_cnpj"
                value={formData.restaurant_telephone}
                onChange={handleChange}
                placeholder="Insira o novo telefone do restaurante"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {restaurant ? "Update" : "Add"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantForm;
