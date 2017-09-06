<template>
 <div>
  <div style="margin: 15px;">
  <el-button type="primary" size="small" icon="search">增加</el-button>
  <el-button type="primary" size="small" icon="search">删除</el-button>
  <el-button type="primary" size="small" icon="search">修改</el-button>
  <el-input placeholder="请输入内容" class='input' v-model="input5">
    <el-select v-model="select" slot="prepend" class='selsect' placeholder="请选择">
      <el-option label="电影名" value="1"></el-option>
      <el-option label="电影类型" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="search"></el-button>
  </el-input>
</div>
   <el-table
    ref="singleTable"
    :data="tableData"
    border
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
     show-overflow-tooltip
      property="M_name"
      label="电影名"
      width="120">
    </el-table-column>
    <el-table-column
     show-overflow-tooltip
      property="E_name"
      label="电影英文名"
      width="120">
    </el-table-column>
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
    :total="10">
  </el-pagination>
</div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    "M_name": "建军大业",
                    "E_name": "The Founding of an Army",
                    "M_type": "剧情,历史",
                    "M_grade": "9.1",
                    "A_name": [
                        "刘伟强,刘烨,朱亚文,黄志忠,王景春"
                    ],
                    "want": "1111",
                    "area": "中国大陆",
                    "year": "",
                    "W_long": "108分钟",
                    "S_time": "2017-07-27",
                    "det": "1927年，北伐战争刚取得重大成果之际，国民党",
                    "box_office": "3.62亿",
                    "M_cover": "0e3a853a93d342f5d071f5e0867cbfb7518640.jpg",
                    "A_img": ["6ac2e113cd520c60ee3ed8b16c12aefa322837.jpg,da9eec5fe65da60c3fe1613b0aa12003279014.jpg,793b40fcd7e8df51240177510bf69f7f379322.jpg,c34cddea7e266e4919bed33892aa08f8211279.jpg,644c95c3b1028532b14c2394bb29c41c374872.jpg"]
                },{
                    "M_name": "建军大业",
                    "E_name": "The Founding of an Army",
                    "M_type": "剧情,历史",
                    "M_grade": "9.1",
                    "A_name": [
                        "刘伟强,刘烨,朱亚文,黄志忠,王景春"
                    ],
                    "want": "1111",
                    "area": "中国大陆",
                    "year": "",
                    "W_long": "108分钟",
                    "S_time": "2017-07-27",
                    "det": "1927年，北伐战争刚取得重大成果之际，国民党",
                    "box_office": "3.62亿",
                    "M_cover": "0e3a853a93d342f5d071f5e0867cbfb7518640.jpg",
                    "A_img": ["6ac2e113cd520c60ee3ed8b16c12aefa322837.jpg,da9eec5fe65da60c3fe1613b0aa12003279014.jpg,793b40fcd7e8df51240177510bf69f7f379322.jpg,c34cddea7e266e4919bed33892aa08f8211279.jpg,644c95c3b1028532b14c2394bb29c41c374872.jpg"]
                },{
                    "M_name": "建军大业",
                    "E_name": "The Founding of an Army",
                    "M_type": "剧情,历史",
                    "M_grade": "9.1",
                    "A_name": [
                        "刘伟强,刘烨,朱亚文,黄志忠,王景春"
                    ],
                    "want": "1111",
                    "area": "中国大陆",
                    "year": "",
                    "W_long": "108分钟",
                    "S_time": "2017-07-27",
                    "det": "1927年，北伐战争刚取得重大成果之际，国民党",
                    "box_office": "3.62亿",
                    "M_cover": "0e3a853a93d342f5d071f5e0867cbfb7518640.jpg",
                    "A_img": ["6ac2e113cd520c60ee3ed8b16c12aefa322837.jpg,da9eec5fe65da60c3fe1613b0aa12003279014.jpg,793b40fcd7e8df51240177510bf69f7f379322.jpg,c34cddea7e266e4919bed33892aa08f8211279.jpg,644c95c3b1028532b14c2394bb29c41c374872.jpg"]
                }],
                currentRow: null
            }
        },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            }
        },
        computed: {

        }
    }

</script>
<style>
    .input {
        width: 400px;
        margin-left: 10px;
    }

    .selsect {
        width: 100px;
    }

</style>
