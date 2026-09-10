import api from "../api/api.jsx"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { UserRound, Mail, LockKeyhole, Eye, EyeOff, UserRoundPlus } from 'lucide-react';
import logo from "../assets/logo.png"

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
        await api.post("/auth/signup", {
            name,
            email,
            password,
        });

        navigate("/login");

    } catch (error) {
        setError(
            error.response?.data?.message || "Signup failed."
        );
    } finally {
        setIsLoading(false);
    }
};


  return (
     <div className="h-dvh w-full bg-[#FAF9F6] flex justify-center items-center">

        <div className="flex flex-col max-w-md lg:max-w-full items-center justify-center w-full p-4">

            <img src={logo} alt="NoteNest" className="h-40 w-60 object-contain" />
            <h1 className="text-[#2D3142] font-black text-[50px] font-caveat">NoteNest</h1>


            <h3 className="font-poppins font-semibold text-[26px] text-[#2D3142]">Create your account</h3>

            <p className="font-poppins text-[#6B7080] text-[14px] leading-5 w-60 text-center">A little space for your thoughts, <span>ideas and dreams.</span></p>

            <div className="flex items-center justify-center gap-2"> 
                <div className="h-0.5 w-10 bg-[#6C63D9]" />
                <span>💜</span>
                <div className="h-0.5 w-10 bg-[#6C63D9]" />
            </div>

        

            <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-md flex flex-col gap-6">

                <div className="flex flex-col items-start px-6">
                    <label htmlFor="name" className="font-poppins font-medium text-[14px] text-[#2D3142]">Full Name</label>
                    <div className="relative w-full">
                        <UserRound strokeWidth={1.5} size={22} className="absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-white font-poppins text-[14px] text-[#6B7080] border w-full rounded-md py-3 px-12 outline-none focus:border-[#8881DD] focus:ring-2 focus:ring-[#8881DD]/20"
                        />
                    </div>
                    
                </div>

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
                            className="bg-white font-poppins text-[14px] text-[#6B7080] border w-full rounded-md py-3 px-12 outline-none focus:border-[#8881DD] focus:ring-2 focus:ring-[#8881DD]/20"
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
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                            className="bg-white font-poppins text-[14px] text-[#6B7080] border w-full rounded-md py-3 px-12 outline-none focus:border-[#8881DD] focus:ring-2 focus:ring-[#8881DD]/20"
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
                        <UserRoundPlus strokeWidth={2} size={22} color="white"/>{isLoading ? "Creating account..." : "Create Account"}
                    </button>
                    
                </div>
            </form>
            <p className="flex flex-col items-center py-4 italic tracking-wide mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-[#8881DD] font-extrabold not-italic">
                    Log In
                </Link>
            </p>
            </div>
        </div>
  )
}

export default Signup