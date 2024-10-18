import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

export default function sidepost() {
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

        <div className="w-screen md:flex md:flex-col md:h-[30rem] md:space-y-4 space-y-12">

            {
                posts.slice(0,1).map(post => (
                    <div key={post.id} className="md:flex  md:h-[18rem] bg-yellow-400 rounded-lg h-screen">
                        <img className="object-fill md:w-[45rem] h-1/2 md:h-auto rounded-lg w-screen" src={post.image} />
                        <div className="px-4 py-4 space-y-3 md:px-6 md:py-4 md:space-y-6">
                            <p>Media</p>
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <p>{post.author}</p>
                        </div>
                    </div>
                )
                )
            }

            <div className="sm:gap-y-4 lg:gap-0 md:flex md:flex-wrap md:h-[13rem] lg:space-x-6 ">
                {
                    posts.slice(6, 10).map(post => (

                        <div className=" space-y-4 lg:relative flex flex-row-reverse justify-between w-screen lg:justify-normal lg:flex-col lg:w-[14rem] rounded-lg ">
                            <img className="lg:object-cover object-fit lg:object-center w-[14rem] h-[7rem] rounded-lg hover:rotate-6 transition-all" src={post.image} />
                            <div className="px-3 py-2 " key={post.id}>
                                <Link to={`/article/${post.slug}`}  className="hover:underline hover:text-yellow-400 text-bold text-wrap font-bold">{post.title}</Link>
                                <div className="lg:px-3 lg:py-2">
                                    <p className="lg:absolute lg:inset-x-2 lg:bottom-0">By <span className="font-bold">{post.author}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}