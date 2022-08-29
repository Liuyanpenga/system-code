import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall/Mall.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/User.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/others/PageOne.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/others/PageTwo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router