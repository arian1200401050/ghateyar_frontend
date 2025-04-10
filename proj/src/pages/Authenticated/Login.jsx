import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '#src/context/AuthContext';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, error, user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(username, password);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(user)
    if (user) {
        if (user.is_superuser) {
            return <Navigate to="/admin" />;
        }
        <Navigate to="/" />;
    }

    return (
        <div className="flex items-center justify-center py-40 px-4 sm:px-6 lg:px-8">
            <div className="w-fit bg-secondary-400 px-32 py-16 rounded-lg shadow shadow-gray-400">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        ورود به حساب کاربری
                    </h2>
                </div>
                <form className="mt-8 space-y-6 min-w-99" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-6">
                            <label htmlFor="username" className="sr-only">
                                نام کاربری
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-800 text-gray-900 bg-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                                placeholder="نام کاربری"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="password" className="sr-only">
                                رمز عبور
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-800 text-gray-900 bg-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                                placeholder="رمز عبور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-lg font-semibold text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 
                                border border-transparent cursor-pointer text-base font-medium rounded-md 
                                text-white bg-fourth-400 hover:bg-fourth-500 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-fourth-500"
                        >
                            {isLoading ? 'تایید...' : 'تایید'}
                        </button>
                    </div>

                    <div className="text-base text-center">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-fourth-500 hover:text-fourth-600"
                        >
                            رمز عبور خود را فراموش کرده اید؟
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};