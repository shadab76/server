const mongooes = require('mongoose')

const User = new mongooes.Schema(
    {
        name:{type: String,required:true},
        email:{type: String,required:true, unique:true},
        password:{type: String,required:true},
        quote:{type: String},
    }, 
    {
        collection:'user-data'
    }
)

const model = mongooes.model('UserData',User)

module.exports = model