import React from 'react';
import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog';

export const SharedDialog: React.FC = ({ children }) => {
    const dialog = useDialogState();
    return (
        <>
            <DialogDisclosure {...dialog}>Open dialog</DialogDisclosure>
            <Dialog {...dialog} aria-label="Welcome">
                {children}
            </Dialog>
        </>
    );
};
