import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
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
    <div className='h-dvh bg-[#FAF9F6] p-2 flex flex-col justify-start relative'>

  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:h-dvh lg:px-12'>

    {/* Left side - Logo & branding */}
    <div className='flex flex-col items-center lg:flex-1 lg:max-w-lg'>
      <img src={logo} alt="NoteNest" className="h-60 w-60 lg:h-72 lg:w-72 object-contain" />
      <h1 className="text-[#2D3142] font-black text-[50px] lg:text-[64px] font-caveat">NoteNest</h1>
      <p className="font-poppins text-[#6B7080] text-[14px] lg:text-[16px] leading-5 lg:leading-7 tracking-wide mt-8 text-center">
        Capture your thoughts, <br /><span>build a better tomorrow</span>
      </p>

      {/* Divider */}
      <div className="hidden lg:flex items-center justify-center gap-2 p-4 mt-8"> 
        <div className="h-0.5 w-10 bg-[#6C63D9]" />
        <span>💜</span>
        <div className="h-0.5 w-10 bg-[#6C63D9]" />
      </div>
    </div>

    {/* Divider - mobile only (original position) */}
    <div className="lg:hidden flex items-center justify-center gap-2 p-4 mb-8 mt-8"> 
      <div className="h-0.5 w-10 bg-[#6C63D9]" />
      <span>💜</span>
      <div className="h-0.5 w-10 bg-[#6C63D9]" />
    </div>

    {/* Right side - Actions */}
    <section className='flex flex-col gap-4 items-center lg:flex-1 lg:max-w-md lg:gap-5'>

      <div className="px-4 lg:px-0 items-center w-full relative mt-8 lg:mt-0">          
        <button 
          type="button" 
          onClick={handleLogin} 
          className="bg-[#8881DD] px-6 py-4 rounded-xl text-white font-poppins font-semibold text-[16px] cursor-pointer w-full tracking-wide hover:bg-[#7770D0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          Log In
          <ArrowRight strokeWidth={2} size={22} color="white" className='absolute right-10 lg:right-8 top-1/2 -translate-y-1/2' />
        </button>
      </div>

      <div className="px-4 lg:px-0 w-full relative">
        <button 
          type="button" 
          onClick={handleSignup} 
          className="bg-[#ffffff] px-6 py-4 rounded-xl text-[#8881DD] font-poppins font-semibold text-[16px] border-[#8881DD] border-2 cursor-pointer w-full tracking-wide hover:bg-[#F1F0FC] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          Sign Up
          <ArrowRight strokeWidth={2} size={22} color="#8881DD" className='absolute right-10 lg:right-8 top-1/2 -translate-y-1/2' />
        </button>            
      </div>

      {/* Footer - inline on desktop */}
      <div className='lg:hidden flex flex-col justify-center items-center absolute bottom-6 inset-x-0 mx-auto w-fit'>
        <p className='text-[#6B7080]'>Your notes, Your space</p>
        <p className='text-center'>🩶</p>
      </div>
    </section>

  </div>

  {/* Footer - desktop version pinned bottom */}
  <div className='hidden lg:flex flex-col justify-center items-center absolute bottom-6 inset-x-0 mx-auto w-fit lg:mb-24'>
    <p className='text-[#6B7080]'>Your notes, Your space</p>
    <p className='text-center'>🩶</p>
  </div>

</div>
  )
}

export default Land