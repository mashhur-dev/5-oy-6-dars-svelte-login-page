import express  from "express"
import cors from 'cors'
import { register, getUsers, deleteUser } from "./auth"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/register', register)
app.get('/users', getUsers)
app.delete('/users/:id', deleteUser)

app.listen(7070, () => {
    console.log('Server is running on 7070')
})