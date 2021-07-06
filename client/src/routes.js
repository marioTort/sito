import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

//ADMIN
import Dashboard from './pages/admin/dashboard/index.dashboard';

import EliminaVeicoli from './pages/admin/veicoli/elimina.veicoli';
import AggiungiVeicoli from './pages/admin/veicoli/aggiungi.veicoli';

import EliminaImpiegati from './pages/admin/impiegati/elimina.impiegati';
import ModificaImpiegati from './pages/admin/impiegati/modifica.impiegati';

//*** IMPIEGATO ***
import Impiegati from './pages/impiegato/index.impiegato';

import Login from './pages/admin/login/index.login';
import RegistraImpiegati from './pages/impiegato/registra.impiegato';

import PrivateRoute from './services/wAuth';

//*** CLIENTE ***
import Home from './pages/client/home/index.home';

import Veicoli from './pages/admin/veicoli/index.veicoli';
import DettagliVeicoli from './pages/client/veicoli/dettagli.veicoli';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* ADMIN */}

                <Route path="/admin" exact component={Dashboard} />

                <Route path="/admin/veicoli/elimina" exact component={EliminaVeicoli} />
                <Route path="/admin/veicoli/aggiungi" exact component={AggiungiVeicoli} />

                <Route path="/admin/impiegati/elimina" exact component={EliminaImpiegati} />
                <Route path="/admin/impiegati/modifica/:idImpiegato" exact component={ModificaImpiegati} />

                {/* IMPIEGATO */}
                <PrivateRoute path="/impiegati" exact component={Impiegati} />

                <Route path="/login" exact component={Login} />
                <Route path="/impiegati/registra" exact component={RegistraImpiegati} />

                {/* CLIENTE */}
                <Route path="/" exact component={Home} />

                <Route path="/veicoli" exact component={Veicoli} />
                <Route path="/veicoli/:idVeicolo" exact component={DettagliVeicoli} />

            </Switch>
        </BrowserRouter>
    )
}