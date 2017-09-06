<template>
   <div>
    <el-row>
      <el-col :span="24"><div class="top"><img src="../../img/55fbe8a6d099d_02.gif.png" alt=""></div></el-col>
          <el-col :span="4">
             <div  class='nav'>
              <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark">
              <router-link to='/administrator'><el-menu-item index="1">管理员账户</el-menu-item></router-link>
              <router-link to='/user'><el-menu-item index="2">用户管理</el-menu-item></router-link>
              <router-link to='/movie'><el-menu-item index="3">电影管理</el-menu-item></router-link>
              <router-link to='/cinema'><el-menu-item index="4">影院管理</el-menu-item></router-link> 
              <router-link to='/screens'><el-menu-item index="5">影厅信息</el-menu-item></router-link>
              <router-link to='/match'><el-menu-item index="6">排片信息</el-menu-item></router-link>
            </el-menu>
        </div>
      </el-col>
      <el-col class='main' :span="20"><router-view>123</router-view><div class="top"></div></el-col>
    </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              
            }
        },
        methods: {
          
        },
        computed: {
        
        }
    }

</script>
<style>
    .top{
        height:150px;
    }
    .top > img{
       width: 100%;
        height:150px;
    }
    a{
        text-decoration: none
    }
    .nav{
        min-height:700px;
        background-color: #324054
    }
    .main{
        min-height:700px;
    }
</style>