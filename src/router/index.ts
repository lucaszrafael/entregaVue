import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EntregaView from '../views/EntregaView.vue'
import VocabulosView from '../views/VocabuloView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/entrega',
      name: 'entregas',
      component: EntregaView
    },

    {
      path: '/vocabulos',
      name: 'vocabulos',
      component: VocabulosView
    }
  ]
})

export default router
