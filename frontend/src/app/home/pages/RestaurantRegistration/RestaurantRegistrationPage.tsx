import React, {useState, useEffect} from 'react';
import { Restaurant } from '../../../../shared/types/Restaurant';
import { Container } from 'react-bootstrap';
import RestaurantForm from '../../forms/RestaurantForm';

const RRegistrationPage: React.FC = () => {
    return (
        <RestaurantForm />
    );
  };

export default RRegistrationPage;