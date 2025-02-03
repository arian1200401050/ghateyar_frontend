import config from "../../config.js";

function ToolBar() {
    return (
        <div className="Container main-container px-5">
            <div className="Row">
                <div className="Col">
                    <span className="badge bg-primary-1 fs-5 tool-bar__log-title">
                        {config.SITE_TITLE}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ToolBar;
