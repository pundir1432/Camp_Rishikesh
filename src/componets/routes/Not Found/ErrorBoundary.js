import React from 'react';
import { FaExclamationTriangle,  } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { LuRefreshCcw } from 'react-icons/lu';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }



  render() {

    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
          <div className="text-center p-5 bg-white rounded-4 shadow-sm" style={{ maxWidth: '600px' }}>
            <div className="mb-4">
              <div className="d-flex justify-content-center">
                <div className="bg-danger bg-opacity-10 p-4 rounded-circle">
                  <FaExclamationTriangle size={48} className="text-danger" />
                </div>
              </div>
            </div>

            <h1 className="display-5 fw-bold mb-3">404 - Page Not Found</h1>
            <p className="lead mb-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <Button variant="success" size="lg" onClick={() => window.location.reload()}>
                <LuRefreshCcw className="me-2" />  Refresh
              </Button>


            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
