<template>
 <div>
  <div v-if='!dialogFormVisible'>
  
   <el-popover
  ref="popover"
  placement="bottom"
  width="160"
  v-model="visible">
  <p>确定删除这条电影吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible= false">取消</el-button>
    <el-button type="primary" size="mini" @click="delmovue">确定</el-button>
  </div>
</el-popover>
  <div  style="margin: 15px;">
  <el-button type="primary" @click="addMoviePage" size="small" icon="share">增加</el-button>
  <el-button type="primary" v-popover:popover @click="open"  size="small" icon="delete">删除</el-button>
  <el-button type="primary" @click="updatePage" size="small" icon="edit">修改</el-button>
  <el-input placeholder="请输入内容" class='input' v-model="serinput">
    <el-select v-model="select" slot="prepend" class='selsect' placeholder="请选择">
      <el-option label="电影名" value="M_name"></el-option>
      <el-option label="电影类型" value="M_type"></el-option>
    </el-select>
    <el-button slot="append" @click="searchMovie"  icon="search"></el-button>
  </el-input>
</div>
   <el-table
    ref="singleTable"
    :data="movie"
    border stripe row-key='_id'
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column show-overflow-tooltip property="M_name" label="电影名" width="120"></el-table-column>
    <el-table-column  show-overflow-tooltip   property="E_name" label="电影英文名" width="120">   </el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="M_type" label="电影类型"></el-table-column>
    <el-table-column width="70" show-overflow-tooltip property="M_grade" label="评分"></el-table-column>
    <el-table-column width="125" show-overflow-tooltip property="A_name" label="导演演员姓名"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="want" label="想看人数"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="W_long" label="时长"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="S_time" label="上映时间"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="box_office" label="票房"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="det" label="电影简介"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="M_cover" label="电影图片"></el-table-column>
    <el-table-column width="120" show-overflow-tooltip property="A_img" label="导演演员图片"></el-table-column>
  </el-table>
  <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :page-size="10"
    @current-change="currentChange"
    :total="total">
  </el-pagination>
  </div>
</div>
 <div v-if='dialogFormVisible'  class='addinput'>
  <el-form :model="form"   :inline="true">
    <el-form-item label="电影名" label-width="100px">
      <el-input v-model="form.M_name"   auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影英文名" label-width="100px">
      <el-input v-model="form.E_name"  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电影类型" label-width="100px">
      <el-input v-model="form.M_type" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="评分" label-width="100px"><el-input v-model="form.M_grade" auto-complete="off"></el-input></el-form-item>
     <el-form-item label="导演演员姓名" label-width="100px"><el-input v-model="form.A_name" auto-complete="off"></el-input></el-form-item>
      <el-form-item label="想看人数" label-width="100px"><el-input v-model="form.want" auto-complete="off"></el-input></el-form-item>
         <el-form-item label="时长" label-width="100px"><el-input v-model="form.W_long" auto-complete="off"></el-input></el-form-item>
          <el-form-item label="上映时间" label-width="100px"><el-input v-model="form.S_time" auto-complete="off"></el-input></el-form-item>
           <el-form-item label="电影票房" label-width="100px"><el-input v-model="form.box_office" auto-complete="off"></el-input></el-form-item>
           <el-form-item label="电影图片"  v-if='updatebtn'  label-width="100px"><el-input class='imges' :rows='3'  type="textarea"  v-model="form.M_cover" auto-complete="off"></el-input></el-form-item>
           <el-form-item label="导演演员图片"  v-if='updatebtn' label-width="100px"><el-input class='imges' :rows='3'  type="textarea"  v-model="form.A_img" auto-complete="off"></el-input></el-form-item>
           <el-form-item label="电影简介" label-width="100px"><el-input class='text' :rows='4'  type="textarea"  v-model="form.det" auto-complete="off"></el-input></el-form-item>
  </el-form>
  <div class='upload'  v-if='addbtn' ><el-upload
  class="upload-demo"
  action="/upload"
  :on-remove="handleRemove"
  :on-success="handle"
  list-type="picture">
  <el-button size="small" type="primary">电影图片点击上传</el-button>
</el-upload></div>
   <div  class='upload'  v-if='addbtn'><el-upload
  class="upload-demo"
  action="/upload"
  :on-remove="actorhandleRemove"
  :on-success="actorhandle"
  list-type="picture">
  <el-button size="small" type="primary">导演,演员图片上传</el-button>
</el-upload></div>
  <div v-if='addbtn' class="btnblock">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addmovie">确 定</el-button>
  </div>
  <div v-if='updatebtn' class="block">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatemovie">确 定</el-button>
  </div>
</div>
  </div>
