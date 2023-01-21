import { Response, Request } from "express"
import { createUser, removeUser } from "./users"
import { findUser, allUsers } from "./users"

type RegisterBody = {
    email: string,
    password: string,
    name: string,
    surname: string
}

export async function register(req: Request, res: Response){
    
    const body: RegisterBody = req.body

    const { email, password, name, surname} = body

    const user = await findUser(email)

    if(user !== undefined) {
         res.status(400).json({
            message: 'User with email ' + email + ' already exists'
        })
        return
    }

    await createUser(email, password, name, surname)

    res.status(201).json({
        message: 'Register success'
    })
}

export async function getUsers(req: Request, res: Response) {
    const users = await allUsers()

    res.status(200).json({
        message: 'All Users',
        users
    })
}

export async function deleteUser(req: Request, res: Response){
    const id = Number(req.params.id)
    
    await removeUser(id)
    res.json({
        message: 'User deleted'
    })
}