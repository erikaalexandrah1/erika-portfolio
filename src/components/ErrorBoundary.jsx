import { Component } from "react";

/**
 * Captura errores de render en el árbol hijo (incluye fallos al cargar un
 * chunk lazy o una escena que lanza) y muestra un fallback en vez de dejar
 * la app en pantalla en blanco.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid place-items-center w-full h-screen bg-black text-white text-center px-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Something went wrong
            </h1>
            <p className="mt-2 text-white/60">
              An unexpected error occurred. Please reload the page.
            </p>
            <a
              href="/"
              className="inline-block mt-6 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
            >
              Back home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
