import { useNavigate } from 'react-router-dom'
import Savebtn from '../components/Savebtn.jsx'
import Navi from "../components/Navi.jsx"
import api from "../api/api.jsx"
import { ArrowLeft } from 'lucide-react';

const CreateNote = () => {

  const navigate = useNavigate()

  const backbtn = () => {
    navigate("/notes")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = {
      title: formData.get("title"),
      description: formData.get("description")
    }

    try {
      await api.post("/notes", data)
      navigate("/notes")
    } catch (error) {
      console.error("Failed to create note: ", error)
    }
    
  }

  return (
    <div className='h-screen bg-[#FAF9F6]'>

      <Navi/>

      <div className='relative'>
        <button
        type='button'
        aria-label="Back to notes"
        onClick={backbtn} 
        className='absolute top-6 left-6'>
          <ArrowLeft color='#6C63D9' size={36} />
        </button>
      </div>

      <section className='min-h-screen flex items-start px-6 py-8'>
        
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-full'>

          <input type="text" name= "title" placeholder='Title' required 
          className='text-5xl text-[#2D3142] font-black font-caveat tracking-wider px-4 py-2 rounded-xl outline-none mt-12' />

          <textarea name="description" placeholder='Description' 
          className='text-xl text-[#6B7080] font-poppins h-[70%] px-4 tracking-wide leading-8 rounded-xl outline-none' />

          <Savebtn/>

        </form>
          
      </section>
    </div>
  )
}

export default CreateNote