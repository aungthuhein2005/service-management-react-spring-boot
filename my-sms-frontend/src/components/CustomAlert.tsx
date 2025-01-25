import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

function CustomAlert({ message, variant }) {
  let icon, title;

  switch (variant) {
    case 'success':
      icon = <CheckCircle className="h-4 w-4" />;
      title = 'Success';
      break;
    case 'warning':
      icon = <AlertTriangle className="h-4 w-4" />;
      title = 'Warning';
      break;
    case 'error':
    default:
      icon = <AlertCircle className="h-4 w-4" />;
      title = 'Error';
      break;
  }

  return (
    <div>
      <Alert variant={variant}>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}

export default CustomAlert;
