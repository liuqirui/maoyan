<template>
    <div>
        <div v-if="istable" style="padding:20px;">
            <el-table 
            :stripe=true
            :data="cinema"
            border
            tooltip-effect="dark">
            <el-table-column prop="C_name" label="影院名" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="C_ads" label="地址" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="O_web" label="官网" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column prop="O_phone" label="热线电话" show-overflow-tooltip  width="200"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="text" icon="setting" @click="lookfyt(scope.row)">进入影院</el-button>
                 </template>
            </el-table-column>
            </el-table>
            <div id="papge">
                <el-pagination
                      :current-page.sync="currentPage"
                      @current-change="handleCurrentChange"
                      :page-size="eachpage"
                      layout="total, prev, pager, next, jumper"
                      :total="total">
                </el-pagination>
            </div>
          

        </div>

        <div v-else>
          <el-card>
                <div slot="header" class="clearfix">
                    <span style="line-height:30px;font-weight:bold;font-size:30px;margin-left:100px;">{{C_name}}</span>
                    <el-button size="small"  icon="caret-left" @click="toindex" style="float:left;" v-if="isdisabled">返回首页</el-button>
                </div>

                 <div v-if="isShow">
                     <div class="tools" v-if="isipt">
                        <label>影厅名：</label><el-input v-model="ipt1" placeholder="请输入影厅名" style="width:180px;"></el-input>
                        <label>行数：</label><el-input-number v-model="ipt1_row" :min="5" :max="15" style="width:120px;"></el-input-number>
                        <label>列数：</label><el-input-number v-model="ipt1_col" :min="5" :max="15" style="width:120px;"></el-input-number>
                        <el-button size="large" icon="plus" @click="addfyt" style="margin-left:30px;">添加影厅</el-button>
                     </div>
                     <div class="tools" v-else>
                        <span> 影厅名 </span>
                        <el-input v-model="ipt2" style="width:300px;margin:0 10px;"></el-input>
                        <el-button size="small" icon="date" @click="saveup">保存</el-button>
                        <el-button size="small" icon="date" @click="cancelup">取消</el-button>
                     </div> 
                     <el-table
                            ref="multipleTable"
                            @selection-change="handleSelectionChange"
                            @row-click="rowClick"
                            :data="screen"
                            :stripe=true
                            border
                            empty-text="这个影院暂时还没有影厅，请添加影厅"
                            tooltip-effect="dark">
                          <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="fname" label="影厅名" show-overflow-tooltip  width="200"></el-table-column>
                        <el-table-column prop="setnum" label="座位数" show-overflow-tooltip  width="200"></el-table-column>
                        <el-table-column label="操作">
                           <template scope="scope" >
                                <el-button size="mini"  icon="view" @click="showset(scope.row)">预览</el-button>
                                <el-button size="small" icon="edit" @click="upfyt(scope.row)">修改</el-button>
                            </template>
                       </el-table-column>
                    </el-table>
                 </div>
                 <div v-else class="zuowei">
                     <div>
                         <el-button size="mini"  icon="caret-left" @click="closeshow">关闭</el-button>
                         <span style="font-weight:bold;margin-left:20px;">{{rows2.fname}}</span>
                         <span style="font-size:12px;margin-left:5px;">（{{rows2.setnum}}人厅）</span> 
                     </div>
                     <table class="setstable" style="margin-top:12px;">
                            <tr v-for="(item,index) in rows2.fdata">
                                <td v-for="(obj,index) in item" 
                                    :row="obj.row" 
                                    :col="obj.col" 
                                    :num="obj.num" 
                                    :class="{flag:obj.flag}"
                                    :id="rows2._id"
                                    @click="tdclick"></td>
                            </tr>
                     </table> 
                </div>                   
             </el-card>
            
<!--
            <el-popover
                  ref="popover5"
                  placement="top"
                  width="160"
                  v-model="visible2">
                  <p>是否确定删除选中的这些影厅？</p>
                  <div style="text-align: right; margin: 0">
                        <el-button type="primary" size="mini" @click="delfyt">确定</el-button>
                        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
   
                  </div>
            </el-popover>
            <el-button v-if="isdisabled" v-popover:popover5 size="small" icon="delete" @click="ischeck" style="margin:20px;">移除</el-button>
-->
            <el-button v-if="isdisabled"  size="small" icon="delete" @click="delfyt" style="margin:20px;">移除</el-button>
     </div>
  
 </div>
