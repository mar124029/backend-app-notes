const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./src/loggerMiddleware')

// const http = require('http');
app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: true
    },
    {
        id: 3,  
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
    }
]

app.get('/',(req,res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(req,res) => {
    res.json(notes)
})

app.get('/api/notes/:id',(req,res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.send(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id',(req,res) => {
    const id = Number(req.params.id)
    const indice = notes.findIndex(curso => curso.id === id)

    if (indice >= 0){
        notes.splice(indice,1)
    }
    res.json(notes)
})

app.post('/api/notes', (req,res) => {
    const note = req.body

    const ids= notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: note.important,
    }
    notes = notes.concat(newNote)
    res.json(newNote)
})

app.put('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    const updatedNote = req.body
  
    const index = notes.findIndex(note => note.id === id)
  
    if (index !== -1) {
        notes[index] = { ...notes[index], ...updatedNote }
        res.json(notes[index])
    } else {
        res.status(404).json({ error: 'Nota no encontrada' })
    }
})

// const servidor = http.createServer((req , res) => {
//   if(req.url === '/notes'){
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(notes));
//   }
//   else if(req.url === '/notes/1'){
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(notes[0]));
//   }
//   else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({message: 'Not found'}));
//   }

// })

app.use((req,res)=>{
    res.status(404).json({message: 'Not found'})
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})