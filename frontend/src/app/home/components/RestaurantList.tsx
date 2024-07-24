import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getRestaurants, deleteRestaurant } from '../../../shared/services/restaurantCRUDService';
import { Restaurant } from '../../../shared/types/Restaurant';

interface RestaurantListProps {
  onEdit: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ onEdit }) => {
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
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{restaurant.restaurant_name}</Card.Title>
                <Card.Text>
                  {/* Add other restaurant details here */}
                </Card.Text>
                <Button variant="primary" onClick={() => onEdit(restaurant)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(restaurant.id)} className="ml-2">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantList;
