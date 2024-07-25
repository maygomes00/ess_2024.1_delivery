import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import {
  getRestaurants,
  deleteRestaurant,
} from "../../../shared/services/restaurantCRUDService";
import { Restaurant } from "../../../shared/types/Restaurant";

interface RestaurantListProps {
  onEdit: (restaurant: Restaurant) => void;
  onCreate: () => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  onEdit,
  onCreate,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRestaurant(id);
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Edição e deleção de restaurantes</h2>
          <Button variant="success" onClick={onCreate}>
            Criar Restaurante
          </Button>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{restaurant.restaurant_name}</Card.Title>
                <Card.Text>{/* Add other restaurant details here */}</Card.Text>
                <ButtonToolbar
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="primary" onClick={() => onEdit(restaurant)}>
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(restaurant.id)}
                    className="ml-2"
                  >
                    Deletar
                  </Button>
                </ButtonToolbar>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
