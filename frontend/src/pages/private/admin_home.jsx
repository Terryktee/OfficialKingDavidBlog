import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Admin_Home() {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = () => {
        // Clear tokens from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        // Redirect to the login page
        navigate('/admin');
    };

    return (
        <>
            <div className="flex space-x-10">
                <div className="SideBar w-1/4 bg-yellow-400 h-screen rounded-lg">
                    <div className="text-center">
                        <h1 className="text-center font-bold text-[2rem]">Welcome!</h1>
                        <span className="text-center font-bold text-[2rem]">King David</span>
                    </div>
                    <div className="px-2 py-4 text-2xs flex flex-col gap-y-5">
                        {[
                            ['Dashboard (Under Construction)', 'url',1],
                            ['Create Post', 'createpost',2],
                            ['Manage Post', 'managepost',3],
                            ['Add New Account', 'url',4],
                            ['Log Out', handleLogout,5],
                        ].map(([item, action,index]) => (
                            <Link 
                                to={typeof action === 'string' ? action : '#'}
                                key={index}
                                onClick={typeof action === 'function' ? action : undefined}
                                className="font-bold text-white hover:bg-red-400 hover:rounded-lg hover:px-4"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="content-side w-2/3">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
