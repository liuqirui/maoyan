import Vuex from 'vuex';
import axios from 'axios';
const store = {
    state: {
        movie: [],
        total: 0,
        page: 1
    },
    mutations: {
        movie(state, obj) {
            state.movie = obj.ary
            state.total = obj.total
            state.page = obj.page
        },
    },
    getters: {

    },
    actions: {
        async FINDMOVIE({
            commit,
            state
        }) {
            var movies = await axios.get('http://127.0.0.1:3000/movie/find', {
                params: {
                    page: state.page,
                    rows: 10
                }
            })
            commit('movie', {
                type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                page: movies.data.curpage
            })
        },
        async ADDMOVIE({
            commit
        }, obj) {
            let newmovie = obj.item
            var movies = await axios.get('http://127.0.0.1:3000/movie/add', {
                params: { ...newmovie}
            })
            commit('movie', {
                type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                page: movies.data.curpage
            })
        },
        async PAGECHANGE({
            commit,
            state
        }, obj) {
            var movies = await axios.get('http://127.0.0.1:3000/movie/find', {
                params: {
                    page: obj.page,
                    rows: 10
                }
            })
            commit('movie', {
                type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                page: movies.data.curpage
            })
        },
        async DELMOVIE({
            commit,
            state,
            actions
        }, obj) {
          if(obj.id){
            var movie = await axios.get('http://127.0.0.1:3000/movie/del', {
                params: {
                    ids: [obj.id]
                }
            })
            var movies = await axios.get('http://127.0.0.1:3000/movie/find', {
                params: {
                    page: 1,
                    rows: 10
                }
            })
            commit('movie', {
               type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                 page: movies.data.curpage
            })
        }
        },
        async UPDATEMOVIE({
            commit,
            state
        }, obj) {
          let newmovie = obj.item
            var movies = await axios.get('http://127.0.0.1:3000/movie/update', {
                params: { ...newmovie}
            })
            commit('movie', {
                type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                page: movies.data.curpage
            })
        },
//        搜索
        async SEARCH({
            commit,
            state
        }, obj) {
          let condition = obj.condition
          console.log(condition)
            var movies = await axios.get('http://127.0.0.1:3000/movie/find', {
                params:{ page:obj.page,
                    rows: 10,...condition}
            })
            commit('movie', {
                type: 'movie',
                ary: movies.data.rows,
                total: movies.data.total,
                page: movies.data.curpage
            })
        },
    }
}
export default store;
