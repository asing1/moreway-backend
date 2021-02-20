const { v4 } = require('uuid')
const express = require('express')
const { Client } = require('pg')
const cors = require('cors')


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// TODO: this is to check the api is up or not. Will be removed during deployment
app.get('/', (request, response) => { response.send("api is running") })

app.post('/contact', (request, response) => {

    data = request.body
    let lead = {
        id: v4(),
        fullName: data.userName,
        company: data.company ? null: data.company,
        contactNumber: data.phoneNumber ? null: data.phoneNumber,
        country: data.country ? null: data.country,
        query: data.query,
        queryDescription: data.queryDescription,
        email: data.email,
        insertedAt: new Date().toISOString()
    }

    const client = new Client({
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        database: process.env.POSTGRES_DB
    })

    client.connect()
        .then(() => console.log('Connection established'))
        .then(() => client.query(
            `INSERT INTO leadinfo (id, fullname, company, contact_number, country, query, query_description, email, inserted_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                lead.id, lead.fullName, lead.company, lead.contactNumber, lead.country, lead.query, lead.queryDescription, lead.email, lead.insertedAt
            ]
        ))
        .then(() => response.status(200).send({ "msg": "Row inserted" }))
        .catch(err => {
            if (err.code === "ECONNREFUSED") {
                console.error(err)
                response.status(500).send({ "error": "Failed to connect to the db" })
            } else {
                console.error(err)
                response.status(500).send({ "error": "Unkown error occurred" })
            }
        })
        .finally(() => {
            client.end()
            console.log("Released connection")
        })
})



app.listen(port, () => { console.log(`App listening on http://localhost:${port}`) })