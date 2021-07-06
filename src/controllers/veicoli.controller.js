const Veicolo = require('../models/veicolo.model');

module.exports = {
    async index(req, res) {
        const veicolo = await Veicolo.find();
        res.json(veicolo);
    },
    async create(req, res) {
        const {
            nome_veicolo,
            tipo_veicolo,           
            descrizione_veicolo,    
            numero_posti,
            numero_porte,
            tipo_alimentazione,     
            tipo_cambio,            
            prezzo_noleggio,
            servizio_autista
        } = req.body;
        let data = {};
        let veicolo = await Veicolo.findOne({ nome_veicolo });

        if (!veicolo) {
            data = {
                nome_veicolo,
                tipo_veicolo,
                descrizione_veicolo,
                numero_posti,
                numero_porte,
                tipo_alimentazione,
                tipo_cambio,
                prezzo_noleggio,
                servizio_autista
            };

            veicolo = await Veicolo.create(data);
            return res.status(200).json(veicolo);
        } else {
            //Veicolo già presente nel DB
            return res.status(500).json(veicolo);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const veicolo = await Veicolo.findOne({ _id });
        res.json(veicolo);
    },
    async delete(req, res) {
        const { _id } = req.params;
        const veicolo = await Veicolo.findByIdAndDelete({ _id });
        return res.json(veicolo);
    },
    async update(req, res) {
        const { _id, nome_veicolo, tipo_veicolo, descrizione_veicolo, numero_posti, numero_porte, tipo_alimentazione, tipo_cambio, prezzo_noleggio, servizio_autista
        } = req.body;
        const data = {
            nome_veicolo,
            tipo_veicolo,
            descrizione_veicolo,
            numero_posti,
            numero_porte,
            tipo_alimentazione,
            tipo_cambio,
            prezzo_noleggio,
            servizio_autista
        };
        const veicolo = await Veicolo.findOneAndUpdate({ _id }, data, { new: true });
        res.json(veicolo);
    },

    //FILTRAGGIO PER NUMERO DI POSTI
    async details_posti(req, res) {
        const { numero_posti } = req.query;
        const veicolo = await Veicolo.find({ numero_posti });
        res.json(veicolo);
    },
    /*
    //FILTRAGGIO PER TIPO ALIMENTAZIONE
    async details_alimentazione(req, res) {
        const {tipo_alimentazione} = req.query;
        const veicolo = await Veicolo.find({tipo_alimentazione});
        res.json(veicolo);
    },
    //FILTRAGGIO PER TIPO CAMBIO
    async details_cambio(req, res) {
        const {tipo_cambio} = req.query;
        const veicolo = await Veicolo.find({tipo_cambio});
        res.json(veicolo);
    },
    //FILTRAGGIO PER TIPO VEICOLO
    async details_tipo(req, res) {
        const {tipo_veicolo} = req.query;
        const veicolo = await Veicolo.find({tipo_veicolo});
        res.json(veicolo);
    },

    //FILTRAGGIO PER SERVIZIO AUTISTA  ***INCOMPLETO***
    async details_autista(req, res) {
        const {servizio_autista} = req.query;
        const veicolo = await Veicolo.find({servizio_autista});
        res.json(veicolo);
    },
    */

}