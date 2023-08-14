import { db } from "../database/database.js"

export async function addProduct(req, res) {
    const { title, image, description, price } = req.body
    const { userId } = res.locals

    try {
        const saveProduct = await db.query(`INSERT INTO products (title, image, description, price, "userId") VALUES ($1, $2, $3, $4, $5);`, [title, image, description, price, userId])

        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getProducts(req, res) {
    try {
        const productsList = await db.query(`SELECT * FROM products;`)

        return res.status(200).send(productsList.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function manageProducts(req, res) {
    const { id } = req.body

    try {
        const yourProducts = await db.query(`SELECT * FROM products WHERE "userId" = $1;`, [id])

        res.status(200).send(yourProducts.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
