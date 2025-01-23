import config from '../../config.js'

function ToolBar () {
    return (  
        <div className="Container main-container">
            <div className="Row">
                <div className="Col">
                    <span className="badge bg-purple fs-5">{config.SITE_TITLE}</span>
                </div>
            </div>
        </div>
    );
}

export default ToolBar ;