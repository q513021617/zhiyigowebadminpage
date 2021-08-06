import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'
import login from '@/views/login.vue'
import usermanager from '@/views/usermanager.vue'
import articleManage from '@/views/articleManage.vue'
import rolemanager from '@/views/rolemanager.vue'
import skilltreemanage from '@/views/skilltreemanage.vue'
import perosonalInfo from '@/views/perosonalInfo.vue'
// 
import seomanage from '@/views/seomanage.vue'

import photomanage from '@/views/photomanage.vue'
// 
import menumanager from '@/views/menumanager.vue'
import musicManager from '@/views/musicManager.vue'
import gameManager from '@/views/gameManager.vue'
import booklist from '@/views/booklist.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexhome',
    redirect:'/index/home'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect:'/index/home',
    children:[
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'usermanager',
        name: 'usermanager',
        component: usermanager
      },
      {
        path: 'perosonalInfo',
        name: 'perosonalInfo',
        component: perosonalInfo
      },
      {
        path: 'articleManage',
        name: 'articleManage',
        component: articleManage
      },{
        path: 'rolemanager',
        name: 'rolemanager',
        component: rolemanager
      },{
        path: 'skilltreemanage',
        name: 'skilltreemanage',
        component: skilltreemanage
      },{
        path: 'seomanage',
        name: 'seomanage',
        component: seomanage
      },{
        path: 'photomanage',
        name: 'photomanage',
        component: photomanage
      },{
        path: 'menumanager',
        name: 'menumanager',
        component: menumanager
      },{
        path: 'booklist',
        name: 'booklist',
        component: booklist
      },{
        path: 'musicManager',
        name: 'musicManager',
        component: musicManager
      },{
        path: 'gameManager',
        name: 'gameManager',
        component: gameManager
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass:'active',
  
})

export default router
