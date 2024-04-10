import React, { useState } from 'react'
import { useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {

  
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')
 

    //Obtener todas las notas
    useEffect(()=>{
        noteService
            .getAll()
            .then(response => {
                setNotes(response)
            })
    },[]) 
  
    // Crear nueva nota
    const addNote = (e) => {
        e.preventDefault()
        const noteObject = {
            content: newNote,
            date : new Date(),
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response))
                setNewNote('')
            }
            )
    }

    // Actualizar nota
    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
  
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server ${error}`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const handleChange = (e) =>{
        setNewNote(e.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)


    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? 'important' : 'all' }
                </button>
            </div>  
            <ul>
                {notesToShow.map(note => (
                    <Note 
                        key={note.id} 
                        note={note} 
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleChange}/>
                <button>Guardar</button>
            </form>
            <Footer />
        </div>
    )
          
}
export default App
