import { useNavigate } from 'react-router-dom'
import  Noteappdesign  from "../assets/Noteappdesign.jpeg"
import { ArrowRight } from 'lucide-react';

const Land = () => {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }


  return (
    <div className='h-screen bg-[#FAF9F6] p-2 flex flex-col justify-center relative'>

      <div className='flex flex-col items-center justify-center'>
        <img src={Noteappdesign} alt="NoteNest" className="h-40 w-60 object-contain" />
        <h1 className="text-[#2D3142] font-black text-[50px] font-caveat mt-8">NoteNest</h1>
        <p className="font-poppins text-[#6B7080] text-[14px] leading-5 tracking-wide">Capture your thoughts, <br /><span>build a better tomorrow</span></p>
      </div>

      <div className="flex items-center justify-center gap-2 p-4 mb-8"> 
        <div className="h-0.5 w-10 bg-[#6C63D9]" />
        <span>💜</span>
        <div className="h-0.5 w-10 bg-[#6C63D9]" />
      </div>

      <section className='flex flex-col gap-4 items-center'>
        <div className="px-4 items-center w-full relative">          
          <button type="button" onClick={handleLogin} className="bg-[#8881DD] px-6 py-4 rounded-xl text-white font-poppins font-semibold text-[16px] cursor-pointer w-full tracking-wide hover:bg-[#7770D0] disabled:opacity-60 disabled:cursor-not-allowed">
            Log In<ArrowRight  strokeWidth={2} size={22} color="white" className='absolute right-10 top-1/2 -translate-y-1/2' />
          </button>
        </div>
        <div className="px-4 w-full relative">
          <button type="button" onClick={handleSignup} className="bg-[#ffffff] px-6 py-4 rounded-xl text-[#8881DD] font-poppins font-semibold text-[16px] border-[#8881DD] border-2 cursor-pointer w-full tracking-wide hover:bg-[#F1F0FC] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            Sign Up<ArrowRight  strokeWidth={2} size={22} color="#8881DD" className='absolute right-10 top-1/2 -translate-y-1/2' />
          </button>            
        </div>
      </section>

      <div className='absolute bottom-6 inset-x-0 mx-auto w-fit'>
        <p className= 'text-[#6B7080]'>Your notes, Your space</p>
        <p className='text-center'>🩶</p>
      </div>

    </div>
  )
}

export default Land