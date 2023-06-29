const mongoose = require('mongoose')
const db = mongoose.connection;


function connect () {
    console.log(process.env.CONNECTION_URI)
    mongoose.connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 1000 * 60 * 110,
    })


    db.on('open', () => {
        console.log("Base de datos conectada")
    })

    db.on('error', (err) => {
        console.log(err)
    })
}

connect()