import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api.jsx"
import logo from "../assets/logo.png"
import { Mail, LockKeyhole, Eye, EyeOff, UserRoundKey  } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const response = await api.post(
                "/auth/login",{
                    email,
                    password,
                }
            )

            const data = response.data

            login(data.token, data.user)

            navigate("/notes")

        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed."
            )
        } finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="h-dvh w-full bg-[#FAF9F6] flex justify-center items-center">

        <div className="flex flex-col max-w-md lg:max-w-md items-center justify-center w-full p-4">

            <img src={logo} alt="NoteNest" className="h-40 w-60 object-contain" />
            <h1 className="text-[#2D3142] font-black text-[50px] font-caveat">NoteNest</h1>

            <div className="w-full flex flex-col items-start p-6 mb-4">   
                <h3 className="font-poppins font-semibold text-[26px] text-[#2D3142] text-left">Welcome!</h3>
                <p className="font-poppins text-[#6B7080] text-[14px] leading-5 w-60 text-left">Log in to continue writing <br /><span>your thoughts.</span></p>
            </div>        

            <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-md flex flex-col gap-6">

                <div className="flex flex-col items-start px-6"> 
                    <label htmlFor="email" className="font-poppins font-medium text-[14px] text-[#2D3142]">Email Address</label>
                    <div className="w-full relative">
                        <Mail strokeWidth={1.5} size={22} className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white font-poppins text-[14px] text-[#6B7080] border w-full rounded-md py-4 px-12 outline-none focus:border-[#8881DD] focus:ring-2 focus:ring-[#8881DD]/20"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start px-6">
                    <label htmlFor="password" className="font-poppins font-medium text-[14px] text-[#2D3142]">Password</label>
                    <div className="w-full relative">
                        <LockKeyhole strokeWidth={1.5} size={22} className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                            className="bg-white font-poppins text-[14px] text-[#6B7080] border w-full rounded-md py-4 px-12 outline-none focus:border-[#8881DD] focus:ring-2 focus:ring-[#8881DD]/20"
                        />
                    
                        <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={togglePassword}>
                            {showPassword ? <EyeOff strokeWidth={1.5} size={22} /> : <Eye strokeWidth={1.5} size={22} />}    
                        </button>
                    </div>
                    
                </div>

                {error && <p role="alert" className="px-6 text-center text-sm font-medium text-red-600">{error}</p>}

                <div className="px-6 flex flex-row items-center relative">
                    
                    <button type="submit" disabled={isLoading} className="bg-[#8881DD] px-6 py-3 rounded-md text-white font-poppins font-semibold text-[16px] cursor-pointer w-full tracking-wide hover:bg-[#7770D0] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <UserRoundKey strokeWidth={2} size={22} color="white" />{isLoading ? "Logging in..." : "Log In"}
                    </button>
                    
                </div>
            </form>

            <p className="flex flex-col items-center py-4 italic tracking-wide">
                Don't have an account?{" "}
                
                <Link to="/signup" className="text-[#8881DD] font-extrabold not-italic">
                    Sign Up
                </Link>
            </p>
            <br />

            <div className="flex items-center justify-center gap-2"> 
                <div className="h-0.5 w-10 bg-[#6C63D9]" />
                <span>💜</span>
                <div className="h-0.5 w-10 bg-[#6C63D9]" />
            </div>

            </div>
        </div>
    );
};

export default Login;