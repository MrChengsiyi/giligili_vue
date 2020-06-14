import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  base:process.env.Base_URL,
    routes: [{
        path: '/',
        name: 'home',
        component:Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:'/PostVideo',
      name:'PostVideo',
      component: () => import(/* webpackChunkName: "about" */ './views/PostVideo.vue')
    }
  ],
});
