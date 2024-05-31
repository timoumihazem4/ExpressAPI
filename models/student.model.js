const mongoose = require('mongoose')
const Joi = require('joi')



const schemaValidation = Joi.object({
    firstname: Joi.string().alphanum().min(2).max(20).required(),
    lastname: Joi.string().alphanum().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().required(),
    tel: Joi.number().required(),
})



let schemaStudent = mongoose.schema({
    firstname: String,
    lastname: String,
    email: String,
    age: Number,
    tel: Number,
})

var student = mongoose.model('student', schemaStudent)
var url = 'mongodb://localhost:27017/university'


exports.testConnect = () => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            mongoose.disconnect()
            resolve('connected !')
        }).catch((err) => reject(err))
    })
}

exports.postNewStudent = (firstname, lastname, email, age, tel) => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(async () => {
            let validation = await schemaValidation.validateAsync({ firstname: firstname, lastname: lastname, email: email, age: age, tel: tel })
            if (validation.error) {
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
            let student = new student({
                firstname: firstname,
                lastname: lastname,
                email: email,
                age: age,
                tel: tel,
            })
            student.save().then((doc) => {
                mongoose.disconnect()
                resolve(doc)
            }).catch((err) => {
                mongoose.disconnect()
                reject(err)
            })

        }).catch((err) => reject(err))
    })
}



exports.getAllStudent = (firstname, lastname, email, age, tel) => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return student.find()

        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOneStudent = (id) => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return student.findById(id)

        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.deleteOneStudent = (id) => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return student.deleteOne({ _id: id })

        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.updateOneStudent = (id) => {
    return new promise((resolve, reject) => {
        mongoose.connect(url).then(() => {


            let validation = schemaValidation.validate({ firstname: firstname, lastname: lastname, email: email, age: age, tel: tel })
            if (validation.error) {
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }


            return student.updateOne({ _id: id }, { firstname: firstname, lastname: lastname, email: email, age: age, tel: tel })

        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}