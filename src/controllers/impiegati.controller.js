const Impiegato = require('../models/impiegato.model');
const jwt = require("jsonwebtoken");
const {create} = require('../models/impiegato.model');
const secret = "mysecret";

module.exports = {
    async index(req, res) {
        const user = await Impiegato.find();
        res.json(user);
    },

    async create(res, req) {
        const { 
            nome_impiegato,
            cognome_impiegato,
            data_nascita_impiegato,
            codice_fiscale_impiegato,
            numero_patente_impiegato,
            tipo_patente_impiegato,
            numero_telefono_impiegato,
            tipo_impiegato,
            email_impiegato,
            password_impiegato
        } = req.body;
        let data = {};
        let user = await Impiegato.findOne({ email_impiegato });

        if (!user) {
            data = {nome_impiegato, cognome_impiegato, data_nascita_impiegato, codice_fiscale_impiegato, numero_patente_impiegato, tipo_patente_impiegato, numero_telefono_impiegato, tipo_impiegato, email_impiegato, password_impiegato};
            user = await Impiegato.create(data);
            return res.status(200).json(user);
        } else {
            //impiegato già presente nel DB
            return res.status(500).json(user);
        }
    },

    async details(req, res) {
        const { _id } = req.params;
        const user = await Impiegato.findOne({ _id });
        res.json(user);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const user = await Impiegato.findByIdAndDelete({ _id });
        return res.json(user);
    },

    async update(req, res) {
        const { _id, nome_impiegato, cognome_impiegato, data_nascita_impiegato, codice_fiscale_impiegato, numero_patente_impiegato, tipo_patente_impiegato, numero_telefono_impiegato, tipo_impiegato, email_impiegato, password_impiegato } = req.body;
        const data = { nome_impiegato, cognome_impiegato, data_nascita_impiegato, codice_fiscale_impiegato, numero_patente_impiegato, tipo_patente_impiegato, numero_telefono_impiegato, tipo_impiegato, email_impiegato, password_impiegato };
        const user = await Impiegato.findOneAndUpdate({ _id }, data, { new: true });
        res.json(user);
    },

    async login(req, res) {
        const { email, password } = req.body;
        Impiegato.findOne({ email_impiegato: email, tipo_impiegato: 1 }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(200).json({ errore: "Errore nel server. Per favore, riprova" });
            } else if (!user) {
                res.status(200).json({ status: 2, error: 'E-mail o password non corrispondenti' });
            } else {
                user.isCorrectPassword(password, async function (err, same) {
                    if (err) {
                        res.status(200).json({ error: "Errore nel server. Riprovare." });
                    } else if (!same) {
                        res.status(200).json({ status: 2, error: "Password errata!" })
                    } else {
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, { httpOnly: true });
                        res.status(200).json({ status: 1, auth: true, token: token, id_client: user._id, user_name: user.nome_impiegato, user_surname: user.cognome_impiegato, user_tipo_impiegato: user.tipo_impiegato });
                    }
                })

            }
        })
    },

    async checkToken(req, res) {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if (!token) {
            res.json({ status: 401, msg: 'Accesso negato: token inesistente!' });
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ status: 401, msg: 'Accesso negato: token non valido!' });
                } else {
                    req.json({ status: 200 });
                }
            })
        }
    },
    
    async destroyToken(req, res) {
        const token = req.headers.token;
        if (token) {
            res.cookie('token', null, { httpOnly: true });
        } else {
            res.status(401).send("Logout non autorizzato!");
        }
        res.send('Logout effettuato con successo!');
    }
}