import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios  from 'axios';

export default function Sidebar() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts/')
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    return (
        <div className="h-[0.1rem] invisible lg:visible mt-4 rounded-lg bg-yellow-400 p-2 w-80 lg:h-[30rem] divide-y divide-dashed">
            <h1 className="h-[5rem] text-[1.5rem] text-center font-bold text-white">Trending Articles</h1>
            {
               posts.slice(0, 5).map(post => (
                    <p key={post.id} className="h-[5rem] font-bold text-white">
                        <Link to={`/article/${post.slug}/`} >{post.title} </Link>
                    </p>
                )
                )
            }
        </div>
    )
}