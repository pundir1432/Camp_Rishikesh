import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
    <Spinner animation="border" />
  </div>
);