</template>
<script>
    export default {
//        什么命周期 初始化首页
        beforeMount() {
            this.$store.dispatch('a_getcinemas', {page:1})
        },
        computed: {
            cinema() {
                return this.$store.state.screens.cinema
            },
            screen() {
                return this.$store.state.screens.screen
            },
            maxpage() {
                return this.$store.state.screens.maxpage
            },
            total() {
                return this.$store.state.screens.total
            },
            curpage(){
              return this.$store.state.screens.curpage
            },
            eachpage(){
              return this.$store.state.screens.eachpage
           }
        },
        data() {
            return {
                visible2: true,
                multipleSelection: [],
                isdisabled:true,
                currentPage :1,
                dialogVisible: false,
                name_ipt: '',
                istable: true,
                ipt1: '',
                ipt1_row:10,
                ipt1_col:10,
                ipt2: '',
                rows:{},
                C_name:"",
                isipt:true,
                rows2:{},
                isShow:true,
            }
        },
        methods: { 
          handleSelectionChange(val) {
            this.multipleSelection = val;
            },
         rowClick(row){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
//           分页显示
          handleCurrentChange(val) {
              this.currentPage=val
                this.$store.dispatch('a_getcinemas', {page:val,rows: this.eachpage})
          },  
//            返回主页
            toindex(){
                  this.istable = !this.istable;
                  this.ipt1="";
                  this.ipt2="";
                  this.isipt=true;
                  this.rows={};
                  this.$store.dispatch('a_getcinemas', {page: 1});
            },
//            查看影厅
            lookfyt(row){
                this.istable = !this.istable
                this.rows = row;
                this.C_name= row.C_name;
                this.$store.dispatch('a_lookfyt',row);         
            },
//            座位预览
            showset(row){
                this.multipleSelection=[];
                this.isdisabled=false;
                this.isShow = false;
                this.rows2 = row;
            },    
//            点击座位切换状态
          tdclick(e){
              let S_id=e.target.id;
              let num=e.target.getAttribute("num");
              this.$store.dispatch('a_change_flag',{
                  S_id,
                  num,
                  fdata:this.rows2.fdata
              }); 
          },   
//            关闭座位预览
            closeshow(e){
                this.isdisabled=true;
                this.isShow = true;
                this.rows2={};
                this.visible2=false;
                this.multipleSelection=[];
            },
//            选中
           ischeck(){
                if(!this.multipleSelection.length){    
                    this.visible2 = false;
                    this.visible2 = true;
                    this.$message({
                        showClose: true,
                        message: '请选择你要删除的信息！',
                        duration: 1500
                    });
                }
            },
////            移除影厅
//           delfyt(){
//               if(this.multipleSelection.length ==1){
//                         this.$store.dispatch("a_delfyts",this.multipleSelection[0]) 
//               }else if(this.multipleSelection.length > 1){
//                         this.$store.dispatch("a_delduotiao",this.multipleSelection) 
//               }
//               this.$message({
//                        type: 'success',
//                        message: '删除成功!'
//                    });    
//               this.visible2=false;
//            },  
            //            移除影厅
           delfyt(){
               if(!this.multipleSelection.length){
                   return this.$message({
                        showClose: true,
                        message: '请选择你要删除的影厅！',
                        duration: 1500
                    });
               }
               this.$confirm('此操作将永久删除选择的影厅, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                   if(this.multipleSelection.length ==1){
                         this.$store.dispatch("a_delfyts",this.multipleSelection[0]) 
                   }else{
                         this.$store.dispatch("a_delduotiao",this.multipleSelection) 
                   }
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
            },   
//           添加影厅
            addfyt() {
                if(this.ipt1 == ""){
                   this.$message({
                      showClose: true,
                      duration:2000,
                      message: '请输入你要添加的放映厅名字！'
                    });
                }else{
                     this.$message({
                      showClose: true,
                      message: '添加成功！',
                      duration:2000,
                      type: 'success'
                     });
                    this.$store.dispatch('a_addscreens', {
                        fname: this.ipt1,
                        rows:this.rows,
                        set:{
                            row:this.ipt1_row,
                            col:this.ipt1_col
                        }
                    });
                }   
            },    
                     
//            修改按钮
            upfyt(row){
                this.isipt = false;
                this.ipt2 = row.fname;
                this.rows2 = row;
            },
//            保存修改内容
            saveup(){
                if(this.ipt2 ==""){
                    return this.$message({
                              showClose: true,
                              duration:2000,
                              message: '名字不能为空！！'
                            });
                }
                this.$message({
                      showClose: true,
                      message: '修改成功！',
                      duration:2000,
                      type: 'success'
                });
                this.$store.dispatch("upfyt",{val:this.ipt2,rows2:this.rows2}) 
                this.isipt = true;
                this.ipt1 = "";
                this.ipt2 = "";
                this.rows2={};
            },
//            取消修改
            cancelup(){
                this.isipt = true;
                this.ipt1 = "";
                this.ipt2 = "";
                this.rows2={};
            }   
        },
    }
</script>

<style>
    .zuowei{
        display: flex;
        flex-direction: column;
        margin-left: 150px;
    }
    .flag{
        background-color: green;
    }
    .setstable td{
        width: 16px;
        height: 16px;
        margin: 10px;
        border: 1px solid #cccccc;
        border-radius: 3px;
    }
    .tools{
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .tools label{
        margin-left: 30px;
    }
      .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both;
  }

 #papge {
     margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
