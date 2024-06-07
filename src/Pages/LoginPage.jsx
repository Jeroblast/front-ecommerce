// src/components/LoginForm.js
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar.jsx";
import Cookies from 'js-cookie'

const LoginPage = () => {

        const [isLogged, setIsLogged] = useState(false);


        useEffect(() => {
            const jwtFromCookies = Cookies.get('jwt');

            if (jwtFromCookies) {
                setIsLogged(true);
            }
        }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            Cookies.set('jwt', data.access_token);
            // Handle successful login (e.g., save token, redirect)
        } catch (error) {
            console.error('Error:', error);
            // Handle login error
        }
    };

    return (
        <div>
            <Navbar />

            {isLogged ? (
                <p>Vous etes connecté</p>
            ) : (
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-gray-700 flex items-center">
                                Password
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="ml-2 cursor-pointer text-gray-700"
                                >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Connexion
                        </button>
                    </form>
                    <Link to="/Register">
                        <button
                            className="w-full mt-4 text-blue-500 py-2 rounded-md border border-blue-500 hover:bg-blue-50 transition duration-200">
                            S'inscrire
                        </button>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default LoginPage;
