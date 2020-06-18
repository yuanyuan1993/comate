<template>
	<div>
		<Top @event1="change($event)"></Top>
		<div class="category_list">
			<div class="yetou">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
				  <el-breadcrumb-item>Search</el-breadcrumb-item>
				  <el-breadcrumb-item>{{typecate}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div  class="categorylist"  id="categorybox">
				<ul  style="margin: 0px; padding:0px;">
				  <li @click="a0" style="cursor: pointer;">Type</li>
				  <li @click="a2" style="cursor: pointer;">Fastener</li>
				  <li @click="a3" style="cursor: pointer;">Fixing</li>
				  <li @click="a1" style="cursor: pointer;">Hardware</li>
				  <li @click="a4" style="cursor: pointer;">Tools</li>
				  <li @click="a5" style="cursor: pointer;">Security</li>
				  <li @click="a6" style="cursor: pointer;">Electric & Lights</li>
				  <li @click="a7" style="cursor: pointer;">Auto</li>
				  <li @click="a8" style="cursor: pointer;">Outdoor</li>
				  <li @click="a9" style="cursor: pointer;">Construction</li>
				</ul>	
			</div>
			
		</div>
		<div style="min-width: 1300px;width:80%; margin: 0 auto;"><el-divider></el-divider></div>
		<div class="goods"  id="box">
			<ul>
				<li v-for="(v,index) in this.goodsList"  @click="handAdd(v,index)" style="cursor: pointer;">
					<div class="block">
						<img
							style="width: 100px;height:100px;"
							v-bind:src="v.url"
							></img>
					</div>
					<p  style="text-align: center; word-wrap:break-word">{{v.goodsname}}</p>
				</li>
			</ul>
		</div>
		
		<div  class="pagination">
			<el-pagination
			  style="text-align: center;"
			  @current-change="handleCurrentChange"
			  background
			  layout="prev, pager, next"
			  :page-size="pageSize"
			  :total="total">
			</el-pagination>
		</div>
		
		
		<!--商品窗口-->
		<el-dialog
			  title="Commodity information"
			  :visible.sync="centerDialogVisible"
			  width="900px"
			  center>
			  <div  class="digimg">
			  <el-col :span="10"><div class="grid-content bg-purple">
			  	<img
					style="width: 300px;"
					v-bind:src="goods.url"
					></img>
			  		
			  	
			  </div></el-col>
			  <el-col :span="14"><div class="bg-purple-light">
			  	
			  	<div class="dig-title">{{ goods.goodsname }}</div>
			  	
			  	<div class="dig-describe" style="margin-top:10px">{{goods.describe}}</div>
			  	<div style="margin-top: 20px">
			  		<el-radio-group v-model="radioValue"  @change="changeRadio" >
			         	<div v-for="(item,index) in codelist">
			              <el-radio :label="item.code" border  style="float:left">{{item.size}}</el-radio>
			            </div>
			        </el-radio-group>
				</div>
				<div style="margin-top: 40px">
			  		<p>UNIT:{{unit}}</p>
			  		<p>price:${{price}}</p>
			  		<p>SKU:{{code}}</p>
				</div>
			  	<el-input-number v-model="num"  :min="1"  style="margin-top: 20px"></el-input-number>
			  	
			  	
			  </div></el-col>
								
			  </div>
			     <!--<div class="dialog-footer">-->
				    <el-button type="primary" @click="addCart"  style="width:50%;position: relative;left:25%;top:20px;">Add to cart</el-button>
			  	<!--</div>-->
			  
		</el-dialog>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	</div>
</template>

<script>
	import Top from "../common/Top.vue"
	export default{
		name:"welcome",
		components:{
			Top,
		},
		data(){
			return {
				goodsList:[],
				total:0,
				currentPage:'',
				pageSize:56,
				goodsname:'',
				category:'',
				goods:{
					goodsname:'',
					url:'',
					describe:'',
				},
				currentid:'',
				centerDialogVisible:false,//商品窗口
				codelist:[],
				radioValue:'',
				unit:'',
				price:'',
				code:'',
				num:1,
			}
		},
		computed: {
		 	typecate() { 
		 		if(this.$store.getters.category==""){
			 		return   "ALL";
			 	}	
		 		if(this.$store.getters.category=="10"){
			 		return   "Hardware";
			 	}
		 		if(this.$store.getters.category=="20"){
			 		return   "Fastener";
			 	}
		 		if(this.$store.getters.category=="30"){
			 		return   "Fixing";
			 	}
		 		if(this.$store.getters.category=="40"){
			 		return   "Tools";
			 	}
		 		if(this.$store.getters.category=="50"){
			 		return   "Security";
			 	}
		 		if(this.$store.getters.category=="60"){
			 		return   "Electric & Lights";
			 	}
		 		if(this.$store.getters.category=="70"){
			 		return   "Auto";
			 	}
		 		if(this.$store.getters.category=="80"){
			 		return   "Outdoor";
			 	}
		 		if(this.$store.getters.category=="90"){
			 		return   "Construction";
			 	}
		 	}
		 },
		created(){
			this.getGoods();
		},
		methods: {
			addCart(){
				if(this.radioValue==""){
		      		return;
		      	}
		      	
		      	let  token=localStorage.getItem('token');
		      	this.axios.post('/cart/addcart?token='+token,{
					"id": this.currentid,
					"code":this.radioValue,
					"number":this.num,
				}).then(res => {
					if(res.data.code=="0"){		
						this.$message.success('Add Cart Success!');
					}
					else if(res.data.code=="10001"){
							this.$message.error('Please login to our system!');
							localStorage.removeItem('token');
							localStorage.removeItem('name');
							
					}
				});	
			},
			changeRadio(value){
	        	var c=this.codelist;
	        	for(var i=0,l=c.length;i<l;i++){	　　
					  if(c[i]["code"]==value){
					  	this.unit=c[i]["unit"];
					  	this.price=c[i]["price"];
					  	this.code=c[i]["code"];
					  }
				}
	        },
			a0(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"");
				this.getGoods();
			},
			a1(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"10");
				this.getGoods();
			},
			a2(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"20");
				this.getGoods();
			},
			a3(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"30");
				this.getGoods();
			},
			a4(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"40");
				this.getGoods();
			},
			a5(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"50");
				this.getGoods();
			},
			a6(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"60");
				this.getGoods();
			},
			a7(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"70");
				this.getGoods();
			},
			a8(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"80");
				this.getGoods();
			},
			a9(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"90");
				this.getGoods();
			},
			a10(){
				this.currentPage=1;
				this.$store.commit('handleCategory',"100");
				this.getGoods();
			},
			change(data) {
	            this.getGoods();
	       },
			handleCurrentChange(val){
				this.currentPage=val;
          		this.getGoods();
			},
			handAdd(v,index){
				this.num=1;
				this.centerDialogVisible=true;
		    	this.currentid=v.id;
				this.getGoodsbyid();
				this.getGoodsDetailbyid();
				this.radioValue="";
				this.price="";
				this.unit="";
				this.code="";
			},
		    getGoods(){
		    	this.goodsname=this.$store.getters.goodsname;
		    	this.category=this.$store.getters.category;
		    	this.axios.get('/goods/getgoods',{
		    	    params:{
						"pageSize":this.pageSize,
						"currentPage":this.currentPage,
						'goodsname':this.goodsname,
						'category':this.category,
					}
		    	}).then(res=>{
		    		this.goodsList=res.data.data.goodsList;
		    		this.total=res.data.data.allCount;
		    	});
	    	},
	    	getGoodsbyid(){
		    	this.axios.get('/goods/getgoodsbyid',{
		    	    params:{
						"id":this.currentid,
						}
		    	}).then(res=>{
		    		this.goods.goodsname=res.data.data.goodsname;
		    		this.goods.describe=res.data.data.description;
		    		this.goods.url=res.data.data.url;
		    	});
		    },
		    getGoodsDetailbyid(){
		    	this.axios.get('/goods/getdetailbyid',{
		    	    params:{
						"id":this.currentid,
						}
		    	}).then(res=>{
		    		this.codelist=res.data.data;
		    			
		    	});
		    },
		}
	}
	
	
