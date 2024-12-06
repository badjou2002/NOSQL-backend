var express = require('express');
var router = express.Router();

// Créer une instance de categorie.
const Categorie = require('../models/categorie');
// afficher la liste des categories.
router.get('/', async (req, res) => {
    try {
        cat = await Categorie.find({}, null, { sort: { '_id': -1 } })
        res.status(200).json(cat)
    }
    catch (err) {
        res.status(404).json({ message: `erreur de find : ${err.message}` })
    }
});
// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    cat = new Categorie(req.body)
    try {
        await cat.save()
        res.status(200).json({ message: `Ajout avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur d'ajout : ${error.message}` })

    }
});
// chercher une catégorie
router.get('/:categorieId', async (req, res) => {
    try {
        cat = await Categorie.findById(req.params.categorieId)

        res.status(cat != null ? 200 : 404).json(cat != null ? cat : { message: `erreur de find` })
    }
    catch (err) {
        res.status(404).json({ message: `erreur de find : ${err.message}` })
    }
});
// modifier une catégorie
router.put('/:categorieId', async (req, res) => {
    try {
        await Categorie.findByIdAndUpdate(
            req.params.categorieId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ message: `Modifer avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur de modification : ${error.message}` })

    }
});
router.delete('/:categorieId', async (req, res) => {
    try {
        await Categorie.findByIdAndDelete(
            req.params.categorieId
        );
        res.status(200).json({ message: `supprimer avec succés` })
    } catch (error) {
        res.status(404).json({ message: `erreur de suppresion : ${error.message}` })

    }
});

module.exports = router;