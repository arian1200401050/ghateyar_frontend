/*
const __dirname = process.cwd();
import { addPath } from "app-module-path";
// import path from 'path';
addPath(__dirname);

import dotEnv from "dotenv";
dotEnv.config();
*/

// Import all the third party stuff
import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

// Import root app
import App from "./containers/App/index.js";

// Import main resources
import "./styles/main.scss";


const MOUNT_NODE = document.getElementById("root");
const root = createRoot(MOUNT_NODE);
root.render(<App />);
