import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <svg
            className="w-64 h-64 mb-8"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="8"
            />
            <path
              d="M60 60L140 140M140 60L60 140"
              stroke="#EF4444"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            We're sorry for the inconvenience. Please try again later.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
