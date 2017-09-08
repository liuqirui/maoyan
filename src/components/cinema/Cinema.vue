<template>
  <div>
      <div id="topbtn" v-if="true">
           <el-button slot="append"  icon="share" @click="addim">添加</el-button>
          <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visible">
              <p>确定删除选中的内容吗？</p>
              <div style="text-align: right; margin: 0">
                  <el-button type="primary" size="mini" @click="closeim ">确定</el-button>
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                
              </div>
            </el-popover>
           <el-button slot="append" icon="delete" v-popover:popover5 @click="closeimm">删除</el-button>
           <el-button slot="append" icon="edit" @click="changeim">修改</el-button>      
          
            <el-input v-model="search_ipt" style="width:400px;" placeholder="请输入内容">
                  <el-select v-model="shousuo" style="width:100px;"  slot="prepend" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
                <el-button  slot="append" icon="search" @click='search'></el-button>
          </el-input>
           
           <el-button slot="append"  icon="arrow-left" @click='backall'>返回</el-button>     
      </div>
      <div v-if="opent">
      <el-table  ref="multipleTable"
                :stripe=true
                :data="cinema"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="C_name" label="院线名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="C_ads" label="地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="O_phone" label="电话" show-overflow-tooltip></el-table-column>
            
            <el-table-column prop="O_web" label="官网" show-overflow-tooltip></el-table-column>
 </el-table>
       
      
      <div id="papge">
          <div class="block">
              <el-pagination layout="prev, pager, next" :total="total" @current-change='currentPage'></el-pagination>
          </div>
      </div>
          </div>
          
      <div v-if="dialogVisible" id="messagebox">
                
              <div><span>院线名：</span><el-input class="inputlong" v-model="name_ipt"></el-input></div>
             
              <div><span>地　址：</span><el-input class="inputlong" v-model="ads_ipt"></el-input></div>
               <div><span>电　话：</span><el-input class="inputlong" v-model="phone_ipt"></el-input></div>
              <div><span>官　网：</span><el-input class="inputlong" v-model="web_ipt"></el-input></div>
              

             
              <div id="tools">
                   <el-button type="primary" size="small" icon="date" @click="savecia">保存</el-button>
                    <el-button type="primary" size="small" icon="close" @click="closecia">关闭</el-button>
              </div>

      </div>
   
  </div>
</template>

