export * from './router';

// Config Variables
export const config = {
    'defaultMessages': {
        'error': 'Something went wrong. Please try again later.',
        'success_login': 'You have logged in successfully! You will be taken to the tasks page in a second.',
        'success_register': 'You have registered successfully! You will be taken to the tasks page in a second.'
    },
    'apiUrl': 'http://rh-todo-app-go-golang-rh-todo.7e14.starter-us-west-2.openshiftapps.com/api/v1'
};


// Add request header
export function requestHeader(authRequired = false) {
    let requestHeaderReturn = {
        'Content-Type': 'application/json'
    };

    if ( authRequired && localStorage.getItem('user') ) {
        requestHeaderReturn.Authorization = 'Bearer ' + localStorage.getItem('user')
    }

    return requestHeaderReturn
}