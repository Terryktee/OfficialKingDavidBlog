import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    
const error = useRouteError();
    return (

        <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2">404 Error</h1>
            <p className="mb-4">Page Not Found</p>
            <p>{error.statustext || error.message}</p>
        </div>
    )
}