import Vue from 'vue';
import Vuex from 'vuex';

import { loader } from './_loader.module';

import { authentication } from './authentication';

import { tasks } from './tasks';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        loader,
        authentication,
        tasks
    }
});