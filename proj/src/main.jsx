import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Import root app
import App from "#src/pages/App/index.jsx";

createRoot(document.getElementById("root")).render(
	<App />
);
