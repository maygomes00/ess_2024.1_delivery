import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createRestaurant, updateRestaurant } from "../../../shared/services/restaurantCRUDService";
import { Restaurant } from "../../../shared/types/Restaurant";

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onSave: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ restaurant, onSave }) => {
  const [formData, setFormData] = useState<Partial<Restaurant>>(restaurant || {});

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
          <h1>{restaurant ? 'Edit Restaurant' : 'Add Restaurant'}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRestaurantName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                name="restaurant_name"
                value={formData.restaurant_name || ''}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                required
              />
            </Form.Group>
            {/* Add other form fields here following the same structure */}
            <Button variant="primary" type="submit">
              {restaurant ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RestaurantForm;
