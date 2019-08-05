import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { SharedBox } from './SharedBox';

export const useSharedModal = () => {
    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible(visible => !visible);
    const hide = () => setVisible(false);

    return {
        visible,
        hide,
        toggle,
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
            left="0"
            bottom="0"
            {...props}
        >
            {children}
        </SharedBox>,
        document.body,
    );
};

interface SharedModalProps {
    visible?: boolean;
    children: React.ReactNode;
    hide: () => void;
    toggle: () => void;
}

export const SharedModal: React.FC<SharedModalProps> = ({
    visible,
    children,
    hide,
    toggle,
    ...props
}) => {
    useEffect(() => {
        window.addEventListener('keydown', hide);
        return () => {
            window.removeEventListener('keydown', hide);
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
            <SharedBox
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
            </SharedBox>
        </SharedModalPortal>
    );
};
