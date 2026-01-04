import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from '../src/assets/msukc.jpg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = await login(email, password);

        if (!userData) return;
        if (userData.role === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA] p-4">
            {/* Fullscreen Form */}
            <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <img src={logo} className="mx-auto w-20 h-20" alt="MSUKC Logo" />
                    <h3 className="text-2xl font-bold text-gray-800 text-center font-cinzel">Welcome Back</h3>
                    <p className="text-gray-600 text-sm text-center mb-4 font-montserrat">
                        Happy to see you again! Log in to access your account
                    </p>
                    <hr className="border-gray-300" />

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
                        <div
                            className="absolute right-3 top-8.5  text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full font-semibold bg-[#BB2A1D] text-white py-2 text-sm rounded-md font-roboto hover:bg-[#922019] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {error && <div className="text-red-500 mt-2 text-center">{error}</div>}


                    <p className="mt-4 text-center text-sm text-gray-600 font-montserrat">
                        Don’t have an account?{' '}

                        <Link to="/signup" className="text-[#BB2A1D] font-montserrat font-semibold hover:underline">Sign Up</Link>
                    </p> 
                </form>
            </div>
        </div>
    );
};

export default Login;
