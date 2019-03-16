export const loader = {
    namespaced: true,
    state: {
        fullPageLoader: false
    },
    actions: {
        page({ commit }, action) {
            commit('page', action);
        },
    },
    mutations: {
        page(state, action) {
            if ( action === 'on' ) {
                state.fullPageLoader = true;
            } else {
                state.fullPageLoader = false;
            }
        }
    }
};