import Vue from 'vue';
import Router from 'vue-router';

// Authentication views
import Login from '../views/Authentication/Login'
import Register from '../views/Authentication/Register'

// Task Views
import Tasks from '../views/Tasks/Tasks'

import {store} from "../_store";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/tasks',
            meta: {
                title: 'Vue RH Todo App'
            }
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: Tasks,
            meta: {
                title: 'Tasks - Vue RH Todo App',
                loggedInAccessOnly: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: 'Login - Vue RH Todo App',
                loggedOutAccessOnly: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Register - Vue RH Todo App',
                loggedOutAccessOnly: true
            }
        },
        {
            path: '/logout',
            name: 'logout',
            meta: {
                title: 'Logout - Crypto Portfolio',
                logoutPage: true
            }
        },
        {
            path: '*',
            redirect: '/tasks'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if ( to.meta.title ) {
        document.title = to.meta.title
    }

    const authenticated = store.state.authentication.authenticated;

    if ( ( to.meta.loggedInAccessOnly || to.meta.logoutPage ) && ! authenticated ) {
        return next('/login');
    }else if ( to.meta.loggedOutAccessOnly && authenticated ) {
        return next('/tasks');
    } else if ( to.meta.logoutPage && authenticated ) {
        store.dispatch('authentication/logout');

        return next('/login');
    }  else {
        next()
    }
});