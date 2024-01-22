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
  errorMessage = "Network Error: The server is busy reading a self-help book on 'How to Be a Better Server.";
}
else if (error.message.includes('500')) {
  errorMessage = "500 Error: There's a problem on our end. We're working on it!";
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
