import Vue from 'vue'
import Router from 'vue-router'
import TimeIndex from '@/components/TimeIndex'
import Login from '@/components/Login'

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            name: 'TimeIndex',
            component: TimeIndex
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

