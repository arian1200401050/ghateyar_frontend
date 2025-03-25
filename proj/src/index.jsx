import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import contexts
import { ScreenWidthProvider } from "./context/ScreenWidthContext";

// Import root app
import App from "#src/App.jsx";

createRoot(document.getElementById("root")).render(
	<ScreenWidthProvider>
		<App />
	</ScreenWidthProvider>
);
