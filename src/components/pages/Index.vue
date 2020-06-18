<template>
	<div>
		<Top></Top>
		<div class="scroll">
			<div class="scroll-left">
				<div class="category" @click="a2" style="cursor: pointer;">Fastener</div>
				<div class="category" @click="a3" style="cursor: pointer;">Fixing</div>
				<div class="category" @click="a1" style="cursor: pointer;">Hardware</div>
				<div class="category" @click="a4" style="cursor: pointer;">Tools</div>
				<div class="category" @click="a5" style="cursor: pointer;">Security</div>
				<div class="category" @click="a6" style="cursor: pointer;">Electric & Lights</div>
				<div class="category" @click="a7" style="cursor: pointer;">Auto</div>
				<div class="category" @click="a8" style="cursor: pointer;">Outdoor</div>
				<div class="category" @click="a9" style="cursor: pointer;">Construction</div>
			</div>
			<div  class="scroll-right">
				<el-carousel height="600px">
			      <el-carousel-item v-for="item in imagesbox" :key="item.id">
			        <img :src="item.idView" class="image">
			      </el-carousel-item>
			   </el-carousel>
		   </div>
		</div>
		<div class="catelist" id="box">
			<ul>
				<li v-for="(v,index) in this.categoryList"  @click="handAdd(v,index)" style="cursor: pointer;">
					<div class="block">
						<img
							style="width: 220px;height:220px;"
							v-bind:src="v.url"
							></img>
					</div>
					<h4  style="text-align: center;">{{v.category}}</h4>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Top from "../common/Top.vue"
	import Footer from "../common/Footer.vue"
	export default{
		name:"welcome",
		components:{
			Top,
			Footer,
			
		},
		created(){
			this.$store.commit('handleCategory',"");
			this.$store.commit('handleGoodsname',"");
			this.axios.get('/goods/gettengood',{
	    }).then(res=>{
	    		this.categoryList=res.data.data;
	    		var d={url:"https://shop518.oss-ap-southeast-1.aliyuncs.com/10001.jpg",category:"Brand Products",id:10001}		
	    		this.categoryList.push(d)
	    	});
		},
		data(){
			return {
				categoryList:[],
				imagesbox:[
					{id:0,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/0.jpg"},
					{id:1,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/1.jpg"},
					{id:2,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/2.jpg"},
					{id:3,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/3.jpg"},
					{id:4,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/4.jpg"},
					{id:5,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/5.jpg"},
					{id:6,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/6.jpg"},
					{id:7,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/7.jpg"},
					{id:8,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/8.jpg"},
					{id:9,idView:"https://shop518.oss-ap-southeast-1.aliyuncs.com/lunbo/9.jpg"}
				]
			}
		},
		methods: {
			handAdd(v,index){
				if(v.id=="1001"){
					this.a1();
				}
				if(v.id=="2001"){
					this.a2();
				}
				if(v.id=="3001"){
					this.a3();
				}
				if(v.id=="4001"){
					this.a4();
				}
				if(v.id=="5001"){
					this.a5();
				}
				if(v.id=="6001"){
					this.a6();
				}
				if(v.id=="7001"){
					this.a7();
				}
				if(v.id=="8001"){
					this.a8();
				}
				if(v.id=="9001"){
					this.a9();
				}
				if(v.id=="10001"){
					this.a1();
				}
			
			},
			a1(){
				this.$store.commit('handleCategory',"10");
				this.$router.push('/Goods');
			},
			a2(){
				this.$store.commit('handleCategory',"20");
				this.$router.push('/Goods');
			},
			a3(){
				this.$store.commit('handleCategory',"30");
				this.$router.push('/Goods');
			},
			a4(){
				this.$store.commit('handleCategory',"40");
				this.$router.push('/Goods');
			},
			a5(){
				this.$store.commit('handleCategory',"50");
				this.$router.push('/Goods');
			},
			a6(){
				this.$store.commit('handleCategory',"60");
				this.$router.push('/Goods');
			},
			a7(){
				this.$store.commit('handleCategory',"70");
				this.$router.push('/Goods');
			},
			a8(){
				this.$store.commit('handleCategory',"80");
				this.$router.push('/Goods');
			},
			a9(){
				this.$store.commit('handleCategory',"90");
				this.$router.push('/Goods');
			},
			a10(){
				this.$store.commit('handleCategory',"100");
				this.$router.push('/Goods');
			},
			
		}
		
	}
</script>

<style scoped>
.scroll{
	min-width: 1300px;
	width:80%;
	height:600px;
	margin: 0 auto;
}
.image{
	height:600px;
}
.scroll-right{
	height:600px;
	width:1270px;
}
.scroll-left{
	height:600px;
	width:200px;
	/*background-color: red;*/
	float:left;
}
.category{
	height:65px;
	line-height:58px;
	position: relative;
	border:1px solid white;
	font-size:20px;
}
.category p{
	left:30px;
}
.category:hover{
	border:1px solid black;
}
.catelist{
	position: relative;
	top:20px;
	min-width: 1300px;
	width:80%;
	height:150px;
	margin: 0 auto;
}
#box ul{
	display: flex;
	flex-wrap: wrap;
}
#box li{
	width:220px;
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

.pagination{
	width: 1239px;	
	height:100px;
	line-height: 100px;
	margin: 0 auto;
	position: relative;
	top:50px;	
}
</style>