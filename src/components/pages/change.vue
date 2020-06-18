<template>
	<div>
	<Top></Top>
	<div class="change">
		<div  class="change-a">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
		  <el-breadcrumb-item>The personal data</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div  class="changeForm">
		
		
		 <el-form ref="personal" :model="personalForm"  size="small"  label-width="150px"  label-position = "right">
            <el-row>
                <el-form-item label="Email" prop="email" >
                    <el-input class="search-input" v-model="personalForm.email"  :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="Campany Name">
                    <el-input class="search-input" v-model="personalForm.company"/>
                </el-form-item>
                <el-form-item label="Contact Name">
                    <el-input class="search-input" v-model="personalForm.name"/>
                </el-form-item>
                <el-form-item label="Phone">
                    <el-phone-number-input v-model="phone"   ></el-phone-number-input>
                </el-form-item>
                <el-form-item label="Country">
                    <el-input class="search-input" v-model="personalForm.country"/>
                </el-form-item>
                <el-form-item label="City">
                    <el-input class="search-input" v-model="personalForm.city"/>
                </el-form-item>
                <el-form-item label="Address">
                    <el-input class="search-input" v-model="personalForm.address"/>
                </el-form-item>
                <el-form-item label="Destination Port">
                    <el-input class="search-input" v-model="personalForm.dport"/>
                </el-form-item>
                <el-form-item label="VAT/TAX Number">
                    <el-input class="search-input" v-model="personalForm.shuihao"/>
                </el-form-item>
                
                <el-button class="submit" type="primary" @click="change">SUBMIT</el-button>
            </el-row>
         </el-form>
        </div>
		</div>
	</div>
	
	</div>
	
</template>

<script>
	import Top from "../common/Top.vue"
	import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator} from 'el-phone-number-input'
	export default{
	name:"welcome",
	components:{
		Top,
		ElPhoneNumberInput
	},
	created(){
		this.getdata();
	},
	data(){
		return {
			personalForm:{
	          	email:'',
	          	company:'',
	          	name:'',
	          	phone:'',
	          	country:'',
	          	city:'',
	          	address:'',
	          	dport:'',
	          	shuihao:'',
	        },
	        phone: {
	          callingCode: '',
	          phoneNumber: ''
	        },
		}
		
	},
	methods: {
		getdata(){
			let  token=localStorage.getItem('token');
			this.axios.post('/customer/getperson?token='+token).then(res => {
				if(res.data.code=="0"){
					this.personalForm.email=res.data.data.email;
					this.personalForm.company=res.data.data.companyname;
					this.personalForm.name=res.data.data.name;
					this.phone.callingCode=res.data.data.callingCode;
					this.phone.phoneNumber=res.data.data.phone;
					this.personalForm.country=res.data.data.country;
					this.personalForm.city=res.data.data.city;
					this.personalForm.address=res.data.data.address;
					this.personalForm.dport=res.data.data.dport;
					this.personalForm.shuihao=res.data.data.shuihao;
					
			}
			
			
		});
		
		},
		change(){
			let  token=localStorage.getItem('token');
			this.axios.post('/customer/modify?token='+token,{
				'companyname':this.personalForm.company,
				'name':this.personalForm.name,
				'callingCode':this.phone.callingCode,
				'phone':this.phone.phoneNumber,
				'country':this.personalForm.country,
				'city':this.personalForm.city,
				'address':this.personalForm.address,
				'dport':this.personalForm.dport,
				'shuihao':this.personalForm.shuihao,
			}).then(res => {
				if(res.data.code=="0"){
					this.$message.success('Update Success!');
					localStorage.setItem('name', res.data.data.name);
					this.getdata();
				}
				else if(res.data.code=="10001"){
					this.$message.error('Please login to our system again!');
					localStorage.removeItem('token');
					localStorage.removeItem('name');
					this.$router.push('/');
				}
			
			
		});
		}
	}
}
	
	
</script>

<style>
.change{
	height:500px;
    width:100%;	
}
.change-a{
	height: 500px;
	width: 80%;
	min-width: 1300px;
	margin: 0 auto;
	position: relative;
	top:50px;
}
.changeForm{
	
	width:50%;
	margin: 0 auto;
	position: relative;
	top:50px;
	
}

.submit{
	width:100%;
	position: relative;
	top:30px;
}



</style>