import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Import root app
import App from "#src/pages/App/index.jsx";

// Import main resources
import "#src/styles/main.scss";

createRoot(document.getElementById("root")).render(
	<App />
);
