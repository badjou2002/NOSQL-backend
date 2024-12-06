var express = require('express')
const SCategorie = require("../models/sCategorie")

var route = express.Router()

route.get('/', async (req, res) => {
    try {
        const scat = await SCategorie.find({}, null, { sort: { '_id': -1 } }).populate("categorieID")
        res.status(200).json(scat)
    } catch (error) {
        res.status(404).json({ message: `erreur de find ${error}` })
    }
})
route.post('/', async (req, res) => {
    const newSCat = new SCategorie(req.body)
    try {
        await newSCat.save()
        res.status(200).json({ message: `Ajouter avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur de find ${error}` })
    }
})
route.put('/:id', async (req, res) => {
    try {
        await SCategorie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({ message: `Modifier avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur de find ${error}` })
    }
})
route.delete('/:id', async (req, res) => {
    try {
        await SCategorie.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `Supprimer avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur de find ${error}` })
    }
})
route.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await SCategorie.findById(req.params.id).populate("categorieID"))
    } catch (error) {
        res.status(404).json({ message: `erreur de find ${error}` })
    }
})
module.exports = route