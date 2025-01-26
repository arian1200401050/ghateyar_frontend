import ToolBar from "./toolBar.js";
import NavBar from "./navBar.js";

import "./styles/navBar.scss";

export default function Header() {
    return (
        <header id="header" className="pt-2 pb-1 px-4 bg-gray-1">
            <ToolBar />
            <NavBar />
        </header>
    );
}
