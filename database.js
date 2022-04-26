const mongoose = require('mongoose')
const db = mongoose.connection;


function connect () {
    mongoose.connect(process.env.CONNECTION_URI)

    db.on('open', () => {
        console.log("Base de datos conectada")
    })

    db.on('error', (err) => {
        console.log(err)
    })
}

connect()