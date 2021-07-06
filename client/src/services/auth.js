export const TOKEN_KEY = '&app-token';
export const ID_UTENTE = '&id-utente';
export const NOME_UTENTE = '&nome-utente';
export const COGNOME_UTENTE = '&cognome-utente';
export const USER_TYPE = '&user-type';

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.clear();
}

export const setIdUtente = id => localStorage.setItem(ID_UTENTE, id);
export const getIdUtente = () => localStorage.getItem(ID_UTENTE);

export const setNomeUtente = nome => localStorage.setItem(NOME_UTENTE, nome);
export const getNomeUtente = () => localStorage.getItem(NOME_UTENTE);

export const setCognomeUtente = cognome => localStorage.setItem(COGNOME_UTENTE, cognome);
export const getCognomeUtente = () => localStorage.getItem(COGNOME_UTENTE);

export const setTipoUtente = tipo => localStorage.setItem(USER_TYPE, tipo);
export const getTipoUtente = () => localStorage.getItem(USER_TYPE);

export const getToken = () => localStorage.getItem(TOKEN_KEY);