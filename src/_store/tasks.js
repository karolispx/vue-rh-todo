import {config, requestHeader} from "../_helpers";

import axios from 'axios'

export const tasks = {
    namespaced: true,
    state: {
        tasks: [],
        moreTasksToLoad: true
    },
    actions: {
        getTasks( { commit }, pageToLoad ) {
            if ( pageToLoad < 2 ) {
                commit('getTasksRequest');
            }

            let limit = 10;
            let offset = 0;

            if ( pageToLoad > 1 ) {
                offset = ( pageToLoad - 1 ) * limit;
            }

            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks?offset=' + offset + "&limit=" + limit,
                    method: 'GET',
                    headers: requestHeader(true),
                }).then(response => {
                    if ( pageToLoad < 2 ) {
                        commit('getTasksSuccess', response.data.data);
                    } else {
                        commit('loadMoreTasksSuccess', response.data.data);
                    }

                    resolve(response.data.message);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    if ( pageToLoad < 2 ) {
                        commit('getTasksError');
                    } else {
                        commit('loadMoreTasksError');

                        errorMessage = 'nomore'
                    }

                    reject(errorMessage);
                });
            })
        },
        createTask( context, task ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks',
                    method: 'POST',
                    headers: requestHeader(true),
                    data: {
                        task: task
                    }
                }).then(response => {
                    let requestResponse = response.data.message;

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
        updateTask( context, { taskid, task } ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks/' + taskid,
                    method: 'PUT',
                    headers: requestHeader(true),
                    data: {
                        task: task
                    }
                }).then(response => {
                    let requestResponse = response.data.message;

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
        deleteTask( context, taskID ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks/' + taskID,
                    method: 'DELETE',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data.message;

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
        watchTask( context, taskID ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks/watch/' + taskID,
                    method: 'PUT',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data.message;

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
        unwatchTask( context, taskID ) {
            return new Promise((resolve, reject) => {
                axios({
                    url: config.apiUrl + '/tasks/unwatch/' + taskID,
                    method: 'PUT',
                    headers: requestHeader(true),
                }).then(response => {
                    let requestResponse = response.data.message;

                    resolve(requestResponse);
                }).catch(error => {
                    let errorMessage = config.defaultMessages.error;

                    if ( error.response && error.response.data.message ) {
                        errorMessage = error.response.data.message;
                    }

                    reject(errorMessage);
                });
            })
        },
    },
    mutations: {
        getTasksRequest(state) {
            state.tasks = [];
        },
        getTasksSuccess(state, tasks) {
            state.tasks = tasks;
            state.moreTasksToLoad = true;
        },
        loadMoreTasksSuccess(state, tasks) {
            if ( tasks ) {
                state.tasks = state.tasks.concat(tasks)
            } else {
                state.tasks = tasks;
            }

            state.moreTasksToLoad = true;
        },
        getTasksError(state) {
            state.tasks = [];
        },
        loadMoreTasksError(state) {
            state.moreTasksToLoad = false;
        }
    }
};
