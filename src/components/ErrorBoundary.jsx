// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || String(error) };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:40, textAlign:"center"}}>
          <h1 style={{color:"#C93B3B"}}>Ocorreu um erro</h1>
          <p>{this.state.message}</p>
          <p><small>Cheque o console para mais detalhes.</small></p>
          <button onClick={() => window.location.reload()} style={{padding:"8px 14px", borderRadius:6}}>Recarregar</button>
        </div>
      );
    }
    return this.props.children;
  }
}
