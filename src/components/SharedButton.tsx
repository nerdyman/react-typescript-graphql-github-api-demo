import React from 'react';
import { Button, ButtonProps } from 'reakit/Button';

export const SharedButton: React.FC<ButtonProps> = props => (
    <Button {...props} />
);
