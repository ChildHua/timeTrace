// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import _ from 'lodash'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
// import './assets/bootstrap-3.3.7-dist/js/bootstrap.min'

Vue.config.productionTip = false;
Vue.use(Vuex);
/* eslint-disable no-new */
const store = new Vuex.Store({
    state: {
        tds: (() => {
            let tds = [];
            let x = 2;
            let y = 24;
            for (let i = 0; i < y; i++) {
                let tmp = [];
                for (let j = 0; j < x; j++) {
                    tmp.push({x:i, y:j, class:'white',selected:false})
                }
                tds.push(tmp)
            }
            return tds
        })(),
        startIndex: [0, 0],
        endIndex: [0, 0],
        k: false
    },
    mutations: {
        setXScope(state, xScope) {
            state.startIndex = xScope
        },
        setYScope(state, YScope) {
            state.endIndex = YScope
        },
        init(state){
            //init
            state.tds.map((tr) => {
                tr.map((td) => {
                    td.class = 'white';
                })
            });
        },
        renderSelect(state, index) {
            if (!state.k) {
                return false;
            }
            state.endIndex = index;
            let xScope = state.startIndex[0] > state.endIndex[0]
                ? [state.endIndex[0], state.startIndex[0]]
                : [state.startIndex[0], state.endIndex[0]];
            let yScope = state.startIndex[1] > state.endIndex[1]
                ? [state.endIndex[1], state.startIndex[1]]
                : [state.startIndex[1], state.endIndex[1]];
            // console.log([xScope, yScope]);

            for (let i = xScope[0]; i <= xScope[1]; i++) {
                for (let j = yScope[0]; j <= yScope[1]; j++) {
                    if ((index[0] >= xScope[0] && index[0] <= xScope[1]) && (index[1] >= yScope[0] && index[1] <= yScope[1])) {
                        state.tds[i][j].class = 'red'
                    } else {
                        state.tds[i][j].class = 'white'
                    }
                }
            }
        }
    }
});

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
});
