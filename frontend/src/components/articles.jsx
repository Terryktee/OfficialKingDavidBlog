import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LatestArticles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://terryktee.pythonanywhere.com/api/posts/')
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);  

    return (
        <div className="lg:px-8 mt-[5rem] space-y-4">
            <h1 className="roboto-bold text-[2rem]">More Articles</h1>
            <div className="sm:gap-y-5 lg:gap-7 md:flex md:flex-wrap">
                {
                    posts.slice(0, 10).map(post => (
                        <div key={post.id} className="space-y-2 lg:relative flex flex-row-reverse justify-between w-screen lg:justify-normal lg:flex-col lg:w-[13rem] rounded-lg">
                            <img className="w-1/3 lg:object-cover object-fit lg:object-center lg:w-[15rem] h-[7rem] rounded-lg hover:rotate-6 transition-all" 
                                 src={post.image} 
                                 alt={post.title} />
                            <div className="px-3 py-2">
                                <Link to={`/posts/${post.id}`} className="hover:underline hover:text-yellow-400 font-bold">{post.title}</Link>
                                <div className="mt-6 lg:mt-auto lg:px-3 lg:py-2">
                                    <p className="lg:absolute lg:inset-x-2 lg:bottom-0">By <span className="font-bold">{post.author}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
