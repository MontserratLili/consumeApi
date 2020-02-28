import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'
import ConsumeApi from './views/ConsumeApi.vue'
import Login from './views/Login.vue'
import Custom from './views/Custom.vue'

Vue.use(Router)

const router = new Router({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/custom',
        },
        {
            path: '/',
            redirect: '/custom',
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiereAutorizacion: true
            }
        },
        {
            path: '/consumeapi',
            name: 'consumeapi',
            component: ConsumeApi,
            meta: {
                requiereAutorizacion: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/custom',
            name: 'custom',
            component: Custom,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const usuarioConectado = firebase.auth().currentUser;
    const requiereAut = to.matched.some(record => record.meta.requiereAutorizacion);
    
    console.log(usuarioConectado + "p");
    console.log(requiereAut + "p");
    
    if(requiereAut && !usuarioConectado){
        console.log(requiereAut + " uno")
        //console.log(usuarioConectado)
        next('login')
    }else if (!requiereAut && usuarioConectado){
        console.log(requiereAut + " dos")
        //console.log(usuarioConectado)
        next ('home');
    }else next();
})

export default router;