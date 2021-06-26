const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')

app.use(cors({origin: '*'}))
app.use(bodyParser.json())

const port = 8000

app.get('/actions', async (req, res) => {
    try {
        const data = fs.readFileSync('actions.json', 'utf8')
        res.send(JSON.parse(data))
    } catch (e) {
        console.error(e)
        res.status(400).send('error in file')
    }
})

app.post('/actions', async (req, res) => {
    try {
        const { action, color } = req.body
        const data = fs.readFileSync('actions.json', 'utf8')

        const json = JSON.parse(data)
        const record = { date: (new Date()).toLocaleString('he'), action, color }
        json.unshift(record)

        await fs.writeFileSync('actions.json', JSON.stringify(json), 'utf8')
        res.send(record)
    } catch (e) {
        console.error(e)
        res.status(400).send('error in file')
    }
})

app.get('*', (req, res) => { res.sendFile(path.resolve(path.join(__dirname, '/index.html'))) })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
