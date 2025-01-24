import ToolBar from "./toolBar.js";
import NavBar from "./navBar.js";

import "./styles/navBar.scss";

export default function Header() {
    return (
        <header id="header" className="pt-2 pb-1 px-3 bg-gray">
            <ToolBar />
            <NavBar />
        </header>
    );
}
