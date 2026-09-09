import { useState, useEffect } from 'react'
import Addbtn from '../components/Addbtn.jsx';
import Navi from "../components/Navi.jsx"
import { SquareX, SquarePen, SaveOff, SaveCheck } from 'lucide-react';
import api from '../api/api.jsx';

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState(null)
    const [updateError, setUpdateError] = useState("")


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
            setUpdateError(
              error.response?.data?.message || "Failed to delete note." 
            )
        }
    }

    const updateNote = async() => {
        try {
            setUpdateError("")

            const res = await api.patch(
                `/notes/${editingNote._id}`,
                {
                    title: editingNote.title,
                    description: editingNote.description
                }
            )

            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === editingNote._id
                        ? res.data.note
                        : note
                )
            )

            setEditingNote(null)

        } catch (error) {
            setUpdateError(
              error.response?.data?.message || "Failed to update note."  
            )
        }
    }

  return ( 
  <div className='bg-[#22242a] mb-16'>
     <div className='min-h-screen relative'>

         <h1 className='text-white text-3xl font-extrabold absolute top-6 left-8'> Collections: </h1> 

            <section className='flex flex-col flex-wrap justify-center items-center gap-6 p-4'>
                
                 {notes.length > 0 ? ( notes.map((note) => ( 
                    <div key={note._id} className='h-auto w-96 bg-slate-500 text-white rounded-2xl p-4 first:mt-20 relative' > 

                        {editingNote?._id !== note._id && (
                        <button 
                            className='absolute right-5 cursor-pointer'
                            onClick={() => deleteNote(note._id)} >  
                            <SquareX size={20} color="white" strokeWidth={2} />
                        </button>
                        )}

                        {editingNote?._id !== note._id && (
                        <button 
                            className='absolute bottom-2 right-5 cursor-pointer'
                            onClick={() => setEditingNote(note)} > 
                            <SquarePen size={20} color="white" strokeWidth={1.5} /> 
                        </button>
                        )}

                        {editingNote?._id === note._id ? ( 
                        <div className="flex flex-col gap-4 pr-6"> 

                            <input className='text-2xl p-2 font-black tracking-wider rounded-lg outline-none'
                                type="text"
                                maxLength={100} 
                                value={editingNote.title} 
                                onChange={(e) => { setUpdateError("")
                                    setEditingNote(
                                { ...editingNote, 
                                title: e.target.value 
                                }) 
                                }
                                } />

                            <textarea className='text-md p-2 font-bold tracking-wide leading-7 rounded-lg outline-none min-h-40 resize-none'
                                value={editingNote.description} 
                                onChange={(e) => { setUpdateError("")
                                    setEditingNote(
                                { ...editingNote,
                                 description: e.target.value
                                }) 
                                }
                                } />

                                {updateError && (
                                    <p className="text-red-300 text-sm font-medium">
                                        {updateError}
                                    </p>
                                )}
                            
                            <div className="flex gap-3">

                                <button
                                    type='button'
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1" 
                                    onClick={updateNote} >
                                    <SaveCheck size={16} color="white" strokeWidth={2.5} />
                                    <p>Save</p>
                                </button> 
                                
                                <button
                                    type='button'
                                    className="bg-slate-700 hover:bg-slate-800 px-4 py-2 rounded-lg font-semibold cursor-pointer flex items-center gap-1" 
                                    onClick={() => { setUpdateError("") 
                                    setEditingNote(null)}} > 
                                    <SaveOff size={16} color="white" strokeWidth={2.5} />
                                    <p>Cancel</p>
                                </button> 

                            </div> 

                        </div> 
                        ) : ( 
                    <> 
                        <h1 className='text-2xl p-1 ml-2 font-black tracking-wider'> {note.title} </h1> 
                        <h3 className='text-md p-1 ml-2 font-bold tracking-wide leading-7'> {note.description} </h3> 
                    </> 
                    )} 
                    </div>
                  )) ) : ( 
                  <h1 className='text-white content-center mt-40'> No Notes to show </h1> 
                )} 
                    <Addbtn />
                </section> 
            <Navi /> 
        </div> 
    </div> ) }

export default Notes