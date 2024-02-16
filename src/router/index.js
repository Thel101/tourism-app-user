import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Destinations from '../views/Destinations.vue'
import Plans from '../views/Plans.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: Destinations
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
