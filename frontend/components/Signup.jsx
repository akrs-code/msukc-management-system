import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from '../src/assets/msukc.jpg'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signup, isLoading, error, success } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, email, password);
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA] p-4">
            {/* Fullscreen Form */}
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <img src={logo} className="mx-auto w-20 h-20" alt="MSUKC Logo" />
                    <h3 className="text-2xl font-bold text-gray-800 text-center font-cinzel">Get Started</h3>
                    <p className="text-gray-600 text-sm text-center mb-4 font-montserrat">
                        Create an account or log in to explore MSUKC
                    </p>
                    <hr className="border-gray-300" />

                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1 font-montserrat">Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BB2A1D] placeholder:text-sm placeholder:font-montserrat"
                            placeholder="********"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-8.5 text-gray-500 focus:outline-none"
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#BB2A1D] font-roboto text-white py-2 px-3 text-sm rounded-md hover:bg-[#922019] transition-colors disabled:opacity-50 font-semibold"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>

                    {error && <div className="text-red-500 mt-2 text-center text-sm font-montserrat">{error}</div>}
                    {success && <div className="text-green-500 mt-2 text-center text-sm font-montserrat">{success}</div>}

                    <p className="mt-4 text-center text-sm text-gray-600 font-montserrat">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#BB2A1D] font-semibold hover:underline font-montserrat">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
