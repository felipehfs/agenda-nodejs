const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/agenda', {
    useCreateIndex: true,
    useNewUrlParser: true
})