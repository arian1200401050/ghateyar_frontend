import { Helmet } from "react-helmet";


export default function NotFoundPage() {
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>یافت نشد</title>    
            </Helmet>

            <h1>NotFoundPage</h1>    
        </div>
    );
}
