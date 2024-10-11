import Nav from './nav';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const textAreaRef = useRef(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); // State for external image link
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [val,setVal] = useState("");
    const navigate = useNavigate();

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
        }
    };

    const insertImage = (url, altText) => {
        const markdownImage = `![${altText}](${url})`;
        setBody(prevBody => `${prevBody}\n${markdownImage}`); // Append the image markdown to body
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    };

    const addPostInfo = async (e) => {
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
        }

        try {
            const response = await axios.post('http://localhost:8000/private/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,
                },
            });
            setMessage("Post created successfully!");
            setTitle("");
            setBody("");
            setImage(null);
            setImageUrl(""); // Reset image URL state
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
                    <label className="block text-gray-600" htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        className="block w-full"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div> 
                  <div className="mb-4">
                    <label className="block text-gray-600" htmlFor="imageUrl">Insert Image URL:</label>
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
                    onClick={addPostInfo}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Post"}
                </button>
                {message && <div className="mt-4 text-green-600">{message}</div>}
            </div>
        </>
    );
};

export default CreatePost;
