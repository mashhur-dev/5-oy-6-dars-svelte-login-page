import {Client, ClientConfig} from 'pg'

const config: ClientConfig = {
    connectionString: 'postgresql://postgres:1@localhost:5432/auth'
}

const client = new Client(config)

client.connect(error => {
    if (error == null) {
        console.log('Database connected')
    }
    else{
        console.log('Connection error: ' + error)        
    }
})

export async function createUser(email: string, password: string, name: string, surname: string) {
    const sql: string = 'INSERT INTO users (email, password, name, surname) VALUES($1, $2, $3, $4);'
    await client.query(sql, [email, password, name, surname])
}

export async function findUser(email: string) {
    const sql: string = 'SELECT * FROM users WHERE email = $1'
    const result = await client.query(sql, [email])
    return result.rows[0]
}

export async function allUsers() {
    const sql: string = 'SELECT * FROM users;'
    const result = await client.query(sql)
    return result.rows
}

export async function removeUser(id: number){
    const sql: string = `DELETE FROM users WHERE id = $1;`
    const result = await client.query(sql, [id])
}