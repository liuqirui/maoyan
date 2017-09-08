import Vuex from 'vuex';
import axios from 'axios';
const store = {
    state: {
        cinema:[],
        maxpage:0,
        total:0,
    },
    mutations: {
        m_arycia(state,obj){
            state.cinema=obj.rows
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
        //修改院线
        a_upcia({commit},obj){
             axios.get('http://127.0.0.1:3000/cinema/update', {params: obj})
        }, 
//        添加院线 
        a_addcia({commit}, obj) {
                console.log(obj)
                axios.get('http://127.0.0.1:3000/cinema/add', {params: {
                    C_name:obj.C_name,
                    O_phone:obj.O_phone,
                    C_ads:obj.C_ads,
                    O_web:obj.O_web,
                    fyt:JSON.stringify([]),
                }})
            
        },
//        单条删除
         delonly({commit},id){
            axios.get('http://127.0.0.1:3000/cinema/del', {params: {_id:id}})
         },
//        多条删除
        deldt({commit},ids){
            axios.get('http://127.0.0.1:3000/cinema/del', {params: {ids}})
        },
        //删除放映厅
         delfyt({commit},ids){
             console.log(ids)
            axios.get('http://127.0.0.1:3000/fyt/del', {params: {ids}})
        },
//        分页查询
        async bm({commit},sss){
                    sss.rows=10;
                    if(sss.age){
                       sss.age=parseInt(sss.age) 
                        console.log(sss.age)
                    }
                    var users = await axios.get('http://127.0.0.1:3000/cinema/find', {
                        params: sss
                    })
                   commit('m_arycia',{
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
