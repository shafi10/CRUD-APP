const express = require('express')


const app = express()

app.use(express.json());

app.use('/data', require('./routes/dataRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Surver running on port ${PORT}`)
})