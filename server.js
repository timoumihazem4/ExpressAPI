const express = require('express')
const studentRoute = require('./routers/student.route')
const userRoute = require('./routers/user.route')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// The server control the access from browsers and devices
app.use((req, res, next) => {
    res.setHeaders('Access-Control-Allow-Origin', "*")
    res.setHeaders('Access-Control-Request-Method', "*")
    res.setHeaders('Access-Control-Allow-Headers', "authorisation")
    next()

})


app.use('/', studentRoute)
app.use('/', userRoute)




app.listen(3031, () => console.log('server is running on port 30031'))