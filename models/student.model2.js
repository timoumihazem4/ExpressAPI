
const Joi = require('joi')
const mysql = require('mysql2')


const schemaValidation = Joi.object({
    firstname: Joi.string().alphanum().min(2).max(20).required(),
    lastname: Joi.string().alphanum().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().required(),
    tel: Joi.number().required(),
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university'

})





exports.postNewStudent = (name, age) => {

    return new promise((resolve, reject) => {
        connection.query("insert into students(name,age) values(?,?)", [name, age], (err, result, fieds) => {
            if (err) { reject(err) }
            if (result) { resolve('inserted') }
        })

    })
}



exports.getAllStudent = () => {
    return new promise((resolve, reject) => {
        connection.query("select * from students", (err, result, fieds) => {
            if (err) { reject(err) }
            if (result) { resolve(result) }
        })
    })
}

exports.getOneStudent = (id) => {
    return new promise((resolve, reject) => {
        connection.query("select * from students where id=?", [id], (err, result, fieds) => {
            if (err) { reject(err) }
            if (result) { resolve(result) }
        })
    })
}


exports.deleteOneStudent = (id) => {
    return new promise((resolve, reject) => {
        connection.query("delete * from students where id=?", [id], (err, result, fieds) => {
            if (err) { reject(err) }
            if (result) { resolve('deleted') }
        })
    })
}

exports.updateOneStudent = (id) => {
    return new promise((resolve, reject) => {
        connection.query("update * from students where id=?", [id], (err, result, fieds) => {
            if (err) { reject(err) }
            if (result) { resolve('updated') }
        })
    })
}