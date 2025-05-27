import {Link} from 'react-router-dom';

import config from "#src/config.js";

function ToolBar() {
    return (
        <div className="Container main-container px-2 md:!px-10">
            <div>
                <div className="w-36 md:w-36 rounded-md overflow-hidden shadow-slate-400 shadow-xs
                    hover:shadow-[0 1px 1px 3px slate-600]">
                    <Link to="/" alt={config.SITE_TITLE}>
                        <img className="tool-bar__logo-title size-full py-1 px-3 bg-white"
                            src={`${config.MEDIA_ROOT}/${config.LOGO_PRIMARY}`} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ToolBar;
