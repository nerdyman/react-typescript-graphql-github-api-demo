import React, { createContext, PureComponent,useContext } from 'react';

interface NetworkStatusState {
    /** Whether the network is online */
    isOnline: boolean;
}

const initialState: NetworkStatusState = {
    isOnline: !navigator.onLine,
};

const NetworkStatusContext = createContext(initialState);

export const useNetworkStatus = () => useContext(NetworkStatusContext);

/**
 * Provider to let consumers get network status
 */
export class NetworkStatusProvider extends PureComponent {
    public state: NetworkStatusState = initialState;

    private handleNetworkStatusEvent = (): void => {
        const isOnline = navigator.onLine;
        if (isOnline !== this.state.isOnline) {
            this.setState({ isOnline });
        }
    }

    public componentDidMount(): void {
        window.addEventListener('onLine', this.handleNetworkStatusEvent);
        window.addEventListener('offline', this.handleNetworkStatusEvent);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('onLine', this.handleNetworkStatusEvent);
        window.removeEventListener('offline', this.handleNetworkStatusEvent);
    }

    public render(): React.ReactElement {
        return (
            <NetworkStatusContext.Provider value={this.state}>
                {this.props.children}
            </NetworkStatusContext.Provider>
        );
    }
}
