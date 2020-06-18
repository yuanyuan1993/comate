<template>
	<div>
		<div class="top">
			<div class="logo">
				<img src="../../assets/logo2.png"  @click="back" class="topimg">
			</div>
			<div class="search">
				<el-input placeholder="what are you looking for" v-model="input3" class="searchClass" @keyup.enter.native="search"> 
			     	<el-button slot="append" icon="el-icon-search"  @click="search"  ></el-button>
			   </el-input>
			</div>
			<div class="top-abouts">
				<div class="ms_about_img">
					<i class="el-icon-s-cooperation"  style="font-size:25px;"></i>
				</div>
				<el-button type="text"  class="ms_about_text" @click="about">Abouts</el-button>
				</div>
			<div class="top-order">
				<div class="ms_order_img">
						<i class="el-icon-s-order"  style="font-size:25px;"></i>
				</div>
				<el-button type="text"  class="ms_order_text" @click="history">orders</el-button>
			</div>
			<div class="top-cart">
				<div class="ms_cart_img">
						<i class="el-icon-shopping-cart-2"  style="font-size:25px;"></i>
					</div>
				<el-button type="text"  class="ms_cart_text" @click="cart">Cart</el-button>
			</div>
			<div class="top-login-text" v-if="haveToken">
				<el-button type="text" class="ms_sign"  @click="loginFrom">Login</el-button>
				<el-button type="text"  class="ms_register" @click="registerFrom">Join</el-button>
			</div>
			<div class="top-login-icon" v-if="haveToken">
				<i class="el-icon-s-custom"  style=" font-size:50px; position: relative;top:10px"></i>
			</div>
			
			<div class="top-hi-user" v-if="!haveToken">
				<div class="top-select">
					<el-dropdown>
					  <span class="el-dropdown-link top-select-text">
					    Hi,{{this.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item @click.native="account">Account</el-dropdown-item>
					    <el-dropdown-item @click.native="changepwd" >Change password</el-dropdown-item>
					    <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			
			
		</div>
		
		
		
		
		<!--登录窗口-->
		<el-dialog width="25%" title="LOGIN" :visible.sync="modelShow">
	        <el-form ref="form" :model="form" size="small">
	            <el-row>
	                <el-form-item>
	                    <el-input class="search-input" v-model="form.email" placeholder="Email"/>
	                </el-form-item>
	                <el-form-item v-if="!this.findpd">
	                    <el-input type="password" class="search-input" v-model="form.password" placeholder="password"/>
	                </el-form-item>
	            </el-row>
	        </el-form>
	        <div  class="footer-login" v-if="!this.findpd">
	            <el-button type="primary"  class="login-btn"  @click="login">LOGIN</el-button>
	        </div>
	        <div  class="footer-login"  v-if="this.findpd">
	            <el-button type="primary"  class="login-btn"  @click="retrieve">Retrieve password</el-button>
	        </div>
	        
	        <div class="util" v-if="!this.findpd">
	        	<div  class="forget">
	        		<el-button type="text" @click="findpw" >forget password</el-button>
	        	</div>
	        	
	        	<div  class="util-register">
	        		<el-button type="text"   @click='openregisterFrom'>register</el-button>
	        	</div>
	        </div>
        </el-dialog>
        
        
        
        <!--修改密码-->
		<el-dialog title="Change Password" :visible.sync="dialogVisible" :close-on-click-modal="false">
			<el-form :model="changeForm" label-width="150px"  ref="changeForm">
				<el-form-item label="Old Password">
					<el-input v-model="changeForm.oldpwd" auto-complete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="New Password">
					<el-input v-model="changeForm.newpwd" auto-complete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="Confirm Password">
					<el-input v-model="changeForm.newpwdtwo" auto-complete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click.native="changeSubmit">Submit</el-button>
			</div>
		</el-dialog>
		
		
		<el-dialog width="35%" title="REGISTER"  :visible.sync="registerShow" 
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    	>
		        <el-form ref="registerform"   :rules="rules"  :model="registerForm"  size="small"  label-width="150px"  label-position = "right">
		            <el-row>
		                <el-form-item label="email" prop="email">
		                    <el-input class="search-input" v-model="registerForm.email"  ><el-button type="text" slot="suffix" @click="sendcode" :disabled="sendbtn">SEND</el-button></el-input>
		                </el-form-item>
		                <el-form-item label="code" prop="code">
		                    <el-input class="search-input" v-model="registerForm.code"  placeholder="From  Eamil"/>
		                </el-form-item>
		                <el-form-item label="password" prop="password">
		                    <el-input class="search-input" v-model="registerForm.password"  type="password" />
		                </el-form-item>
		                <el-form-item label="repeat password" prop="repassword">
		                    <el-input class="search-input" v-model="repassword"  type="password"  />
		                </el-form-item>
		                <el-form-item label="Campany Name" prop="company">
		                    <el-input class="search-input" v-model="registerForm.company"/>
		                </el-form-item>
		                <el-form-item label="Contact Name" prop="name">
		                    <el-input class="search-input" v-model="registerForm.name"/>
		                </el-form-item>
		                <el-form-item label="Phone" prop="phone">
		                    <el-phone-number-input v-model="phone"   ></el-phone-number-input>
		                </el-form-item>
		                <el-form-item label="Country"  prop="country">
		                    <el-input class="search-input" v-model="registerForm.country"/>
		                </el-form-item>
		                <el-form-item label="City" prop="city">
		                    <el-input class="search-input" v-model="registerForm.city"/>
		                </el-form-item>
		                <el-form-item label="Address" prop="address">
		                    <el-input class="search-input" v-model="registerForm.address"/>
		                </el-form-item>
		                <el-form-item label="Destination Port" prop="dport">
		                    <el-input class="search-input" v-model="registerForm.dport"/>
		                </el-form-item>
		                <el-form-item label="VAT/TAX Number" prop="shuihao" >
		                    <el-input class="search-input" v-model="registerForm.shuihao"/>
		                </el-form-item>
		            </el-row>
		        </el-form>
		        <div  class="footer-login-c">
		            <el-button type="primary"  class="login-register"   @click="register"  style="width:100%;">register</el-button>
		        </div>
		        
		        <div class="util">	
		        	<div  class="util-register">
		        		<el-button type="text"   @click='openloginFrom'>login</el-button>
		        	</div>
		        </div>
		    </el-dialog>
	</div>
</template>

<script>
	import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator} from 'el-phone-number-input'

	export default {
		components: {
	      ElPhoneNumberInput
	  	},
	  	data(){
	  		return{
	  			rules: {
			          email: [
			            { required: true, trigger: 'blur' },
			          ],
			          code: [
			            { required: true,trigger: 'blur' },
			          ],
			          password: [
			            { required: true,trigger: 'blur' },
			          ],
			          repassword: [
			            { required: true,trigger: 'blur' ,message: 'Please re-enter the password',},
			          ],
			          company: [
			            { required: true,trigger: 'blur' ,message: 'Company name  is required',},
			          ],
			          name: [
			            { required: true,trigger: 'blur' },
			          ],
			          country: [
			            { required: true,trigger: 'blur' },
			          ],
			          city: [
			            { required: true,trigger: 'blur' },
			          ],
			          address: [
			            { required: true,trigger: 'blur' },
			          ],
			          dport: [
			            { required: true,trigger: 'blur' ,message: 'Destination Port is required',},
			          ],
			          shuihao: [
			            { required: true,trigger: 'blur',message: 'VAT/TAX Number is required', },
			          ]
			    },
	  			input3:"",
	  			modelShow:false,
	  			form:{
	  				email:"",
	  				password:'',
	  			},
	  			name:'',
	  			findpd:true,
	  			haveToken:true,
	  			changeForm:{
		          	oldpwd:'',
		            newpwd:'',
		            newpwdtwo:'',
		        },
		        dialogVisible:false,
		        registerForm:{
		          	email:'',
		          	code:'',
		          	password:'',
		          	company:'',
		          	name:'',
		          	co:'',
		          	country:'',
		          	city:'',
		          	address:'',
		          	dport:'',
		          	shuihao:'',
		        },
		        repassword:'',
		        phone: {
			         callingCode: '',
			         phoneNumber: ''
			    },
			    registerShow:false,
			    sendbtn:true,
	  		}
	  	},
	  	created(){
	  		this.input3=this.$store.getters.goodsname;
	  		if(localStorage.getItem('name')==null){
		  		this.haveToken=true;
		  	}else{
		  		this.name=localStorage.getItem('name');
		  		this.haveToken=false;
		  	}
	  	},
	  	methods: {
	  		openloginFrom(){
	  			this.registerShow=false;
	  			this.modelShow=true;
	  			this.findpd=false;
	  		},
	  		register(){
		  		if(this.registerForm.password!=this.repassword){
		  			this.$message.error('Please enter the same password!');
		  			return;
		  		}
		  		if(this.registerForm.email==""||this.registerForm.code==""||this.registerForm.password==""||this.repassword==""){
		  			this.$message.error('Form parameters cannot be empty!');
		  			return ;
		  		}
		  		this.axios.post('/customer/register',{
				  	//参数
					"email": this.registerForm.email,
					"code":this.registerForm.code,
		          	"password":this.registerForm.password,
		          	"companyname":this.registerForm.company,
		          	"name":this.registerForm.name,
		          	"callingCode":this.phone.callingCode,
		          	"phone":this.phone.phoneNumber,
		          	"country":this.registerForm.country,
		          	"city":this.registerForm.city,
		          	"address":this.registerForm.address,
		          	"dport":this.registerForm.dport,
		          	"shuihao":this.registerForm.shuihao
				}).then(res => {
					//请求成功后的处理函数
					if(res.data.code=="0"){
						this.$message.success("register  success!");
						this.registerShow=false;
					}else{
						this.$message.error(res.data.msg);
					}
					
					
				}).catch(err => {                 //请求失败后的处理函数   
					console.log(err)
				})
		  	},
	  		sendcode(){
	  			const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		  		if(mailReg.test(this.registerForm.email)){
		  			
		  		}else{
		  			this.$message.error('Incorrect mailbox format!');
		  			return;
		  		}
		  		this.sendbtn=true;
		  		this.axios.post('/customer/getcode',{
					"email": this.registerForm.email,
				}).then(res => {
					//请求成功后的处理函数
					if(res.data.code=="0"){
						this.sendbtn=false;
						this.$message.success("Send  success!")
					}else{
						this.sendbtn=false;
						this.$message.error(res.data.msg);
					}
				}).catch(err => {                 //请求失败后的处理函数   
					console.log(err)
				})
	  		},
	  		changepwd(){
	  			this.dialogVisible=true;	
	  		},
	  		changeSubmit(){
	  			if(this.changeForm.oldpwd==''||this.changeForm.newpwd==''||this.changeForm.newpwdtwo==''){
	        		this.$message({
						message: 'Form cannot be empty!',
						type: 'error'
					});
					return;
	        	}
	        	if(this.changeForm.newpwd!=this.changeForm.newpwdtwo){
	        		this.$message({
						message: 'Two passwords are inconsistent!',
						type: 'error'
					});
					return;
	        	}
	        	let  token=localStorage.getItem('token');
	        	this.axios.post('/customer/modify/pwd?token='+token,{
							"oldPassword": this.changeForm.oldpwd,
	    					"newPassword": this.changeForm.newpwd,
						}).then(res => {
							if(res.data.code=="10014"){
									this.$message.error('The two passwords are not the same');
							}
							else if(res.data.code=="0"){
									this.$message.success('The change was successful, please login again');
									localStorage.removeItem('token');
					                localStorage.removeItem('name');
					                this.dialogVisible=false;
					                this.haveToken=true;
					                if(this.$route.path!="/"){
							  			this.$router.push('/');
							  		}
							}
							else if(res.data.code=="10001"){
								this.$message.error('Please login to our system again!');
								localStorage.removeItem('token');
					            localStorage.removeItem('name');
					            this.dialogVisible=false;
					            this.haveToken=true;
					            this.modelShow=true;
							}
							else{
								this.$message({
									message: res.data.msg,
									type: 'warning'
								});
							}
				});
	  		},
	  		account(){
	  			if(this.$route.path!="/change"){
				  	 this.$router.push('/change');
				}
	  		},
	  		history(){
	  			
	  			if(localStorage.getItem('token')==null){
	  				this.modelShow=true;
	  				this.findpd=false;
	  				return;
	  			}
	  			if(this.$route.path!="/history"){
				  	 this.$router.push('/history');
				}
	  			
	  		},
	  		logout(){
	  			localStorage.removeItem('token');
				localStorage.removeItem('name');
				this.haveToken=true;
				if(this.$route.path!="/"){
				  	 this.$router.push('/');
				}
	  		},
	  		back(){
		  		this.$router.push('/');
		  	},
		  	search(){
		  		this.$store.commit('handleGoodsname',this.input3);
		  		if(this.$route.path!="/Goods"){
		  			this.$router.push('/Goods');
		  		}else{
		  			this.$emit("event1",this.input3);
		  		}
		  	},
		  	cart(){
		  		if(localStorage.getItem('token')==null){
	  				this.modelShow=true;
	  				this.findpd=false;
	  				return;
	  			}
		  		if(this.$route.path!="/Cart"){
				  	 this.$router.push('/Cart');
				}
		  	},
		  	about(){
		  		if(this.$route.path!="/Abouts"){
		  			this.$router.push('/Abouts');
		  		}
		  	},
		  	loginFrom(){
		  		this.form.email="";
		  		this.form.password="";
		  		
		  		this.findpd=false;
		  		this.modelShow=true;
		  	},
		  	registerFrom(){
		  		this.repassword='';
			  	this.registerForm={
		          	email:'',
		          	code:'',
		          	email:'',
		          	co:86,
		          	password:'',
		          	company:'',
		          	name:'',
		          	country:'',
		          	city:'',
		          	address:'',
		          	dport:'',
		          	shuihao:'',
		         },
	  			this.registerShow=true;
	  			this.sendbtn=false;
		  	},
		  	findpw(){
		  		this.findpd=true;
		  	},
		  	openregisterFrom(){
		  		this.sendbtn=false;
		  		this.modelShow=false;
		  		this.registerShow=true;
		  	},
		  	retrieve(){
		  		this.axios.post('/customer/getpassword',{
					"email": this.form.email,
				}).then(res => {
					//请求成功后的处理函数
					if(res.data.code=="0"){
						this.$message.success("Password send your mailbox success!");
						this.modelShow=false;
					}
					if(res.data.code=="10035"){
						this.$message.error(res.data.msg);
					}
					if(res.data.code=="10026"){
						this.$message.error(res.data.msg);
					}
				}).catch(err => {                 //请求失败后的处理函数   
					console.log(err)
				})	
		  	},
		  	login(){
		  		const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		  		if(mailReg.test(this.form.email)){
		  			
		  		}else{
		  			this.$message.error('Incorrect mailbox format!');
		  			return;
		  		}
		  		
		  		if(this.form.password==""){
		  			this.$message.error('The password cannot be empty!');
		  			return;
		  		}
		  		this.axios.post('/customer/login',{
				  	//参数
					"email": this.form.email,
					"password":this.form.password,
					
				}).then(res => {
					//请求成功后的处理函数
					if(res.data.code=="0"){
						this.$message.success("Login  success!");
						localStorage.setItem('token', res.data.data.token);
						localStorage.setItem('name', res.data.data.name);
						this.name=res.data.data.name;
						this.modelShow=false;
						this.haveToken=false;			
					}
					else if(res.data.code=="10019"){
						this.$message.error("Password error");
					}
					else{
						this.$message.error(res.data.msg);
					}
				}).catch(err => {                 //请求失败后的处理函数   
					console.log(err)
				})
			  	}
	  		
	  	}
	  	
	}
	
	
	
</script>

<style>
	.footer-login-c{
		width:100%;
	}
	.top{
		min-width: 1300px;
		width:80%;
		height:100px;
		margin: 0 auto;
	}
	.logo{
		
		
	}
	.topimg{
		height:100px;
		float:left;
	}
	.search{
		width:45%;
		float:left;
		line-height: 100px;
		margin-left: 10px;
	}
	.searchClass{
	  border: 1px solid #135B4E;
	  border-radius: 20px;
	  background: #f4f4f4;
	}
	.top-login{
		width:60px;
		height:100px;
		float:right;
	}
	.top-cart{
		width:60px;
		height:100px;
		float:right;
	}
	.top-order{
		width:60px;
		height:100px;
		float:right;
	}
	.top-abouts{
		width:60px;
		height:100px;
		float:right;
		
	}
	.ms_about_img{
		height:50px;
		width:60px;
		position:relative; 
	}
	.ms_about_text{
		text-align: center;
		width:100%;
		line-height: 0px !important;
		color:black !important;
	}
	.el-icon-s-cooperation{
		position: absolute;
		margin-left:18px ;
		bottom: 0px;
	}
	
	
	.ms_order_img{
		height:50px;
		width:60px;
		position:relative;
	}
	.el-icon-s-order{
		position: absolute;
		margin-left:18px ;
		bottom: 0px;
	}
	.ms_order_text{
		text-align: center;
		width:100%;
		line-height: 0px !important;
		color:black !important;
	}
	
	.ms_cart_img{
		height:50px;
		width:60px;
		position:relative;
	}
	.el-icon-shopping-cart-2{
		position: absolute;
		margin-left:18px ;
		bottom: 0px;
	}
	.ms_cart_text{
		text-align: center;
		width:100%;
		line-height: 0px !important;
		color:black !important;
	}
	.top-login-icon{
		width:50px;
		float:right;
		height:100px;
		line-height: 100px;
	}
	
	.ms_sign{
		float: left;
		height:20px !important;
		line-height:20px !important;
		padding: 0px 0px !important;
		color:black !important;
	}
	.ms_register{
		float: left;
		height:20px !important;
		line-height:30px !important;
		padding: 0px 0px !important;
		color:black !important;
	}
	.top-login-text{
		width:50px;
		float:right;
		height:100px;
		position: relative;
		top:25px;
		color:black;
	}
	.top-select-text{
		font-size: 20px;
	}
	
	
	
	
	.login-btn{
		width:100%;
	}
	.forget{
		float:left;
		height:20px;
		line-height: 20px;
	}
	.util{
		height:15px;
		line-height:15px;
	}
	.util-register{
		float:right;
		line-height: 20px;
	}
	.top-hi-user{
		/*height:100px;
		float:right;
		line-height: 100px;
		font-size: 18px;*/
	}
	.top-select{
		height:30px;
		float:right;
		position: relative;
		top:30px;
		font-size: 25px;
	}
	
	
	
	
	
	
	
	
	
	
	
	/*search的css*/
	.searchClass .el-input-group__prepend {
	  border: none;
	  background-color: transparent;
	  padding: 0 10px 0 30px;
	}
	.searchClass .el-input-group__append {
	  border: none;
	  background-color: transparent;
	}
	.searchClass .el-input__inner {
	  height: 36px;
	  line-height: 36px;
	  border: none;
	  background-color: transparent;
	}
	.searchClass .el-icon-search{
	  font-size: 16px;
	}
	.searchClass .centerClass {
	  height: 100%;
	  line-height: 100%;
	  display: inline-block;
	  vertical-align: middle;
	  text-align: right;
	}
	.searchClass .line {
	  width: 1px;
	  height: 26px;
	  background-color: #c5c5c5;
	  margin-left: 14px;
	}
	
	
</style>