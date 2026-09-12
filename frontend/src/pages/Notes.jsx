import { useState, useEffect, useContext } from 'react'
import Addbtn from '../components/Addbtn.jsx';
import Navi from "../components/Navi.jsx"
import { SquareX, SquarePen, SaveOff, SaveCheck, LogOut, Plus } from 'lucide-react';
import api from '../api/api.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import logo from "../assets/logo.png"

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [editingNote, setEditingNote] = useState(null)
    const [updateError, setUpdateError] = useState("")
    const [newNote, setNewNote] = useState(null) // for desktop-created notes
    const { logout } = useContext(AuthContext)


    useEffect(() => {
        api.get("/notes")
        .then((res) => {
            setNotes(res.data.notes)
        })
        .catch((err) => {
            console.error("Failed to fetch notes: ", err)
        })
    }, [])


    const deleteNote = async (id) => {
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (error) {
            setUpdateError(
              error.response?.data?.message || "Failed to delete note."
            )
        }
    }

    const updateNote = async () => {
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

    const handleLogout = () => {
        logout()
    }

    // Creates a new empty note draft for desktop users (mirrors Addbtn behavior)
    const handleNewNote = () => {
        setUpdateError("")
        setEditingNote({
            _id: null, // signals "new" to the save handler below
            title: "",
            description: ""
        })
    }

    // Extended save: handles both edit and create
    const saveNote = async () => {
        try {
            setUpdateError("")

            if (editingNote?._id) {
                // Update existing
                const res = await api.patch(
                    `/notes/${editingNote._id}`,
                    {
                        title: editingNote.title,
                        description: editingNote.description
                    }
                )
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note._id === editingNote._id ? res.data.note : note
                    )
                )
            } else {
                // Create new
                const res = await api.post("/notes", {
                    title: editingNote.title || "Untitled",
                    description: editingNote.description || ""
                })
                setNotes((prevNotes) => [res.data.note, ...prevNotes])
            }

            setEditingNote(null)
        } catch (error) {
            setUpdateError(
              error.response?.data?.message ||
              (editingNote?._id ? "Failed to update note." : "Failed to create note.")
            )
        }
    }

    return (
    <>
      <div className='bg-[#FAF9F6] min-h-dvh'>

        {/* Header */}
        <div className='flex items-center justify-between max-w-7xl mx-auto px-8 lg:px-10 pt-10'>
            <h3 className='text-[#6B7080] text-xl lg:text-2xl font-medium font-poppins'>Collections</h3>

            <div className='flex items-center gap-4 lg:gap-6'>
              {/* Desktop-only New Note button */}
              <button
                type="button"
                onClick={handleNewNote}
                className='hidden lg:flex items-center gap-2 bg-[#8881DD] hover:bg-[#6C63D9] text-white font-poppins font-semibold text-[15px] px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm'
              >
                <Plus size={18} strokeWidth={2.5} />
                New note
              </button>

              <button
                type="button"
                aria-label="Log out"
                onClick={handleLogout}
                className='cursor-pointer hover:text-[#8881DD] transition-colors'
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </div>
        </div>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 p-4 lg:p-8 pb-32 max-w-7xl mx-auto'>

            {/* Desktop-created draft appears at top */}
            {editingNote && !editingNote._id && (
              <div className='h-auto w-full bg-[#FFFFFF] text-[#2D3142] rounded-2xl p-4 lg:p-5 relative shadow-md ring-2 ring-[#8881DD]/30'>
                <div className="flex flex-col gap-4 pr-6">
                  <input
                    className='text-4xl text-[#2D3142] font-black font-caveat tracking-wider rounded-xl outline-none bg-transparent w-full'
                    type="text"
                    maxLength={100}
                    placeholder="Title"
                    autoFocus
                    value={editingNote.title}
                    onChange={(e) => {
                      setUpdateError("")
                      setEditingNote({ ...editingNote, title: e.target.value })
                    }}
                  />
                  <textarea
                    className='text-md p-2 text-[#6B7080] font-poppins tracking-wide min-h-40 resize-none leading-8 rounded-xl outline-none bg-transparent w-full'
                    placeholder="Start writing..."
                    value={editingNote.description}
                    onChange={(e) => {
                      setUpdateError("")
                      setEditingNote({ ...editingNote, description: e.target.value })
                    }}
                  />
                  {updateError && (
                    <p className="text-red-400 text-sm font-medium">{updateError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type='button'
                      className="bg-[#8881DD] hover:bg-[#6C63D9] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1 text-white transition-colors"
                      onClick={saveNote}
                    >
                      <SaveCheck size={16} color="white" strokeWidth={2.5} />
                      <p>Save</p>
                    </button>
                    <button
                      type='button'
                      className="bg-[#6B7080] hover:bg-[#2D3142] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1 text-white transition-colors"
                      onClick={() => {
                        setUpdateError("")
                        setEditingNote(null)
                      }}
                    >
                      <SaveOff size={16} color="white" strokeWidth={2.5} />
                      <p>Cancel</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note._id}
                  className='h-auto w-full bg-[#FFFFFF] text-[#2D3142] rounded-2xl p-4 lg:p-5 relative shadow-sm hover:shadow-md transition-shadow'
                >

                    {editingNote?._id !== note._id && (
                      <button
                        className='absolute right-5 top-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity'
                        onClick={() => deleteNote(note._id)}
                        aria-label="Delete note"
                      >
                        <SquareX size={20} color="#6B7080" strokeWidth={2} />
                      </button>
                    )}

                    {editingNote?._id !== note._id && (
                      <button
                        className='absolute bottom-3 right-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
                        onClick={() => setEditingNote(note)}
                        aria-label="Edit note"
                      >
                        <SquarePen size={20} color="#8881DD" strokeWidth={1.5} />
                      </button>
                    )}

                    {editingNote?._id === note._id ? (
                      <div className="flex flex-col gap-4 pr-6">

                          <input
                            className='text-4xl text-[#2D3142] font-black font-caveat tracking-wider rounded-xl outline-none bg-transparent w-full'
                            type="text"
                            maxLength={100}
                            value={editingNote.title}
                            onChange={(e) => {
                              setUpdateError("")
                              setEditingNote({ ...editingNote, title: e.target.value })
                            }}
                          />

                          <textarea
                            className='text-md p-2 text-[#6B7080] font-poppins tracking-wide min-h-40 resize-none leading-8 rounded-xl outline-none bg-transparent w-full'
                            value={editingNote.description}
                            onChange={(e) => {
                              setUpdateError("")
                              setEditingNote({ ...editingNote, description: e.target.value })
                            }}
                          />

                          {updateError && (
                            <p className="text-red-400 text-sm font-medium">
                              {updateError}
                            </p>
                          )}

                          <div className="flex gap-3">
                              <button
                                type='button'
                                className="bg-[#8881DD] hover:bg-[#6C63D9] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1 text-white transition-colors"
                                onClick={saveNote}
                              >
                                <SaveCheck size={16} color="white" strokeWidth={2.5} />
                                <p>Save</p>
                              </button>
                              <button
                                type='button'
                                className="bg-[#6B7080] hover:bg-[#2D3142] px-4 py-2 rounded-lg text-xl font-extrabold font-caveat cursor-pointer flex items-center gap-1 text-white transition-colors"
                                onClick={() => {
                                  setUpdateError("")
                                  setEditingNote(null)
                                }}
                              >
                                <SaveOff size={16} color="white" strokeWidth={2.5} />
                                <p>Cancel</p>
                              </button>
                          </div>

                      </div>
                    ) : (
                      <>
                        <h1 className='text-4xl p-1 ml-2 font-black tracking-wider font-caveat break-words pr-8'>
                          {note.title}
                        </h1>
                        <h3 className='text-md p-1 ml-2 font-medium tracking-wide leading-7 font-poppins text-[#6B7080] break-words'>
                          {note.description}
                        </h3>
                      </>
                    )}
                </div>
              ))
            ) : (
              !editingNote && (
                <div className='col-span-full flex flex-col items-center justify-start gap-12 pt-12 lg:pt-24'>
                  <img src={logo} alt="logo" className="h-40 w-60 lg:h-48 lg:w-72 object-contain" />
                  <h1 className="font-caveat font-bold text-6xl lg:text-7xl text-[#2D3142]">NoteNest</h1>
                  <p className="font-poppins text-[#6B7080] text-[14px] lg:text-[16px] leading-5 lg:leading-7 w-60 lg:w-80 text-center">
                    "Small steps in writing today, make big dreams come true tomorrow."
                  </p>

                  <div className="flex items-center justify-center gap-2">
                      <div className="h-0.5 w-10 bg-[#6C63D9]" />
                      <span>💜</span>
                      <div className="h-0.5 w-10 bg-[#6C63D9]" />
                  </div>

                  <div className='flex flex-col items-center p-2'>
                      <h3 className="font-caveat font-bold text-2xl lg:text-3xl text-[#2D3142] p-2">No notes yet</h3>
                      <p className="font-poppins text-[#6B7080] text-[14px] lg:text-[15px] leading-5 w-50 lg:w-64 text-center">
                        Tap the <span className="lg:hidden">+</span><span className="hidden lg:inline">"New note"</span> button to add <span>your first note.</span>
                      </p>
                  </div>
                </div>
              )
            )}

        </section>

        {/* FAB — mobile/tablet only */}
        <div className='lg:hidden'>
          <Addbtn />
        </div>

        <Navi />
      </div>
    </>
    )
}

export default Notes