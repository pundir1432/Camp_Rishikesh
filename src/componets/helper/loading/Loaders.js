import React from 'react';
import { Spinner } from 'react-bootstrap';

export const ButtonLoading = () => (
  <Spinner animation="border" size="sm" />
);

export const PageLoading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
    <Spinner animation="border" />
  </div>
);