// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// React application entry point.
// StrictMode intentionally double-invokes certain lifecycle methods in development to catch side-effect bugs.

// document.getElementById("root") finds the <div id="root"> element in index.html — this is where the entire React app will be mounted.
// The "!" at the end is a TypeScript non-null assertion: it tells TypeScript "I'm sure this element exists, don't throw a type error if it could be null".
// ReactDOM.createRoot() creates a React root on that DOM node, enabling React 18's concurrent rendering features.
ReactDOM.createRoot(document.getElementById("root")!).render(
	// React.StrictMode is a development-only wrapper that activates extra warnings and checks.
	// It does NOT render any visible UI — it just helps catch potential problems early by running certain functions twice.
	<React.StrictMode>
		<App /> {/* The top-level App component — the entire application lives inside here */}
	</React.StrictMode>,
);
