<template>
   <div>
    <el-row>
      <el-col :span="24"><div class="maoyantop"><img src="../../img/55fbe8a6d099d_02.gif.png" alt=""></div></el-col>
          <el-col :span="4">
             <div  class='nav'>
              <el-menu default-active="3" class="el-menu-vertical-demo" theme="dark">
              <router-link to='/movie'><el-menu-item class="el-icon-caret-right" index="3"> 电影管理</el-menu-item></router-link>
              <router-link to='/cinema' ><el-menu-item class="el-icon-caret-right" index="4"> 影院管理</el-menu-item></router-link> 
              <router-link to='/screens'><el-menu-item class="el-icon-caret-right" index="5"> 影厅信息</el-menu-item></router-link>
              <router-link to='/match'><el-menu-item class="el-icon-caret-right" index="6"> 排片信息</el-menu-item></router-link>
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
    
    .maoyantop> img{
       width: 100%;
        height:150px;
    }
    .maoyantop{
        overflow: hidden;
          height:150px;
    }
    a{
        text-decoration: none;
    }
    a li{
        
        width: 100%;
        display: inline-block
    }
    .nav{
        min-height:750px;
        background-color: #324054;
    }
    .main{
        min-height:750px;
        padding: 20px;
    }
</style>