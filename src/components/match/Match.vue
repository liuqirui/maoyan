<template>
	<div>
		<div id="match_div">
			<el-select class="match_select" id="match_movie_select" v-model="match_movie_name" placeholder="请选择电影" @change="movie_selectbtn">
				<el-option
				v-for="item in match.match_movies"
				:key="item._id"
				:label="item.M_name"
				:value="item._id">
				</el-option>
			</el-select>
			<el-select class="match_select" id="match_cinema_select" v-model="match_cinema_name" placeholder="请选择影院" :disabled="match_cinema_disabled" @change="cinema_selectbtn">
				<el-option
				v-for="item in match.macth_cinemas"
				:key="item._id"
				:label="item.C_name"
				:value="item._id">
				</el-option>
			</el-select>
			<el-select class="match_select" id="match_moviehall_select" v-model="match_moviehall_name" placeholder="请选择影厅" :disabled="match_moviehall_disabled" @change="moviehall_selectbtn">
				<el-option
				v-for="item in match.macth_moviehall"
				:key="item._id"
				:label="item.fname"
				:value="item._id">
				</el-option>
			</el-select>
			<el-time-picker class="match_select" is-range v-model="match_movie_time" placeholder="选择时间范围" :disabled="match_movie_time_disabled">
			</el-time-picker>
			<el-input id="match_price_input" class="match_select" v-model="match_movie_price" placeholder="请输入价格" :disabled="match_price_disabled" @change="price_selectbtn"></el-input>
			<el-date-picker
		  		class="match_select"
			  v-model="match_date"
			  type="date"
			  placeholder="选择日期"
			  :picker-options="pickerOptions0" :disabled="match_date_disabled" @change="date_selectbtn">
			</el-date-picker>
			<el-button class="match_select" type="primary" @click="match_matchingBtn" :disabled="match_matching_disabled"><i class="el-icon-plus"></i>增加排片</el-button>
		</div>
		<el-table
		  :data="match.match_movieData"
		  border
		  style="width: 100%">
		  <el-table-column
			prop="M_name"
			label="电影名"
			width="180">
		  </el-table-column>
		  <el-table-column
			prop="M_type"
			label="电影类型"
			width="180">
		  </el-table-column>
		  <el-table-column
			prop="W_long"
			label="电影时长"
			width="180">
		  </el-table-column>
		  <el-table-column
			prop="box_office"
			label="电影票房"
			width="180">
		  </el-table-column>
		  <el-table-column
			prop="S_time"
			label="上映时间"
			width="">
		  </el-table-column>
		  <el-table-column
			  fixed="right"
			  label="操作"
			  width="100">
			  <template scope="scope">
				<el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看影院</el-button>
			  </template>
			</el-table-column>
		</el-table>
		<el-pagination
			:page-size="5"
			@current-change="handleCurrentChange"
			layout="prev, pager, next"
			:maxpage="match.match_maxpage"
			:total="match.match_total">
		</el-pagination>
		
		<div v-if="state">
			
			<el-table
			  :data="match.match_matchingData"
			  border
			  style="width: 100%">
			  <el-table-column
				prop="m_name"
				label="电影名"
				width="160">
			  </el-table-column>
			  <el-table-column
				prop="c_name"
				label="电影院"
				width="160">
			  </el-table-column>
			  <el-table-column
				prop="f_name"
				label="影厅"
				width="160">
			  </el-table-column>
			  <el-table-column
				prop="m_price"
				label="票价"
				width="160">
			  </el-table-column>
			  <el-table-column
				prop="datetime"
				label="日期"
				width="180">
			  </el-table-column>
			  <el-table-column
				prop="detailedtimes"
				label="场次"
				width="180">
			  </el-table-column>
			  <el-table-column
				  fixed="right"
				  label="操作"
				  width="130">
				  <template scope="scope">
			<el-popover
			  ref="popover4"
			  placement="right"
			  trigger="click">
			  <div v-for="(item,index) in match_fdata"  class="row">
			  		<div v-for="(val,indexs) in item">
			  			<div v-if="val.flay" class="iscol"></div>
			  			<div v-else class="col"></div>
			  		</div>
			  </div>
			</el-popover>
					<el-button @click="check(scope.$index, scope.row)" v-popover:popover4 type="text" size="small">查看座位</el-button>
				  </template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import {mapState} from "vuex"
    export default {
		beforeMount(){
			this.$store.dispatch('ASYNC_MOVIES_LIST')
			this.$store.dispatch('ASYNC_CINEMA_LIST')
			this.$store.dispatch('ASYNC_Match_LIST',{
				page:1,
				rows:5
			})
		},
        data() {
            return {
				state:false,
				match_cinema_disabled:true,
				match_moviehall_disabled:true,
				match_movie_time_disabled:true,
				match_price_disabled:true,
				match_date_disabled:true,
				match_matching_disabled:true,
				match_movieData:[],
              	match_movies:[],
				match_movie_name:"",
				match_cinema_name:"",
				match_moviehall_name:"",
				match_movie_time:[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
				match_movie_price:"",
				pickerOptions0: {
				  disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				  }
				},
				match_date:"",
				match_fdata:[]
            }
        },
        methods: {
			//分割年月日
			yeartime(date){
				let year = date.getFullYear();
				let month = date.getMonth();
				let dates = date.getDate();
				let str = "";
				month += 1;
				if(month < 10){
					month = "0"+month
				}
				if(dates < 10){
					dates = "0" +dates
				}
				str = `${year}-${month}-${dates}`
				return str
			},
			//分割时分秒
			datetime(date){
				let hour = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();
				let str = "";
				if(hour < 10){
				   hour = "0"+hour
				}
				if(minutes < 10){
					minutes = "0"+month
				}
				if(seconds < 10){
					seconds = "0" +seconds
				}
				str = `${hour}:${minutes}:${seconds}`
				return str
			},
			match_matchingBtn(){
				let detailedtime = [];
				let datetime = this.yeartime(this.match_date);
				for(let i = 0;i < this.match_movie_time.length;i++){
					let ctime = this.datetime(this.match_movie_time[i])
					detailedtime.push(ctime)
				}
				let detailedtimes = detailedtime.join("-")
				let m_name = "";
				for(let obj of this.match.match_movies){
					if(this.match_movie_name == obj._id){
						m_name = obj.M_name
					}
				}
				let c_name = "";
				for(let obj of this.match.macth_cinemas){
					if(this.match_cinema_name == obj._id){
						c_name = obj.C_name
					}
				}
				let f_name = "";
				let m_fdata = "";
				for(let obj of this.match.macth_moviehall){
					if(this.match_moviehall_name == obj._id){
						f_name = obj.fname
						m_fdata = obj.fdata
					}
				}
				let match_matchingMovie = {
					//电影id
					m_id:this.match_movie_name,
					m_name,
					//影院id
					c_id:this.match_cinema_name,
					c_name,
					//影院的影厅id
					f_id:this.match_moviehall_name,
					f_name,
					//日期
					datetime,
					//场次时间
					detailedtimes,
					m_fdata:JSON.stringify(m_fdata),
					//票价
					m_price:this.match_movie_price

				}
				this.$store.dispatch('ASYNC_MATCHING_LIST',match_matchingMovie)
				this.match_cinema_disabled = true
				this.match_moviehall_disabled = true
				this.match_movie_time_disabled = true
				this.match_price_disabled = true
				this.match_date_disabled = true
				this.match_matching_disabled = true
				this.match_movie_name = ""
				this.match_cinema_name = ""
				this.match_moviehall_name = ""
				this.match_movie_price = ""
				this.match_date = ""
			},
			handleCurrentChange(pager){
				this.$store.dispatch('ASYNC_Match_LIST',{
					page:pager,
					rows:5
				})
			},
			movie_selectbtn(){
				if(this.match_movie_name != ""){
				   	this.match_cinema_disabled = false
				}
			},
			cinema_selectbtn(){
				this.$store.dispatch('ASYNC_MOVIEHALL_LIST',this.match_cinema_name)
				if(this.match_cinema_name != ""){
				   	this.match_moviehall_disabled = false
				}
			},
			moviehall_selectbtn(){
				if(this.match_moviehall_name != ""){
				   	this.match_movie_time_disabled = false
					this.match_price_disabled = false
				}
			},
			price_selectbtn(){
				this.match_date_disabled = false
			},
			date_selectbtn(){
				this.match_matching_disabled = false
			},
			handleClick(index,row){
				this.state = true
				this.$store.dispatch('ASYNC_FINDMATCHING_LIST',row._id)
			},
			check(index,row){
				this.match_fdata = row.m_fdata
				console.log(this.match_fdata)
			}
        },
        computed:mapState([
			"match"
		])
    }

</script>
<style scoped>
	#match_div{
		margin: 15px;
	}
	.match_select{
		margin: 0 15px 15px 0;
	}
	#match_price_input{
		width: 217px;
	}
	.row{
		display: flex;
	}
	.col{
		width: 20px;
		height: 20px;
		background: #666;
		margin: 8px;
	}
	.iscol{
		width: 20px;
		height: 20px;
		background: red;
		margin: 8px;
	}
</style>