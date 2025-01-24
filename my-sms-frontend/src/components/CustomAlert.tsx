import React from 'react';
import {
    Alert as UIAlert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'; // Assuming you have 'lucide-react' installed

type AlertProps = {
    type: 'error' | 'success' | 'warning';
    title: string;
    description: string;
};

function CustomAlert({ type, title, description }: AlertProps) {
    let icon;
    let variant;

    switch (type) {
        case 'error':
            icon = <AlertCircle className="h-4 w-4" />;
            variant = 'destructive';
            break;
        case 'success':
            icon = <CheckCircle className="h-4 w-4" />;
            variant = 'positive';
            break;
        case 'warning':
            icon = <AlertTriangle className="h-4 w-4" />;
            variant = 'warning';
            break;
        default:
            icon = null;
            variant = '';
    }

    return (
        <UIAlert variant={variant}>
            {icon}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </UIAlert>
    );
}

export default CustomAlert;