<script>
    export default {
        beforeMount() {
            this.$store.dispatch('bm', {
                page: 1,
                rows: 10
            })
        },
        computed: {
            cinema() {
                return this.$store.state.cia.cinema
            },
            maxpage() {
                return this.$store.state.cia.maxpage
            },
            total() {
                return this.$store.state.cia.total
            }
        },
        data() {
            return {
                visible: false,

                dialogVisible: false,
                opent: true,
                multipleSelection: [],
                title: '',
                dq: 1,
                name_ipt: '',
                phone_ipt: '',
                ads_ipt: '',
                web_ipt: '',

                options: [{
                    value: '院线名',
                    label: '院线名'
                }, {
                    value: '地址',
                    label: '地址'
                }, {
                    value: '官网',
                    label: '官网'
                }],
                shousuo: '',
                search_ipt: ''
            }
        },
        methods: {

            addim(e) {
                this.title = "添加"
                this.dialogVisible = !this.dialogVisible
                this.opent = !this.opent
            },
            closeimm() {
                console.log(this.multipleSelection)
                if (!this.multipleSelection.length) {
                    this.visible = true


                    return this.$message({
                        showClose: true,
                        message: '请选择你要删除的信息！',
                        duration: 1500
                    });

                }

            },
            closeim() {

                //                if (!this.multipleSelection.length) {
                //                    return this.$message({
                //                        showClose: true,
                //                        message: '请选择你要删除的信息！',
                //                        duration: 1500
                //                    });
                //                } else {
                //                    this.$confirm('此操作将永久删除选中的影院, 是否继续?', '提示', {
                //                        confirmButtonText: '确定',
                //                        cancelButtonText: '取消',
                //                        type: 'warning'
                //                    }).then(() => {
                //                        if (this.multipleSelection.length > 1) {
                //                            let ids = [];
                //                            for (let item of this.multipleSelection) {
                //                                ids.push(item._id)
                //                            }
                //                            this.$store.dispatch('deldt', ids)
                //                               this.search(this.dq)
                //                        } else if (this.multipleSelection.length = 1) {
                //                            this.$store.dispatch('delonly', this.multipleSelection[0]._id)
                //                            this.search(this.dq)
                //                        }
                //                        this.$message({
                //                            type: 'success',
                //                            message: '删除成功!'
                //                        });
                //                        console.log(123)
                //                    }).catch(() => {
                //
                //                        this.$message({
                //
                //                            type: 'info',
                //                            message: '已取消删除'
                //                        });
                //                    });
                //                }


                if (this.multipleSelection.length > 1) {
                    let ids = [];
                    let ods=[];
                    for (let item of this.multipleSelection) {
                        ids.push(item._id)
                        for(let indexx of item.fyt){
                            
                            ods.push(indexx)
                            
                        }
                    }
                    console.log(ods)
                    this.$store.dispatch('deldt', ids)
                    this.$store.dispatch('delfyt', ods)
                    
                    this.search(this.dq)
                    
                } else if (this.multipleSelection.length = 1) {
                    let ods=[];
                    
                    for (let item of this.multipleSelection[0].fyt){
                        ods.push(item)
                    }
                    
                    
                    console.log(ods)
                    this.$store.dispatch('delfyt',ods)
                    this.$store.dispatch('delonly', this.multipleSelection[0]._id)
                    
                    this.search(this.dq)
                }
                this.visible = false


            },
            changeim() {
                this.title = "修改"
                if (!this.multipleSelection.length) {
                    return this.$message({
                        showClose: true,
                        message: '请选择你要修改的信息！',
                        duration: 1500
                    });
                } else if (this.multipleSelection.length > 1) {
                    return this.$message({
                        showClose: true,
                        message: '修改只能选中一条信息！',
                        duration: 1500
                    });
                } else {
                    this.upcia();
                }
                this.dialogVisible = !this.dialogVisible
                this.opent = !this.opent
            },
            //返回
            backall(i) {

                this.$store.dispatch('bm', {
                    page: i
                });
            },


            //            搜索
            search(i) {
                switch (this.shousuo) {
                    case "全部":
                        this.$store.dispatch('bm', {
                            page: i
                        });
                        break;
                    case "院线名":
                        this.$store.dispatch('bm', {
                            page: i,
                            C_name: this.search_ipt
                        });
                        break;
                    case "官网":
                        this.$store.dispatch('bm', {
                            page: i,
                            O_web: this.search_ipt
                        });
                        break;
                    case "地址":
                        this.$store.dispatch('bm', {
                            page: i,
                            C_ads: this.search_ipt
                        });
                        break;
                    default:
                        this.$store.dispatch('bm', {
                            page: i
                        });
                        break
                }
                this.search_ipt = ""
            },
            //            修改 => 设置文本框内容
            upcia() {
                let cia = this.multipleSelection[0];
                this.name_ipt = cia.C_name;
                this.phone_ipt = cia.O_phone;
                this.ads_ipt = cia.C_ads;
                this.web_ipt = cia.O_web;

            },
            ilikered() {
                console.log("123")
            },
            //                   暂存选中的
            handleSelectionChange(val) {

                this.multipleSelection = val;
            },

            //                         保存
            savecia() {
                if (this.title == "添加") {
                    this.savefs('a_addcia');
                    //下面注释四行代码不要删除，解除注释后添加完数据后文本框清空
                    //                    this.name_ipt = '';
                    //                    this.phone_ipt = '';
                    //                    this.ads_ipt = '';
                    //                    this.web_ipt = '';
                }
                if (this.title == "修改") {
                    this.savefs('a_upcia', this.multipleSelection[0]._id);
                }
            },

            //           保存方式
            savefs(fs, id) {
                let obj = {
                    C_name: this.name_ipt,
                    O_phone: parseInt(this.phone_ipt),
                    C_ads: this.ads_ipt,

                    O_web: this.web_ipt,
                  
                }
                if (id) {
                    obj._id = id
                }
                this.$store.dispatch(fs, obj)
                this.dialogVisible = !this.dialogVisible;
                this.opent = !this.opent
                this.search(this.dq)
            },
            //            关闭
            closecia() {
                this.dialogVisible = !this.dialogVisible
                this.opent = !this.opent
                this.name_ipt = '';
                this.phone_ipt = '';
                this.ads_ipt = '';
                this.web_ipt = '';

            },
            //            分页查询
            currentPage(currentPage) {
                this.dq = currentPage
                this.search(currentPage)
            }


        }
    }

</script>


<style scoped>
    #tools {
        margin-top: 20px;
        float: right;
        margin-right: 35px
    }

    #papge {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #topbtn {
        padding: 15px
    }

    #messagebox {
        width: 400px;
        margin: auto
    }

    .inputlong {
        width: 300px;
        margin-top: 20px
    }

</style>
