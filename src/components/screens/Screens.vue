<template>
    <div>
            <div v-if="istable">
                <el-table ref="multipleTable"
                :stripe=true
                :data="cinema"
                border
                tooltip-effect="dark">
                <el-table-column prop="C_name" label="影院名" show-overflow-tooltip  width="250"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="text" icon="menu" @click="lookfyt(scope.row)">进入影院</el-button>
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
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" >
                            <span style="line-height:30px;font-weight:bold;margin-left:100px;">{{C_name}}</span>
                            <el-button size="small"  icon="caret-left" @click="toindex" style="float:left;">返回影院</el-button>
                        </div>
                        
                     <div class="tools" v-if="isipt">
                        <span> 影厅名 </span>
                        <el-input v-model="ipt1" style="width:300px;margin:0 10px;"></el-input>
                        <el-button size="small" icon="plus" @click="addfyt">添加影厅</el-button>
                    </div>
                    <div class="tools" v-else>
                        <span> 影厅名 </span>
                        <el-input v-model="ipt2" style="width:300px;margin:0 10px;"></el-input>
                        <el-button size="small" icon="date" @click="saveup">保存</el-button>
                    </div> 
                            
                       <el-table
                            v-if="isShow"
                            :stripe=true
                            :data="screen"
                            border
                            tooltip-effect="dark">
                        <el-table-column prop="fname" label="影厅名" show-overflow-tooltip  width="250"></el-table-column>
                        <el-table-column label="操作">
                           <template scope="scope" >
                                <el-button size="small" icon="delete" @click="delfyt(scope.row)">移除影厅</el-button>
                                <el-button size="small"  icon="edit" @click="upfyt(scope.row)">修改影厅</el-button>
<!--                            <el-button size="small"  icon="view" @click="showset(scope.row)">座位预览</el-button>-->
                            </template>
                       </el-table-column>
                    </el-table>
                     <div v-else>
                         <table>
                            <tr>
                                <td>1-1</td>
                                <td>1-2</td>
                            </tr>
                         </table> 
                    </div>                   
                    </el-card>
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
                currentPage :1,
                dialogVisible: false,
                name_ipt: '',
                istable: true,
                ipt1: '',
                ipt2: '',
                rows:{},
                C_name:"",
                isipt:true,
                rows2:{},
                isShow:true,
                num:25
            }
        },
        methods: {          
//                分页条
              handleCurrentChange(val) {
                  this.currentPage=val
                    this.$store.dispatch('a_getcinemas', {page:val,rows: this.eachpage})
              },
            
            
//            查看影厅
            lookfyt(row){
                this.istable = !this.istable
                this.rows = row;
                this.C_name= row.C_name;
                this.$store.dispatch('a_lookfyt',row);         
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
                        rows:this.rows
                    });
                }   
            },       
//            移除影厅
            delfyt(row){
                 this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                    this.$store.dispatch("delfyt",row) 
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
                this.$store.dispatch("upfty",{val:this.ipt2,rows2:this.rows2}) 
                this.isipt = true;
                this.ipt2 = "";
                this.rows2={};
            },
//            座位预览
            showset(row){
                this.isShow = false
//                this.$store.commit("m_showset",row)
            }
            
        },
    }
</script>
<style>
    .tools{
        margin:0 0 20px 50px;;
        display: flex;
        justify-content: flex-start;
        align-items: center;
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
  .box-card {
    width: 100%;
  }
 #papge {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
