const Contact = require('../models/contact')

exports.create = async function (req, res) {
    try {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        const newContact = await contact.save()
        res.status(201).json(newContact)
    }
    catch (err) {
        res.status(500).send(err)
    }

}

exports.retrieve = async function (req, res) {
    try {
        const perPage = 10
        const total = await Contact.find().count()
        const page = parseInt(req.query.page) || 1
        const contacts = await Contact.find().skip((page * perPage) - perPage).limit(perPage)
        res.json({
            data: contacts,
            current: page,
            pages: Math.ceil((total / perPage))
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.findById = async function (req, res) {
    try {
        const searched = await Contact.findById(req.params.id)
        res.json(searched)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.update = async function (req, res) {
    try {
        const contact = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }
        const updated = await Contact.findByIdAndUpdate(req.params.id, contact)
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.delete = async function (req, res) {
    try {
        const removedContact = await Contact.findByIdAndRemove(req.params.id)
        res.status(201).send()
    } catch (err) {
        res.status(500).send(err)
    }
}