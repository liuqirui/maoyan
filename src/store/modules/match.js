import Vuex from 'vuex';
import axios from 'axios';
//获取正在热映的电影
export const GET_MOVIES_LIST = "GET_MOVIES_LIST"
export const ASYNC_MOVIES_LIST = "ASYNC_MOVIES_LIST"
//获取电影院
export const GET_CINEMA_LIST = "GET_CINEMA_LIST"
export const ASYNC_CINEMA_LIST = "ASYNC_CINEMA_LIST"
//分页查询电影
export const GET_Match_LIST = "GET_Match_LIST"
export const ASYNC_Match_LIST = "ASYNC_Match_LIST"
//根据影院id查询影厅
export const GET_MOVIEHALL_LIST = "GET_MOVIEHALL_LIST"
export const ASYNC_MOVIEHALL_LIST = "ASYNC_MOVIEHALL_LIST"
//增加排片
export const GET_MATCHING_LIST = "GET_MATCHING_LIST"
export const ASYNC_MATCHING_LIST = "ASYNC_MATCHING_LIST"
//根据电影id查询排片
export const GET_FINDMATCHING_LIST = "GET_FINDMATCHING_LIST"
export const ASYNC_FINDMATCHING_LIST = "ASYNC_FINDMATCHING_LIST"
const store = {
    state: {
      	match_movies:[
			
		],
		macth_cinemas:[
			
		],
		macth_moviehall:[
			
		],
		match_movieData:[
			
		],
		match_matchingData:[
			
		]
    },
    mutations: {
        [GET_MOVIES_LIST](state,movies){
			state.match_movies = movies
		},
		[GET_CINEMA_LIST](state,cinemas){
			state.macth_cinemas = cinemas
		},
		[GET_Match_LIST](state,matchs){
			state.match_movieData = matchs.rows
			state.match_maxpage=matchs.maxpage
            state.match_total=matchs.total
		},
		[GET_MOVIEHALL_LIST](state,arr){
			state.macth_moviehall = arr
		},
		[GET_FINDMATCHING_LIST](state,matching){
			state.match_matchingData =  matching
		}
    },
    getters: {
    
    },
    actions: {
		//获取正在热映的电影
        async [ASYNC_MOVIES_LIST](context) {
            var movies = await axios.get('/movie/find')
			context.commit(GET_MOVIES_LIST,movies.data)
        },
		//获取电影院
		async [ASYNC_CINEMA_LIST](context){
			var cinemas = await axios.get('/cinema/find')
			context.commit(GET_CINEMA_LIST, cinemas.data)
		},
		//分页查询电影
		async [ASYNC_Match_LIST](context,obj){
			var matchs = await axios.get('/movie/find',{
				params:obj
			})
			context.commit(GET_Match_LIST, matchs.data)
		},
		//根据影院id查询影厅
		async [ASYNC_MOVIEHALL_LIST](context,id){
			var moviehall = await axios.get('/fyt/find',{
				params:{
					C_id:id
				}
			})
			context.commit(GET_MOVIEHALL_LIST,moviehall.data)
		},
		//增加排片
		async [ASYNC_MATCHING_LIST](context,obj){
			console.log("11")
			var addmatching = await axios.get('/match/add',{
				params:obj
			})
		},
//		async [ASYNC_MATCHING_LIST](context,obj){
//			console.log("11")
//			var addmatching = await axios.post('/match/add',obj)
//		},
		//根据电影id查询排片
		async [ASYNC_FINDMATCHING_LIST](context,id){
			var findmatching = await axios.get('/match/find',{
				params:{
					m_id:id
				}
			})
			context.commit(GET_FINDMATCHING_LIST,findmatching.data)
		}
    }
}
export default store;