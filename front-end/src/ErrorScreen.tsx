import React from 'react';

interface ErrorScreenProps {
  error: Error;
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
  let errorMessage = error.message;

if (errorMessage.includes('404')) {
  errorMessage = "404 Error: It seems we've lost this page in a book somewhere!";
} else if (errorMessage.toLowerCase().includes('network error') || errorMessage.includes('ERR_CONNECTION_REFUSED')) {
  errorMessage = "Network Error: Can't connect to the server. Please try again later.";
}


  return (
    <div className="error-screen">
      <h1>Oops!</h1>
      <p>{errorMessage}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorScreen;
