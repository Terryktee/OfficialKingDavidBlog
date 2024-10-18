import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [csrfToken,setCsrfToken] = useState("");
    const navigate = useNavigate(); // Initialize navigate
    
    axios.defaults.withCredentials = true;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        //const csrfToken = getCsrfToken(); // Get CSRF token from cookies

        try {
            const response = await axios.post('https://terryktee.pythonanywhere.com/api/token/', {
                username: username,
                password: password,
        },
         {
            withCredentials: true,
            });

            // Store the token in local storage
            const { token, refreshToken } = response.data;

      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('Token Received: ' , token , refreshToken)
            setMessage("Login successful!");
            // Redirect to /admin/home
            navigate('/home'); // Redirect after successful login

        } catch (error) {
            if (error.response) {
                setMessage('Error: ' + (error.response.data.detail || 'Login failed.'));
            } else {
                setMessage('Network error: ' + error.message);
            }
        }
    };

    return (
        <div className="grid place-items-center py-24">
            <div className="w-[25rem] bg-yellow-400 py-8 rounded-lg px-8">
                <h1 className="text-2xl text-center font-bold">Hello! <br />Welcome Back</h1>
                <form  className="flex flex-col py-5 gap-y-5 py-4" onSubmit={handleSubmit}>
                    <input
                        className="py-1 resize-x w-full px-5 rounded text-black"
                        type="text"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="py-1 resize-x w-full px-5 rounded text-black"
                        type="Password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                {message && <div className="mt-4 text-center text-red-600">{message}</div>}
            </div>
        </div>
    );
}
