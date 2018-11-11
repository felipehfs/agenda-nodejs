const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: String,
    email: String
})

module.exports = mongoose.model("contacts",contactSchema)