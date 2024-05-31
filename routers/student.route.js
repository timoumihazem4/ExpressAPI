const route = require('express').Router()
const studentModel = require('../models/student.model')



route.get('/', (req, res, next) => {
    studentModel.testConnect().then((msg) => res.send(msg)).catch((err) => res.send(err))
})

verifyToken = (req, res, next) => {
    let token = req.headers.authorisation
    if (!token) {
        res.status(400).json({ msg: 'access bloked....!!!' })

    }
    try {
        let verif = jwt.verify(token, prvatekey)
        next()
    } catch (e) { }
}




route.post('/addstudent', (req, res, next) => {
    studentModel.postNewStudent(req.body.firstname, req.body.lastname, req.body.email, req.body.age, req.body.tel)
        .then((doc) => res.status(200).json(doc)).catch((err) => res.status(400).json({ error: err }))
})

var secretKey = "dassault mirage"
var clientKey = "123456"

verifysecretclient = (req, res, next) => {
    let sk = req.params.secretKey
    let ck = req.params.clientKey
    if (sk == secretKey && ck == clientKey) {
        next()
    } else {
        res.status(400).json({ error: "we cant access to this route" })
    }
}


route.get('/students/:secretKey/:clientKey', verifysecretclient, verifyToken, (req, res, next) => {

    let token = req.headers.authorisation
    let user = jwt.decode(token, { complete: true })
    studentModel.getAllStudent()
        .then((doc) => res.status(200).json({ students: doc, user: user })).catch((err) => res.status(400).json(err))



})


route.get('/student/:id', verifyToken, (req, res, next) => {
    studentModel.getOneStudent(req.params.id)
        .then((doc) => res.status(200).json(doc)).catch((err) => res.status(400).json(err))

})

route.delete('/student/:id', verifyToken, (req, res, next) => {
    studentModel.deleteOneStudent(req.params.id)
        .then((doc) => res.status(200).json(doc)).catch((err) => res.status(400).json(err))

})


route.patch('/student/:id', verifyToken, (req, res, next) => {
    studentModel.updateOneStudent(req.params.id, req.params.firstname, req.params.lastname, req.params.email, req.params.age, req.params.tel)
        .then((doc) => res.status(200).json(doc)).catch((err) => res.status(400).json(err))

})

module.exports = route