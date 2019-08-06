import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import styled from '../utilities/styled';

import { SharedBox } from './SharedBox';

/**
 * Hook to control modal from parent
 */
export const useSharedModal = () => {
    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible(visible => !visible);
    const hide = () => setVisible(false);
    const handleEscDown = (ev: React.KeyboardEvent) => {
        if (ev.key === 'Escape') {
            hide();
        }
    };

    return {
        handleEscDown,
        hide,
        toggle,
        visible,
    };
};

/**
 * Portal for Modal
 */
export const SharedModalPortal: React.FC = ({ children, ...props }) => {
    return ReactDOM.createPortal(
        <SharedBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top="0px"
            right="0px"
            left="0px"
            bottom="0px"
            {...props}
        >
            {children}
        </SharedBox>,
        document.body,
    );
};

interface UseSharedModalProps {
    visible?: boolean;
    children: React.ReactNode;
    handleEscDown: (ev: any) => void;
    hide: () => void;
    toggle: () => void;
}

const SharedModalDialog = styled(SharedBox)`
    width: 100%;
    max-width: 35rem;
    max-height: 100vh;
    overflow-y: scroll;
`;

export const SharedModal: React.FC<UseSharedModalProps> = ({
    visible,
    children,
    handleEscDown,
    toggle,
    ...props
}) => {
    useEffect(() => {
        window.addEventListener('keydown', handleEscDown);
        return () => {
            window.removeEventListener('keydown', handleEscDown);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <SharedModalPortal {...props}>
            <SharedBox
                position="fixed"
                top="0px"
                left="0px"
                width="100%"
                height="100%"
                bg="uiOverlayBase"
                color="uiOverlayContrast"
                zIndex={5}
                onClick={toggle}
                role="presentation"
            />
            <SharedModalDialog
                p="whole"
                bg="uiBodyBase"
                color="uiBodyContrast"
                position="relative"
                borderRadius="1"
                zIndex={5}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
            >
                {children}
            </SharedModalDialog>
        </SharedModalPortal>
    );
};
