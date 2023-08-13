import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { db } from "../database/database.js"

export async function signUp(req, res) {
    const { name, email, password, city, phone } = req.body

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if (user.rowCount !== 0) return res.sendStatus(400)

        const hash = bcrypt.hashSync(password, 10)

        await db.query(`INSERT INTO users (name, email, password, city, phone) VALUES ($1, $2, $3);`, [name, email, hash, city, phone])
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
        if (user.rowCount === 0) return res.sendStatus(401)

        const correctPassword = bcrypt.compareSync(password, user.rows[0].password)
        if (!correctPassword) return res.sendStatus(401)

        const token = uuid()
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [user.rows[0].id, token])
        res.status(200).send({ token })
    } catch (err) {
        return res.status(500).send(err.message)
    }
}