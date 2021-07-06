const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    nome_veicolo: String,
    tipo_veicolo: Number,           //AUTO: 0, MOTO: 1, MONOPATTINO: 2, BICI: 3
    descrizione_veicolo: String,    //mountain bike, auto utilitaria, ecc...
    numero_posti: Number,
    numero_porte: Number,
    tipo_alimentazione: Number,     //BENZINA: 0, DIESEL: 1, METANO: 2, ELETTRICA: 3
    tipo_cambio: Number,            //MANUALE: 0, AUTOMATICO: 1
    prezzo_noleggio: Number,
    servizio_autista: { type: Number, default: 0 },       //0: no, 1: si.
}, {
    timestamps: true
});

const veicoli = mongoose.model('Veicoli', DataSchema);
module.exports = veicoli;