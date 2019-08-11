import React from 'react';
import ReactDOM from 'react-dom';

import { SharedModal, useSharedModal } from '../SharedModal';

it('Should render without crashing', () => {
    const div = document.createElement('div');

    const WrappedComponent = () => {
        const sharedModalProps = useSharedModal();
        return <SharedModal {...sharedModalProps}>Test</SharedModal>;
    };

    ReactDOM.render(<WrappedComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
});
