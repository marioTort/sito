const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DataSchema = new mongoose.Schema({
    nome_cliente: String,
    cognome_cliente: String,
    data_nascita_cliente: String,
    codice_fiscale_cliente: String,
    numero_patente_cliente: String,                           //FACOLTATIVO
    tipo_patente_cliente: { type: Number, default: 0 },       //0: AM, 1: A1, 2: B
    numero_telefono_cliente: String,
    tipo_cliente: { type: Number, default: 0 },              //0: AUTISTA, 1: PARCHEGGIATORE
    email_cliente: String,
    password_cliente: String,
}, {
    timestamps: true
});

DataSchema.pre('save', function (next) {
    if (!this.isModified("password_cliente")) {
        return next();
    }
    this.password_cliente = bcrypt.hashSync(this.password_cliente, 10);
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password_cliente, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

DataSchema.pre('findOneAndUpdate', function (next) {
    var password = this.getUpdate().password_cliente + '';
    if (password.length < 55) {
        this.getUpdate().password_cliente = bcrypt.hashSync(password, 10);   //crittografa la password
    }
    next();
});

const clienti = mongoose.model('Clienti', DataSchema);
module.exports = clienti;