import Vue from 'vue'
import Router from 'vue-router'

//一级路由
import Index from '@/components/maoyan/Index'

//二级路由
import Administrator from '@/components/administrator/Administrator';
import User from '@/components/user/User';
import Cinema from '@/components/cinema/Cinema';
import Match from '@/components/match/Match';
import Movie from '@/components/movie/Movie';
import Screens from '@/components/screens/Screens';
Vue.use(Router)

export default new Router({
    routes: [
            {
                path: '/',
                component: Index,
                children:[
                    {
                      path: '/administrator',
                    component: Administrator,  
                    },
                    {
                      path: '/user',
                    component: User,  
                    },
                    {
                      path: '/cinema',
                    component: Cinema,  
                    },
                    {
                      path: '/match',
                    component: Match,  
                    },
                    {
                      path: '/movie',
                    component: Movie,  
                    },
                    {
                      path: '/screens',
                    component: Screens,  
                    }
                ]
           }
        ]
})
