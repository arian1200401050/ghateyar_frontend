export default function NotFound ({children}) {
    return ( 
        <div className="mt-10 mb-10 p-4">
            <div className="rounded-sm shadow-gray-300 shadow-sm px-4 py-10 bg-gray-100">
                <h1 className="text-xl text-yellow-900">
                    {children}
                </h1>
            </div>
        </div>
    );
}