const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DataSchema = new mongoose.Schema({
    nome_impiegato: String,
    cognome_impiegato: String,
    data_nascita_impiegato: String,
    codice_fiscale_impiegato: String,
    numero_patente_impiegato: String,
    tipo_patente_impiegato: { type: Number, default: 0 },       //0: AM, 1: A1, 2: B
    numero_telefono_impiegato: String,
    tipo_impiegato: { type: Number, default: 0 },              //0: AUTISTA, 1: PARCHEGGIATORE
    email_impiegato: String,
    password_impiegato: String,
}, {
    timestamps: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("password_impiegato")) {
        return next();
    }
    this.password_impiegato = bcrypt.hashSync(this.password_impiegato, 10);
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password_impiegato, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

DataSchema.pre('findOneAndUpdate', function (next) {
    var password = this.getUpdate().password_impiegato + '';
    if (password.length < 55) {
        this.getUpdate().password_impiegato = bcrypt.hashSync(password, 10);   //crittografa la password
    }
    next();
});

const impiegati = mongoose.model('Impiegati', DataSchema);
module.exports = impiegati;