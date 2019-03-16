import {config, requestHeader} from "../_helpers";

import axios from 'axios'

const user = localStorage.getItem('user');

let initialState = {
    authenticated: false
};

if ( user ) {
    initialState['authenticated'] = true;
}

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login( { commit }, { email, password } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/auth/login',
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email,
                        password: password
                    }
                }).then(response => {
                    let responseData = response.data;

                    let responseJWT = responseData.data.token;

                    if ( responseJWT ) {
                        localStorage.setItem('user', responseJWT);
                    }

                    commit('authenticationSuccess');

                    resolve(config.defaultMessages.success_login);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    commit('authenticationError');

                    reject(errorMessage);
                });
            })
        },
        register( { commit }, { email, password, password2 } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/auth/register',
                    method: 'POST',
                    headers: requestHeader(),
                    data: {
                        email: email,
                        password: password,
                        password2: password2,
                    }
                }).then(response => {
                    let responseData = response.data;

                    let responseJWT = responseData.data.token;

                    if ( responseJWT ) {
                        localStorage.setItem('user', responseJWT);
                    }

                    commit('authenticationSuccess');

                    resolve(config.defaultMessages.success_register);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    commit('authenticationError');

                    reject(errorMessage);
                });
            })
        },
        logout({ commit }) {
            localStorage.removeItem('user');

            commit('logout');
        }
    },
    mutations: {
        authenticationSuccess(state) {
            state.authenticated = true;
        },
        authenticationError(state) {
            state.authenticated = false;
        },
        logout(state) {
            state.authenticated = false;
        }
    }
};