</template>
<script>
    export default {
        beforeMount() {
            this.$store.dispatch({
                type: 'FINDMOVIE',
            })
        },
        data() {
            return {
                visible:false,
                checkedID: '',
                serinput: '',
                select: '',
                updatebtn: false,
                addbtn: false,
                dialogFormVisible: false,
                form: {
                    "M_name": "",
                    "E_name": "",
                    "M_type": "",
                    "M_grade": "",
                    "A_name": '',
                    "want": "",
                    "area": "",
                    "W_long": "",
                    "S_time": "",
                    "det": "",
                    "box_office": "",
                    "M_cover": "",
                    "A_img": '',
                },
                currentRow: null,
                fileList: [],
                actorfileList: [],
            }
        },
        methods: {
            //            上传电影图片
            handle(file, fileList){
                let tempPath = file.replace(/\\/g, "/").replace('public','.')
                this.fileList.push(tempPath)
                this.form.M_cover=this.fileList
            },
            handleRemove(file, fileList) {
                let tempPath = file.response.replace(/\\/g, "/").replace('public','.');
                let newary=this.fileList.filter((ary)=>{
                 return ary!=tempPath
             })
                this.fileList=newary
                this.form.M_cover=newary
            },
            //            上传导演任务图片
            actorhandle(file, fileList){
                let tempPath = file.replace(/\\/g, "/").replace('public','.')
                this.actorfileList.push(tempPath)
                this.form.A_img=this.actorfileList
            },
            actorhandleRemove(file, fileList) {
                let tempPath = file.response.replace(/\\/g, "/").replace('public','.');
                let newary=this.actorfileList.filter((ary)=>{
                 return ary!=tempPath
             })
                this.actorfileList=newary
                this.form.A_img=newary
            },
            //            搜索
            searchMovie() {
                if (this.select != '') {
                    if (this.select == 'M_name') {
                        this.$store.dispatch({
                            type: 'SEARCH',
                            condition: {
                                M_name: this.serinput
                            }
                        })
                    } else if (this.select == 'M_type') {
                        this.$store.dispatch({
                            type: 'SEARCH',
                            condition: {
                                M_type: this.serinput
                            }
                        })
                    }
                }else{
                    
                }
            },
            //            选中
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
//                if(val._id){
//                let id=val._id
                this.form = val
//                this.checkedID = id
                this.currentRow = val
//                }
            },
            //            添加页面
            addMoviePage() {
                this.form = {
                    "M_name": "",
                    "E_name": "",
                    "M_type": "",
                    "M_grade": "",
                    "A_name": '',
                    "want": "",
                    "area": "",
                    "W_long": "",
                    "S_time": "",
                    "det": "",
                    "box_office": "",
                    "M_cover": "",
                    "A_img": '',
                    '_id':''
                }
                this.dialogFormVisible = true;
                this.addbtn = true;
                this.updatebtn = false;
            },
            //            更新页面
            updatePage() {
                if(this.form._id){
                this.dialogFormVisible = true;
                this.addbtn = false;
                this.updatebtn = true;}
            },
            //            更新
            updatemovie() {
                this.dialogFormVisible = false;
                this.$store.dispatch({
                    type: 'UPDATEMOVIE',
                    item: this.form,
                })
                this.form=''
            },
            //            添加
            addmovie() {
                this.dialogFormVisible = false;
                this.fileList=[];
                this.actorfileList=[];
                this.$store.dispatch({
                    type: 'ADDMOVIE',
                    item: this.form
                })
            },
            //            翻页
            currentChange(page) {
                this.$store.dispatch({
                    type: 'PAGECHANGE',
                    page: page
                })
            },
            //            删除
            open(){
                if(this.form._id){
                    this.visible=false
                }else{
                    this.visible=true
                    this.$message({
                    type: 'warning',
                    message: '请选择数据'
                  })
                }
            },
            delmovue() {
                this.visible=false
                this.$store.dispatch({
                    type: 'DELMOVIE',
                    id: this.form._id
                })
                this.checkedID=''
               this.form = {
                    "M_name": "",
                    "E_name": "",
                    "M_type": "",
                    "M_grade": "",
                    "A_name": '',
                    "want": "",
                    "area": "",
                    "W_long": "",
                    "S_time": "",
                    "det": "",
                    "box_office": "",
                    "M_cover": "",
                    "A_img": '',
                   '_id':''
                }
            }
        },
        computed: {
            movie() {
                return this.$store.state.movie.movie
            },
            total() {
                return this.$store.state.movie.total
            }
        }
    }

</script>
<style>
    .input {
        width: 400px;
        margin-left: 10px;
    }

    .selsect {
        width: 120px;
    }

    .addinput {
        margin-top: 66px
    }
    .block{
        margin-left: 40%;
        margin-top: 20px
    }
    .addinput input {
        width: 200px;
        float: left
    }
    .text{
        width: 500px;
    }
    .upload-demo{
         width: 200px;
    }
    .upload{
        float: left;
        width: 30%;
        margin-left: 15%;
            
    }
    .imges{
         width: 400px;
    }
    .btnblock{
        clear: both;
        padding-top:30px;
        margin-left: 40%
    }
</style>
