import React from 'react';

export class SharedErrorBoundary extends React.Component {
    public state = { hasError: false };

    public static getDerivedStateFromError(/*error*/) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: any, info: any) {
        console.error(error, info); // eslint-disable-line no-console
    }

    public render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
