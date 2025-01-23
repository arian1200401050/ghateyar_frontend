import ToolBar from './toolBar.js';
import NavBar from './navBar.js';

export default function Header () {
    return ( 
        <div id="header" className="pt-2 pb-1 px-3 bg-gray">
            <ToolBar />
            <NavBar />
        </div>
    ); 
};