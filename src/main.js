// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from './router'
import _ from 'lodash'
import Viser from 'viser-vue'


import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
// import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Viser)

axios.defaults.headers.post['Content-Type'] = 'application/json';

let server = 'http://tt.webapp/api';
/* eslint-disable no-new */
const store = new Vuex.Store({
    state: {
        serverURL:process.env.NODE_ENV === 'production'?'http://120.79.40.223:800/api':'http://tt.webapp/api',
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
        dayIndexArr:(()=>{
            let date = [];
            let dateObj = new Date();
            date.push(dateObj.getFullYear());
            date.push(dateObj.getMonth());
            date.push(dateObj.getDate());
        })(),

        k: false,
        auth:{
            token:null,
            user_id:0
        }
    },
    mutations: {
        logined(state,token){
            state.auth.token = token;
            localStorage.token = token;
        },
        loadUser(state,user){
            state.auth.user_id = user.id
            localStorage.user = user.id
        },
        logouted(state){
            state.auth.user_id = null;
            state.auth.token = null;
            localStorage.removeItem('token');
        },

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
                        selectedTd.push({hour: trKey, moment: tdKey, tag: tag.id, user: state.auth.user_id, belong: state.dayIndex});//组装上传服务器数据

                        td.tagId = tag.id;
                        td.tagColor = tag.color;
                        td.class = 'white';
                        td.selected = false;
                    }
                })
            });
            console.log(JSON.stringify(selectedTd));
            axios.post(state.serverURL + '/markTag', JSON.stringify(selectedTd))
                .then((r) => {
                    console.log(r)
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        getSelectedTd: function (state) {

        },

        renderTdTag:function (state, data) {
            data.map((block) => {
                state.tds[block['hour']][block['moment']].tagId = block.tag
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
                        if (event.type === 'mouseover') {
                            state.tds[i][j].selected = true;
                        } else {
                            state.tds[i][j].selected = !state.tds[i][j].selected;
                        }
                    }
                }
            }
        }
    },
    actions:{
        logined({dispatch,commit}, token) {
            return new Promise(function (resolve, reject) {
                commit('logined', token);
                axios.defaults.headers.common['Authorization'] = token;
                dispatch('profile').then(() => {
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        },
        // 登录成功后使用 token 拉取用户的信息
        profile({commit,dispatch,state}) {
            return new Promise(function (resolve, reject) {
                axios.get(state.serverURL+'/user', {}).then(respond => {
                    if (respond.status === 200) {
                        commit('loadUser', respond.data);
                        dispatch('loadTd');
                        resolve()
                    } else {
                        reject()
                    }
                })
            })
        },
        loadTd({commit,state}){
            return new Promise(function (resolve, reject) {
                axios.post(state.serverURL+'/index',JSON.stringify({user:state.auth.user_id,belong:state.dayIndex}))
                    .then(r=>{
                        commit('init');
                        commit('renderTdTag',r.data);
                    })
                    .catch(r=>{
                        console.log(r);
                    })
            })
        },
        logout({commit}) {
            return new Promise(function (resolve, reject) {
                commit('logouted');
            })
        },
    }
});
Vue.prototype.$axios = axios;
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>',
    created() {
        // 自定义的 axios 响应拦截器
        if (localStorage.token){//刷新页面时判断token
            this.$axios.defaults.headers.common['Authorization'] = localStorage.token
            this.$store.commit('loadUser',{id:localStorage.user})
        }
        this.$axios.interceptors.response.use((response) => {
            // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
            let token = response.headers.authorization;
            if (token) {
                // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
                this.$store.dispatch('refreshToken', token);
            }
            return response
        }, (error) => {
            switch (error.response.status) {

                // 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
                case 401:
                    this.$store.dispatch('logout');
                    this.$router.push('/login');
                    break;
                // 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
                case 400:
                    // console.log(error.response);
                    // alert(error.response);
                    break;
                case 429:
                    console.log(33);
                    break;
            }
            return Promise.reject(error)
        })
    }
});

