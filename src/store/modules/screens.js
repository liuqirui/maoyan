export const A_GETCINEMAS = "a_getcinemas";
export const M_GETCINEMAS = "m_getcinemas";
export const A_GETSCREENS = "a_getscreens";
import Vuex from 'vuex';
import axios from 'axios';
const store = {
    state: {
        cinema:[],
        screen:[],
        total: 0,
        maxpage: 0,
        curpage:0,
        eachpage:10,
    },
    mutations: {
//        初始化首页
        [M_GETCINEMAS](state, obj) {
            state.cinema = obj.rows;
            state.total = obj.total
            state.maxpage = obj.maxpage
            state.curpage = obj.curpage
            state.eachpage = obj.eachpage
        },
//        初始化影厅
        m_getscreen(state,ary){
            state.screen=ary
        },
//        添加影厅
        m_addfyt(state,ary){
            state.screen.push(ary)
        },
//        删除影厅
        m_delfyt(state,ary){
            for(let i=0;i<state.screen.length;i++){
                if(ary._id==state.screen[i]._id){
                    state.screen.splice(i,1)
                }
            }
        },
//       修改影厅名字
        m_upfyt(state,obj){
           state.screen.map((item) => {
                if(item._id == obj.rows2._id){
                    item.fname = obj.val
                    return item;
                }
                return item;
            })  
        },
//        座位预览
        m_showset(state,obj){
            console.log(obj,666666)
            
        }
        
    },
    getters: {

    },
    actions: {
        
//       主页数据 初始化
        async[A_GETCINEMAS]({commit,dispatch},obj) {
            obj.rows = 10;     
            var datas = await axios.get('/cinema/find', {
                params: obj,   
            })
            commit('m_getcinemas', {
                rows: datas.data.rows,
                curpage: datas.data.curpage,
                eachpage: datas.data.eachpage,
                maxpage: datas.data.maxpage,
                total: datas.data.total,
            }) 
        },
//        查看影厅
      async a_lookfyt({commit,dispatch},obj){
          let ary =[];
          for(let item of obj.fyt){
          var datas = await axios.get('/fyt/find', {
                params: {_id:item},   
            })
                datas.data.yx=obj
                ary.push(datas.data)
          } 
          commit("m_getscreen",ary)
        },
             
//      添加放映厅
       async a_addscreens({commit,dispatch},obj){
           
            function sets(row,col){
                let ary = [];
                let num = 1;
                for(let i=1;i<=row;i++){
                    let content = [];
                    for(let j=1;j<=col;j++){
                        content.push({row:i,col:j,flag:false,num:num++})
                    }
                    ary.push(content)
                }
                return ary
            }
   
            var datas = await axios.get('/fyt/add', {
                params:{
                    fname:obj.fname,
                    C_id:obj.rows._id,
                    fdata:JSON.stringify(sets(10,10))
                },   
            })
            let newobj=datas.data.ops[0];
                newobj.yx=obj.rows;
               commit("m_addfyt",newobj)
               dispatch("saveId",{C_id:obj.rows._id, S_id:datas.data.insertedIds[0]})
        },        
        
//     影院绑定关联的放映厅的ID
       async saveId({commit},ids){
            var datas = await axios.get('/cinema/update', {             
                params:{
                    _id:ids.C_id,
                    isPush: true,
                    fyt:ids.S_id
                }, 
            })
       },
//        移除放映厅
       async delfyt({commit},obj){
           let ary = obj.yx.fyt;
              console.log(ary)
           for(let i=0;i<ary.length;i++){
               if(ary[i]==obj._id){
                   ary.splice(i,1)
               }
           }
//        
            let dataYx = await axios.get('/cinema/update',{params:{_id:obj.yx._id,fyt:ary}})
            let dataFyt = await axios.get('/fyt/del',{params:{_id:obj._id}})
            commit("m_delfyt",obj)     
       },
        
//        修改影厅名字
       async upfty({commit},obj){
          let datas = await axios.get('/fyt/update',{params:{_id:obj.rows2._id,fname:obj.val}})
          commit("m_upfyt",obj)
       }

    }
}




export default store;




