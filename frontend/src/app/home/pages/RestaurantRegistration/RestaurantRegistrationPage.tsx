import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import RestaurantForm from '../../forms/RestaurantForm';
import { sanityTest } from '../../../../shared/services/RestaurantRegistrationService';

const RRegistrationPage: React.FC = () => {
  const [sanityResult, setSanityResult] = useState<string | null>(null);
  const [sanityError, setSanityError] = useState<string | null>(null);

  const handleSanityTest = async () => {
    setSanityResult(null);
    setSanityError(null);
    try {
      const result = await sanityTest();
      setSanityResult(result.message || 'Sanity test passed!');
    } catch (error) {
      setSanityError('Sanity test failed');
    }
  };

  return (
    <Container>
      <RestaurantForm />
      <Button onClick={handleSanityTest}>Run Sanity Test</Button>
      {sanityResult && <Alert variant="success">{sanityResult}</Alert>}
      {sanityError && <Alert variant="danger">{sanityError}</Alert>}
    </Container>
  );
};

export default RRegistrationPage;
