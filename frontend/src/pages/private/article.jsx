import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import markdownit from 'markdown-it';
import Footer from "../../components/footer";

const md = new markdownit();

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // To handle navigation after deletion
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;
    const getCsrfToken = () => {
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
        return csrfCookie ? csrfCookie.split('=')[1] : null;
    };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin'); // Redirect to login if not authenticated
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://terryktee.pythonanywhere.com/private/posts/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          }
        });
        setPost(response.data);
      } catch (err) {
        setError('Post not found');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const HandleEdit = async () => {
    navigate(`/article/update/${post.id}`)
  }
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const csrfToken = getCsrfToken();
    if (!token) {
      navigate('/admin'); // Redirect to login if not authenticated
      return;
    }

    try {
      await axios.delete(`https://terryktee.pythonanywhere.com/private/posts/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
          'X-CSRFToken': csrfToken,

        },
            withCredentials: true,
      });
      navigate('home/managepost'); // Redirect to the posts list after deletion
    } catch (err) {
      console.log(err)
      setError('Error deleting the post');
    }
  };

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">404 Error</h1>
      <p className="mb-4">Page Not Found</p>
      <p>Please refresh the page; it might be a server issue.</p>
    </div>
  );

  if (!post) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse">Loading...</div>
    </div>
  );

  // Convert Markdown to HTML
  const htmlContent = md.render(post.body);

  return (
    <>
      <div className="relative w-full max-w-7xl px-4 sm:px-8 lg:px-12 mx-auto py-10 md:py-10 max-w-screen-md">
        <article>
          <header className="mb-8 flex flex-col">
            <div className="flex flex-row items-center mr-2 h-fit mb-6">
              <img src="https://www.profile.myself" alt="profile" height="50" width="50" loading="lazy" className="rounded-full mr-2 h-10 w-10 md:h-12 md:w-12" />
              <a href="#" className="text-sm md:text-base block leading-none">
                By
                <span className="hover:underline cursor-pointer font-medium"> {post.author}</span><br />
                <span className="text-xs md:text-sm"> Blogger, Writer</span>
              </a>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-200 w-fit p-1 mb-2 text-xs md:text-sm">Music</div>
                <div className="bg-zinc-200 w-fit p-1 mb-2 text-xs md:text-sm">Media</div>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                <time dateTime="2024-08-09 14:19:54" className="flex items-center text-zinc-600">
                  <span>{post.publish}</span>
                  <span className="h-4 w-0.5 rounded-full bg-zinc-300"></span>
                </time>
                <span className="h-4 w-0.5 rounded-full bg-zinc-300"></span>
                <span className="text-zinc-600"> 1 min</span>
              </div>
              <div className="flex flex-col mt-6 md:mt-0">
                <span className="text-xs text-zinc-600 hidden md:block">Options:</span>
                <div className="flex justify-between md:gap-6 items-center max-w-[250px]">
                  <button onClick={handleDelete} className="bg-red-100 rounded-lg">Delete</button>
                  <button onClick={HandleEdit} className="bg-yellow-400">Edit</button>
                </div>
              </div>
            </div>
          </header>
        </article>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
