import { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCcw } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
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
              fill="#F3F4F6"
              stroke="#111827"
              strokeWidth="8"
            />
            <path
              d="M60 60L140 140M140 60L60 140"
              stroke="#111827"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="text-4xl font-bold text-black mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            We're sorry for the inconvenience. Please try again later.
          </p>
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded transition-colors hover:bg-gray-800 flex items-center"
            onClick={() => this.setState({ hasError: false })}
          >
            <RefreshCcw size={20} className="mr-2" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
