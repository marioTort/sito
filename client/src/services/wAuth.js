import React, { useEffect, useState } from 'react';
import api from './api';

import { login, logout, getToken } from './auth';
import { Route, Redirect } from 'react-router-dom';

export default function WAuth({ component: Component, ...rest }) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function verify() {
            var res = await api.get('/api/checktoken', { params: { token: getToken() } });
            if (res.data.status === 200) {
                setLoading(false);
                setRedirect(false);
            } else {
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, [])

    return (
        loading ? 'Caricamento...' : <Route {...rest}
            render={props => !redirect ? (
                <Component {...props} />
            ) : <Redirect to={{ pathname: "/admin/login", state: { from: props.location } }} />
            } />
    )
}