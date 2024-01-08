import React from 'react';

interface ErrorScreenProps {
  error: Error;
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
  let errorMessage = error.message;

  // Check if it's a 404 error
  if (errorMessage.includes('404')) {
    errorMessage = "404 Error: It seems we've lost this page in a book somewhere!";
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
