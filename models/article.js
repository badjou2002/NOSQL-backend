const mongoose = require("mongoose")
const Scategorie = require("./sCategorie.js");
const articleSchema = mongoose.Schema({
    reference: { type: String, required: true, unique: true },
    designation: { type: String, required: true, unique: true },
    prix: { type: Number, required: true },
    marque: { type: String, required: true },
    qtestock: { type: Number, required: true },
    imageart: { type: String, required: false },
    scategorieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Scategorie
    }
})
module.exports = mongoose.model('article', articleSchema)