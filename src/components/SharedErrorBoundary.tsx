import React from 'react';

interface SharedErrorBoundaryState {
    hasError: boolean;
}

export class SharedErrorBoundary extends React.Component {
    public state: SharedErrorBoundaryState = { hasError: false };

    public static getDerivedStateFromError(/*error*/): SharedErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: any, info: any): void {
        console.error(error, info); // eslint-disable-line no-console
    }

    public render(): React.ReactNode {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
