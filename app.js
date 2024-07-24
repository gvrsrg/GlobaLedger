const express = require('express')
const cors = require('cors')

const { router } = require('./routes/userRouter.js')

const app = express()

app.use(express.urlencoded({extended: true})) // to parse urlencoded data
app.use(express.json()) // to parse json data

app.use(express.static(__dirname + '/public'))

app.use(cors())


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
})

app.use('/api/users',router)

