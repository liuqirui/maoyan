import Vuex from 'vuex';
import axios from 'axios';
const store = {
    state: {
       
    },
    mutations: {
        m_arystu(state,obj){
            state.students=obj.rows
            state.maxpage=obj.maxpage
            state.total=obj.total
        },
        m_change_dialogVisible(state) {
            state.dialogVisible = !state.dialogVisible
        }
    },
    getters: {
    
    },
    actions: {
         delonly({commit},id){
            axios.get('http://127.0.0.1:3000/people/del', {params: {_id:id}})
         },
        deldt({commit},ids){
            axios.get('http://127.0.0.1:3000/people/del', {params: {ids}})
        },
        async bm({commit},sss){
                    sss.rows=10;
                    if(sss.age){
                       sss.age=parseInt(sss.age) 
                        console.log(sss.age)
                    }
                    var users = await axios.get('http://127.0.0.1:3000/people/find', {
                        params: sss
                    })
                   commit('m_arystu',{
                        rows: users.data.rows,
                        curpage: users.data.curpage,
                        eachpage: users.data.eachpage,
                        maxpage: users.data.maxpage,
                        total:users.data.total
                    })
        },

    }
}
export default store;
