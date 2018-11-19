import Vue from 'vue'
import VueRouter from 'vue-router'
import Contact from '@/components/contact/Contact'
import Auth from '@/components/auth/Auth'

Vue.use(VueRouter)

const routes = [
    {
        name: "Auth",
        path: '/',
        component: Auth
    },
    {
        name: 'Contacts',
        path: '/contacts',
        component: Contact,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router