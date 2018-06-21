// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from './router'
import _ from 'lodash'

import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
// import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false;
Vue.use(Vuex);

axios.defaults.headers.post['Content-Type'] = 'application/json';

let server = 'http://todoapp.test/api';
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
                    tmp.push({x: i, y: j, class: 'white', selected: false, tagId: 0})
                }
                tds.push(tmp)
            }
            return tds
        })(),
        timeTags: [
            {id: 1, name: '工作', selected: false, color: '#337ab7'},
            {id: 2, name: '学习', selected: false, color: '#5cb85c'},
            {id: 3, name: '娱乐', selected: false, color: '#f0ad4e'},
            {id: 4, name: '休息', selected: false, color: '#5bc0de'},
            {id: 5, name: '运动', selected: false, color: '#d9534f'},
        ],
        startIndex: [0, 0],
        endIndex: [0, 0],
        dayIndex: (() => {
            let date = new Date();
            let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            return date.getFullYear() + '-' + month + '-' + date.getDate();
        })(),
        k: false
    },
    mutations: {
        setXScope(state, xScope) {
            state.startIndex = xScope
        },
        setYScope(state, YScope) {
            state.endIndex = YScope
        },
        init(state) {
            //init
            state.tds.map((tr) => {
                tr.map((td) => {
                    td.class = 'white';
                    td.selected = false;
                    td.tagId = 0;
                })
            });
        },
        cleanSelect(state){
            state.tds.map((tr) => {
                tr.map((td) => {
                    td.class = 'white';
                    td.selected = false;
                })
            });
        },
        markTag: function (state, tag) {
            let selectedTd = [];

            state.tds.map((tr, trKey) => {
                tr.map((td, tdKey) => {
                    if (td.selected) {
                        selectedTd.push({hour: trKey, moment: tdKey, tag: tag.id, user: 999, belong: state.dayIndex});//组装上传服务器数据

                        td.tagId = tag.id;
                        td.tagColor = tag.color;
                        td.class = 'white';
                        td.selected = false;
                    }
                })
            });
            console.log(JSON.stringify(selectedTd));
            axios.post(server + '/markTag', JSON.stringify(selectedTd))
                .then((r) => {
                    console.log(r)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getSelectedTd: function (state) {

        },
        getTdData: function (state, postData) {
            this.commit('init');
            getBlock(postData.user, postData.date)
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
                        if (event.type === 'mouseover') {
                            state.tds[i][j].selected = true;
                        } else {
                            state.tds[i][j].selected = !state.tds[i][j].selected;
                        }
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

function getBlock(user = 999, date = store.state.dayIndex) {
    axios.post(server + '/index', JSON.stringify({user: user, belong: date}))
        .then((r) => {
            r.data.map((block) => {
                store.state.tds[block['hour']][block['moment']].tagId = block.tag
            });
        })
        .catch((r) => {
            console.log(r);
        });
}

getBlock();

