//FILE IN CUI VENGONO FATTE LE QUERY SUL DB

const express = require('express');

const routes = express.Router();

const Impiegato = require('./controllers/impiegati.controller');
const Cliente = require('./controllers/clienti.controller');
const Veicolo = require('./controllers/veicoli.controller');

routes.get('/', Impiegato.index);

//IMPIEGATI


routes.get('/api/impiegati', Impiegato.index);                      //stampa impiegati inseriti nel DB
routes.get('/api/dettagli.impiegato/:_id', Impiegato.details);      //stampa dati relativi ad un determinato impiegato: inserire "?_id = id_impiegato"



//*** GESTIONE ACCOUNT ***

//"Autenticazione"

routes.post('/api/login', Cliente.login);
routes.get('/api/checktoken', Cliente.checkToken);                //serve per ottenere il token di autenticazione. Se questo viene distrutto, l'utente viene immediatamente disconnesso dal sistema.      

routes.post('/api/login', Impiegato.login);
routes.get('/api/checktoken', Impiegato.checkToken);                //serve per ottenere il token di autenticazione. Se questo viene distrutto, l'utente viene immediatamente disconnesso dal sistema.      

//"Registrazione"
routes.post('/api/clienti', Cliente.create);


//"Recupera password"

//"Registrazione impiegati"
routes.post('/api/impiegati', Impiegato.create);

//"Modifica account"
routes.put('/api/impiegati', Impiegato.update);                 //aggiorna i dati impiegato
routes.put('/api/clienti', Cliente.update);                     //aggiorna i dati cliente

//"Gestione prenotazioni"

//"Logout"
routes.get('/api/destroytoken', Cliente.destroyToken);
routes.get('/api/destroytoken', Impiegato.destroyToken);

//"Elimina account"
routes.delete('/api/impiegati/:_id', Impiegato.delete);         //cancella impiegato
routes.delete('/api/clienti/:_id', Cliente.delete);             //cancella cliente

//NON SO ANCORA SE METTERLI
/*
routes.get('/api/clienti', Cliente.index);                      //stampa clienti inseriti nel DB
routes.get('/api/dettagli.cliente/:_id', Cliente.details);      //stampa dati relativi ad un determinato cliente: inserire "?_id = cliente"
*/

//*** RICERCA ***

//"Compila form richiesta"
routes.get('/api/veicoli', Veicolo.index);                        //stampa la lista dei veicoli presenti nel DB     
//Applica filtri
routes.get('/api/lista.veicoli', Veicolo.details_posti);           //stampa i dati relativi al veicolo contenente il numero di posti selezionati

//"Seleziona veicolo"
routes.get('/api/dettagli.veicolo/:_id', Veicolo.details);        //stampa dati relativi al veicolo selezionato

//*** PRENOTAZIONE ***

//"Richiedi prenotazione"

//"Annulla"

//"Scadenza richiesta impiegato/autista"


//*** CONFERMA RITIRO O CONSEGNA ***


//*** SERVIZIO CLIENTI ***

//"Faq"

//"Segnala guasto"

//"Segnala ritardo"
         
//*** AREA IMPIEGATI ***

//Inserisci impiegato

//Elimina impiegato
routes.delete('/api/impiegati/:_id', Impiegato.delete);         //cancella impiegato

//Inserisci veicolo
routes.post('/api/veicoli', Veicolo.create);                      //inserisci un Veicolo nel DB

//Elimina veicolo
routes.delete('/api/veicoli/:_id', Veicolo.delete);               //cancella veicolo

//Accetta prenotazione

//Archivio autista

module.exports = routes;