import { useNavigate } from 'react-router-dom'
import Addbtn from '../components/Addbtn.jsx'
import Savebtn from '../components/Savebtn.jsx'
import Navi from "../components/Navi.jsx"
import api from "../api/api.js"

const CreateNote = () => {

  const navigate = useNavigate()

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
    <>
    <Navi/>
    <section className='min-h-screen bg-[#22242a] border-amber-100 flex justify-center items-start p-12'>
    
      <form onSubmit={handleSubmit} className='h-[88vh] text-white flex flex-col gap-10 max-w-85'>

        <input type="text" name= "title" placeholder='Title' required 
        className='text-3xl font-bold tracking-wider p-4 rounded-2xl outline-none' />

        <textarea name="description" placeholder='Description' 
        className='text-lg h-[70%] p-2 tracking-wide leading-8 rounded-xl outline-none' />

        <Savebtn/>

      </form>
        
    </section>
    </>
  )
}

export default CreateNote