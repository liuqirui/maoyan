export const M_GETCINEMAS = "m_getcinemas";
export const M_GETSCREEN = "m_getscreen";
export const M_ADDFYT = "m_addfyt"; //添加放映厅
export const M_DELFYT = "m_delfyt"; //删除放映厅
export const M_DELDT = "m_deldt"; //删除放映厅
export const M_UPFYT = "m_upfyt"; //修改放映厅
export const A_GETCINEMAS = "a_getcinemas";
export const A_LOOKFYT = "a_lookfyt";
export const A_ADDSCREENS = "a_addscreens";
export const SAVEID = "saveId";
export const A_DELFYTS = "a_delfyts";
export const A_DELDUOTIAO = "a_delduotiao";
export const UPFYT = "upfyt";
export const A_CHANGE_FLAG = "a_change_flag";
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
//        初始化首页m_getcinemas
        [M_GETCINEMAS](state, obj) {
            state.cinema = obj.rows;
            state.total = obj.total
            state.maxpage = obj.maxpage
            state.curpage = obj.curpage
            state.eachpage = obj.eachpage
        },
//        初始化影厅m_getscreen
        [M_GETSCREEN](state,ary){
            state.screen=ary
        },
  
//        添加影厅m_addfyt
        [M_ADDFYT](state,ary){
            state.screen.push(ary)
        },
//      单个删除影厅m_delfyt
        [M_DELFYT](state,ary){
            for(let i=0;i<state.screen.length;i++){
                if(ary._id==state.screen[i]._id){
                    state.screen.splice(i,1)
                }
            }
        },
//        批量删除 m_deldt
        [M_DELDT](state,obj){
            for(let i=0;i<obj.length;i++){
                for(let j=0;j<state.screen.length;j++){
                    if(state.screen[j]._id==obj[i]._id){
                        state.screen.splice(j,1)
                    }
                }
            }
        },     
//       修改影厅名字m_upfyt
        [M_UPFYT](state,obj){
           state.screen.map((item) => {
                if(item._id == obj.rows2._id){
                    item.fname = obj.val
                    return item;
                }
                return item;
            })  
        }

    },
    getters: {

    },
    actions: {
        
//       主页数据 初始化 a_getcinemas
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
//        查看影厅a_lookfyt
      async [A_LOOKFYT]({commit,dispatch},obj){
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
             
//      添加放映厅a_addscreens
       async[A_ADDSCREENS]({commit,dispatch},obj){
            function sets(row,col){
                let ary = [];
                let num = 1;
                for(let i=1;i<=row;i++){
                    let content = [];
                    for(let j=1;j<=col;j++){
                      content.push({row:i,col:j,flag:false,num:num++,text:i+"排"+j+"号",isSell:false})
                    }
                    ary.push(content)
                }
                return ary
            }
            var datas = await axios.get('/fyt/add', {
                params:{
                    fname:obj.fname,
                    C_id:obj.rows._id,
                    setnum: obj.set.row * obj.set.col,
                    fdata:JSON.stringify(sets(obj.set.row,obj.set.col))
                },   
            })
               let newobj=datas.data.ops[0];
               newobj.yx=obj.rows;
               newobj.yx.fyt.push(datas.data.insertedIds[0])
               commit("m_addfyt",newobj)
               dispatch("saveId",{C_id:obj.rows._id, S_id:datas.data.insertedIds[0]})
        },          
//     影院绑定关联的放映厅的ID saveId
       async[SAVEID]({commit},ids){
            var datas = await axios.get('/cinema/update', {             
                params:{
                    _id:ids.C_id,
                    isPush: true,
                    fyt:ids.S_id
                }, 
            })
       },
           
//       单条移除放映厅 delfyts 
       async[A_DELFYTS]({commit},obj){
           let ary = obj.yx.fyt;
           for(let i=0;i<ary.length;i++){
               if(ary[i]==obj._id){
                   ary.splice(i,1)
               }
           }  
            let dataYx = await axios.get('/cinema/update',{params:{_id:obj.yx._id,fyt:JSON.stringify(ary)}})
            let dataFyt = await axios.get('/fyt/del',{params:{_id:obj._id}})
            commit("m_delfyt",obj)               
       },
//       批量移除    a_delduotiao
        async[A_DELDUOTIAO]({commit},obj){
            let fy = [];
            let ci =obj[0].yx.fyt;
            let ciId=obj[0].C_id;
            for(let i=0;i<obj.length;i++){
                fy.push(obj[i]._id)
            }
            for(let j=0;j<fy.length;j++){
             for(let s=0;s < ci.length;s++){
                    if(ci[s]==fy[j]){
                        ci.splice(s,1)
                    }
                }
            }
            let dataYx = await axios.get('/cinema/update',{params:{_id:ciId,fyt:JSON.stringify(ci)}})
            let dataFyt = await axios.get('/fyt/del',{params:{ids:JSON.stringify(fy)}})
            commit("m_deldt",obj)
//            
    
        },
    
//        修改影厅名字upfyt 
       async[UPFYT]({commit},obj){
          let datas = await axios.get('/fyt/update',{params:{_id:obj.rows2._id,fname:obj.val}})
          commit("m_upfyt",obj)
       },
//        选中座位a_change_flag
         [A_CHANGE_FLAG]({commit},obj){
            for(let i=0;i<obj.fdata.length;i++){
                for(let j = 0; j < obj.fdata[i].length;j++){
                    if(obj.num == obj.fdata[i][j].num){
                        obj.fdata[i][j].flag = !obj.fdata[i][j].flag;
                    }
                }
            }        
        axios.get('/fyt/update',{
             params:{
                 _id:obj.S_id,
                 fdata:JSON.stringify(obj.fdata)
             }})
        }
        

    }
}




export default store;




