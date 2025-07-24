import React, { useEffect } from 'react';
import ErrorBoundary from './componets/routes/Not Found/ErrorBoundary';
import Routes from './componets/routes/Routes';

const App = () => {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener('popstate', handleScroll);
    return () => window.removeEventListener('popstate', handleScroll);
  }, []);



  return (
    <div className="home-bg-img">
      <ErrorBoundary>
            <Routes />
      </ErrorBoundary>
    </div>
  );
};

export default App;