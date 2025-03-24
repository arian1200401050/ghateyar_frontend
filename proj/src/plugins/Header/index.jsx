import ToolBar from "./toolBar.jsx";
import NavBar from "./navBar.jsx";

export default function Header() {
    return (
        <header id="header" className="pt-2 px-4 bg-secondary-400 text-right">
            <div className="max-w-(--main-section-xlarge-width) mx-auto">
                <ToolBar />
                <NavBar />
            </div>
        </header>
    );
}
