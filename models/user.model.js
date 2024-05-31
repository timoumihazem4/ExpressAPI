const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





let schemaUser = mongoose.Schema({
    username: String,
    email: String,
    password: String,

})

let url = 'mongodb://localhost:27017/university'

var User = mongoose.model('user', schemaUser)


exports.register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            user.findOne({ email: email })
        }).then((doc) => {
            if (doc) {
                mongoose.disconnect()
                reject('this email exists')
            } else {
                bcrypt.hash(password, 747).then((hashedPassword) => {
                    let user = new User({
                        username: username,
                        email: email,
                        password: hashedPassword
                    })
                    user.save().then((user) => {
                        mongoose.disconnect()
                        resolve(user)
                    }).catch((err) => {
                        mongoose.disconnect()
                        reject(err)
                    })
                }).catch((err) => {
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}

var privatekey = "we are not the same"


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            user.findOne({ email: email })
        }).then(() => {
            user.findOne({ email: email })
        }).then((user) => {
            if (!user) {
                mongoose.disconnect()
                reject('we don\'t have this email in our DB')
            } else {
                bcrypt.compare(password, user.password).then((same) => {
                    if (same) {
                        let token = jwt.sign({ id: user._id, username: user.username }, privatekey, { entriesIn: '1h' })
                        mongoose.disconnect()
                        resolve(token)
                    } else {
                        mongoose.disconnect()
                        reject('invalid password')
                    }

                }).catch((err) => {
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}