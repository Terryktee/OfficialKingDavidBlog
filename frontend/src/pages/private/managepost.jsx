import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagePost() {

    const navigate = useNavigate(); 
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin'); // Redirect to login if not authenticated
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/private/posts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the headers
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            <h1 className="font-bold text-[2rem]">My Articles</h1>
            <div className="flex flex-wrap gap-7">
                {posts.map(post => (
                    <div key={post.id} className="space-y-2 lg:relative flex flex-row-reverse justify-between w-screen lg:justify-normal lg:flex-col lg:w-[13rem] rounded-lg">
                        <img className="w-1/3 lg:object-cover object-fit lg:object-center lg:w-[15rem] h-[7rem] rounded-lg hover:rotate-6 transition-all" src={post.image} alt={post.title} />
                        <div className="px-3 py-2">
                            <Link to={`/modify/${post.id}`} className="hover:underline hover:text-yellow-400 font-bold">{post.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
