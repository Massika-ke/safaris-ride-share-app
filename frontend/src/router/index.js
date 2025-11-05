import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import axios from 'axios'
import LocationView from '@/views/LocationView.vue'
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/location',
      name: 'location',
      component: LocationView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    }
  ],
})

// redirect routes for auth/login
router.beforeEach((to, from) => {
  if (to.name = 'login') {
    return true
  }

  if (!localStorage.getItem('token')) {
    return{
      name : 'login'
    }
  }


  checkTokenAuthenticity()
})

const checkTokenAuthenticity = () =>{
  axios.get('http://backend.test/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then((response) => {})
  .catch((error) => {
    localStorage.removeItem('token')
    router.push({
      name: 'login'
    })
  })
}

export default router
 