import Nav from './nav';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const textAreaRef = useRef(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); // State for external image link
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [val,setVal] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id } = useParams();
    var image_url;
    //Exsting Image
    const [existingImage, setExistingImage] = useState(""); // State for existing image URL

    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =  textAreaRef.current.scrollHeight + "px";
    },[val]);
    
    const getCsrfToken = () => {
        const cookies = document.cookie.split('; ');
        const csrfCookie = cookies.find(cookie => cookie.startsWith('csrftoken='));
        return csrfCookie ? csrfCookie.split('=')[1] : null;
    };

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/private/posts/${id}/`);
            setTitle(response.data.title);
            setBody(response.data.body);
            setImage(response.data.image);
            image_url = response.data.image
          } catch (err) {
            setError('Post not found');
          }
        };
        fetchPost();
      }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
            return;
        }
    }, [navigate]);

    const handleContentChange = (e) => {
        setBody(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            insertImage(url, file.name);
            setImage(file); // Store the selected image for upload

        }else{
            setImage(URL.createObjectURL(image_url));
        }
    };

    const insertImage = (url, altText) => {
        const markdownImage = `![${altText}](${url})`;
        setBody(prevBody => `${prevBody}\n${markdownImage}`); // Append the image markdown to body
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    const UpdatePostInfo = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const token = localStorage.getItem('token');
        const csrfToken = getCsrfToken();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        if (image) {
            formData.append('image', image);
        }else{
            formData.append('image',existingImage)
        }

        try {
            const response = await axios.patch(`http://localhost:8000/private/posts/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                },
            });
            setMessage("Post updated  successfully!");
            
        } catch (error) {
            if (error.response) {
                setMessage('Error: ' + (error.response.data.detail || 'Something went wrong.'));
            } else {
                setMessage('Network error: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleExternalImageInsert = () => {
        if (imageUrl) {
            const markdownImage = `![Image](${imageUrl})`;
            setBody(prevBody => `${prevBody}\n${markdownImage}`); // Append external image markdown
            setImageUrl(""); // Clear input after inserting
            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
        }
    };
    return (
        <>
            <Nav />
            <div className="relative w-full max-w-7xl px-2 sm:px-8 lg:px-0 mx-auto py-4 md:py-4 max-w-screen-md ">
                <div className="article-form">
                    <input
                        type="text"
                        className="py-2 outline-none rounded-lg font-bold text-[1rem] focus:border-2 w-[50rem]"
                        placeholder="Heading"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="article flex flex-col">
                    <div className="p-2 w-[30rem]">
                        <textarea
                            className="py-2 focus:outline-rounded-lg active:outline-none w-[50rem]"
                            placeholder="Start writing your article here"
                            value={body}
                            onChange={handleContentChange}
                            rows={10}
                            ref={textAreaRef}
                            required
                        />
                    </div>
                </div>
                <div className="flex">
                <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="image">Update Image:</label>
                    <input
                        type="file"
                        className="block w-full"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div> 
                  <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="imageUrl">Update Image URL:</label>
                    <input
                        type="text"
                        className="block w-full"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                    />
                    <button
                        type="button"
                        onClick={handleExternalImageInsert}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Insert Image
                    </button>
                </div> 
                </div>
                
                
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={UpdatePostInfo}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Post"}
                </button>
                {message && <div className="mt-4 text-green-600">{message}</div>}
            </div>
        </>
    );
};

export default UpdatePost;
