const { Sequelize } = require('sequelize')
const Joi = require('joi')



const schemaValidation = Joi.object({
    firstname: Joi.string().alphanum().min(2).max(20).required(),
    lastname: Joi.string().alphanum().min(2).max(20).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().required(),
    tel: Joi.number().required(),
})



const sequelize = new Sequelize('univercity', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

exports.testConnect = () => {
    return new promise((resolve, reject) => {
        sequelize.authenticate().then(() => { resolve('connected') }).catch((e) => { reject(e) })
    })
}

const student = sequelize.define('studens', {
    firstname: {
        type: sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    age: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    phone: {
        type: sequelize.STRING,
        allowNull: false
    }
})


exports.postNewStudent = (firstname, lastname, email, age, tel) => {
    return new promise(async (resolve, reject) => {


        student.sync({ force: true }).then(() => {
            student.create({
                firstname: 'hazem',
                lastname: 'timoumi',
                email: 'timhazm@gmail.com',
                age: 23,
                phone: '93397575'
            }).then((mod) => {
                resolve(mod)
            }).catch((err) => reject(err))
        })

    })
}



exports.getAllStudent = (firstname, lastname, email, age, tel) => {
    return new promise((resolve, reject) => {
        student.findAll().then((docs) => resolve(docs)).catch((err) => reject(err))
    })
}

exports.getOneStudent = (id) => {
    return new promise((resolve, reject) => {
        student.findOne({ where: { id: id } }).then((docs) => resolve(docs)).catch((err) => reject(err))

    })
}


exports.deleteOneStudent = (id) => {

    return new promise((resolve, reject) => {
        student.destroy({ where: { id: id } }).then((docs) => resolve(docs)).catch((err) => reject(err))

    })

}

exports.updateOneStudent = (id) => {

    return new promise((resolve, reject) => {

        student.update({ lastName: 'Doe' }, { where: { id: id } }).then((docs) => resolve(docs)).catch((err) => reject(err))

    })


}