import {createRouter, createWebHistory} from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'
import Login from '../pages/Login/index.vue'
import Home from '../pages/Home/index.vue'
import Team from '../pages/Team/index.vue'
import User from '../pages/User/index.vue'
import Search from '../pages/Search/index.vue'
import SearchResult from '../pages/Search/SearchResult/index.vue'
import UserEdit from '../pages/UserEdit/index.vue'

const routes = [
    {path: '', redirect: '/home'},
    {path: '/login', component: Login},
    {
        path: '/',
        component: BasicLayout,
        children: [
            {path: 'home', component: Home},
            {path: 'team', component: Team},
            {path: 'user', component: User},
        ]
    },
    {path: '/search', component: Search},
    {path: '/search/result', component: SearchResult},
    {path: '/user/edit', component: UserEdit},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router