import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Addbtn from '../components/Addbtn.jsx';
import Navi from "../components/Navi.jsx"
import { SquareX } from 'lucide-react';
import api from '../api/api.jsx';

const Notes = () => {
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        api.get("/notes")
        .then((res) => {
            setNotes(res.data.notes)
        })
        .catch((err) => {
            console.error("Failed to fetch notes: ",err)
        })
    },[])


    const deleteNote = async(id) => {
        try {
            await api.delete(`/notes/${id}`)
            
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)
    );
        } catch (error) {
            console.log("Failed to delete note: ",error)
        }
    }

  return (
    <div className='bg-[#22242a] mb-16'>
        
        <div className='min-h-screen relative'>
        <h1 className='text-white text-3xl font-extrabold absolute top-6 left-8'>Collections:</h1>
        <section className='flex flex-col flex-wrap justify-center items-center gap-6 p-4'>

        {notes.length > 0 ? (
            notes.map((note)=> (
            <div key={note._id} className='h-auto w-96 bg-slate-500 text-white rounded-2xl p-4 first:mt-20 relative'>

                <button className='absolute right-5' onClick={()=>deleteNote(note._id)}>
                    <SquareX size={30} color="#90a1b9" strokeWidth={1.5} />
                </button>

                <h1 className='text-2xl p-1 ml-2 font-black tracking-wider'>{note.title}</h1>
                <h3 className='text-md p-1 ml-2 font-bold tracking-wide leading-7'>{note.description}</h3>
            </div>
            ))
        ) : (
            <h1 className='text-white content-center mt-40 '>No Notes to show</h1>
        )
    }   
        <Addbtn/>
        </section>
        <Navi/>
        </div>
    </div>
  )
}

export default Notes