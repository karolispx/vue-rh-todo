import Vue from 'vue'
import './plugins/vuetify'
import App from './views/App.vue'

import { store } from './_store';

import { router } from './_helpers';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

