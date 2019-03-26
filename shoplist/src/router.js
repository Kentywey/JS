import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/ListSelected.vue'
import Lists from './views/Lists.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'app', component: Home
    },
    {
      path: '/list/:id/:name', name: 'list', component: List
    },
    {
      path: '/lists', name: 'lists', component: Lists
    },
    {
      path: '/about', name: 'about', component: About
    }
  ]
})