</script>

<style scoped>
	.category_list{
		min-width: 1300px;
		width:80%;
		height:90px;
		margin: 0 auto;
		/*//background-color: red;*/
	}
	.yetou{
		
		position: relative;
		top:20px;
	}
	.el-breadcrumb{
		font-size: 20px;
	}
	.categorylist{
		position: relative;
		top:40px;
		font-size:15px;
		float:left;
	}
	
	#categorybox ul{
		display: flex;
		flex-wrap: wrap;
		float: left;
	}
	#categorybox li{
		/*//min-width:100px;*/
		padding:10px;
		list-style: none;
	}
	
	
	.goods{
		position: relative;
		min-width: 1300px;
		width:80%;
		margin: 0 auto;
		/*background-color: red;*/
	}
	#box ul{
		display: flex;
		flex-wrap: wrap;
	}
	#box li{
		width:120px;
		padding: 8px;
		list-style: none;
		margin-right: 30px;
		margin-bottom: 20px;
		font-size:9px;
		border: 1px solid #eee;
	}
	#box li:hover{
		border-color:#CC99FF;
	}
	.block{
		text-align: center;
	}
	
	
	
	.bg-purple-light{
		min-height:400px;
		font-family: moderat,sans-serif;
	}
	.dig-title{
	   line-height: 40px;
	   font-size:25px;
	   
	}
	.el-radio-group{
		width:100%;
		   
	}
	.el-radio{
		margin-left:10px;
		margin-top:10px;
	}
	.dialog-footer{
		text-align: center;
		position: relative;
		top:20px;
	}
</style>