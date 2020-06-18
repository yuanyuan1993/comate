<template>
	<div>
	<Top></Top>
	<div class="cart">
		<div  class="cart-a">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">Home page</el-breadcrumb-item>
		  <el-breadcrumb-item>The Cart</el-breadcrumb-item>
		</el-breadcrumb>
		</div>
		<div class="cart-b">
            <el-button
                    type="info"
                    size="small"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="allremove"
                    :disabled="this.tableData.length===0"
            >Empty</el-button>
			<el-table
		      :data="tableData"
		      style="width: 100%;  top:10px;"
		    >
		      <el-table-column
		        prop="name"
		        label="Item Name"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		       <el-table-column
		        prop="code"
		        label="SKU"
		        width="150"
		        :show-overflow-tooltip="true">
		       </el-table-column>
		      <el-table-column
		        prop="size"
		        label="size"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="quantity"
		        label="PACKAGES"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="grossweight"
		        label="TTL G.W."
		        width="120"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="volume"
		        label="CBM"
		        width="120"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      </el-table-column>
		      <el-table-column
		        prop="price"
		        label="Unit Price/USD"
		        width="120"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        label="Total Quantity">
		        <template slot-scope="scope">
				    <el-input-number size="mini" :min="1"  v-model="scope.row.number" @change='changenumber(scope.$index, scope.row)'></el-input-number>
				</template>
		      </el-table-column>
		      
		      <el-table-column
			      align="center" label='operation'
			      >
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)"
			          >Delete</el-button>
			      </template>
			   </el-table-column>
		    </el-table>
		</div>
		<div  class="cart-c">
			<el-button type="primary"  style="width:120px;"  @click="submit"   :disabled="this.tableData.length===0">Submit</el-button>
		</div>
	</div>
	
	
	
		<el-dialog
		  title="Confirmation of Information"
		  :visible.sync="centerDialogVisible"
		  width="800px"
		  center>
		  <el-form ref="personal" :model="personalForm"  size="small"  label-width="150px"  label-position = "right">
	            <el-row>
	                <el-form-item label="Campany Name">
	                    <el-input class="search-input" v-model="personalForm.company"/>
	                </el-form-item>
	                <el-form-item label="Name">
	                    <el-input class="search-input" v-model="personalForm.name"/>
	                </el-form-item>
	                <el-form-item label="Phone">
	                    <el-phone-number-input v-model="phone"   ></el-phone-number-input>
	                </el-form-item>
	                <el-form-item label="Trade term">
	                    <el-select v-model="tradeterm" placeholder="Please select">
					      <el-option label="FOB" value="FOB"></el-option>
					      <el-option label="CFR" value="CFR"></el-option>
					      <el-option label="CIF" value="CIF"></el-option>
					      <el-option label="DAF" value="DAF"></el-option>
					      <el-option label="DDP" value="DDP"></el-option>   
					      <el-option label="EXW" value="EXW"></el-option>
					    </el-select>
	                </el-form-item>
	                <el-form-item label="Order Lead time">
	                    <el-select v-model="leadtimes" placeholder="Please select">
					      <el-option label="15" value="15"></el-option>
					      <el-option label="30" value="30"></el-option>
					      <el-option label="40" value="40"></el-option>
					      <el-option label="45" value="45"></el-option>
					      <el-option label="50" value="50"></el-option>
					      <el-option label="60" value="60"></el-option>    
					    </el-select>
					    &nbsp;Days/DEPENTS
	                </el-form-item>
	                
	                <el-form-item label="Total">
	                    numbr: {{this.total.number}} //The total price: {{this.total.price}} USD//Number of packages: {{this.total.quantity}} UNIT//volume: {{this.total.volume}} CBM//Gross weight: {{this.total.grossweight}} KGS
	                </el-form-item>
	                
	                <div  class="dtable">
	                <el-table
				      :data="tableData"
				      style="width: 100%;  top:10px;"
				      empty-text="no data">
				      <el-table-column
				        prop="name"
				        label="Product Name"
				        width="150"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      <el-table-column
				        prop="size"
				        label="size"
				        width="100"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      <el-table-column
				        prop="quantity"
				        label="PACKAGES"
				        width="100"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      <el-table-column
				        prop="grossweight"
				        label="G.W."
				        width="100"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      <el-table-column
				        prop="volume"
				        label="CBM"
				        width="100"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      </el-table-column>
				      <el-table-column
				        prop="price"
				        label="price"
				        width="100"
				        :show-overflow-tooltip="true">
				      </el-table-column>
				      <el-table-column
				        label="number"
				        prop="number"
				        width="100">
				        
				      </el-table-column>
				 
				    </el-table>
				    </div>
	                <div  class="dbtn">
	                	<el-button  class="submit" type="primary" @click="sub" :disabled="subtn">SUBMIT</el-button>
	            	</div>
	            </el-row>
	            
	            
	       </el-form>
		</el-dialog>
	</div>
	
</template>

<script>
	import Top from "../common/Top.vue"
	import { ElPhoneNumberInput, mobileValidator, phoneNumberValidator} from 'el-phone-number-input'
	export default{
	name:"welcome",
	components:{
		Top,ElPhoneNumberInput
	},
	created(){
		this.getdata();
	},
	data(){
		return {
			centerDialogVisible:false,
			subtn:false,
			sels: [],
			tableData:[],
			personalForm:{
	          	email:'',
	          	company:'',
	          	name:'',
	        },
	        total:{
	        	number:'',
	        	price:'',
	        	quantity:'',
	        	volume:'',
	        	grossweight:'',
	        },
	        leadtimes:45,
	        tradeterm:'',
	        phone: {
	          callingCode: '',
	          phoneNumber: ''
	        },
		}
		
	},
	methods: {
		getperson(){
			let  token=localStorage.getItem('token');
			this.axios.post('/customer/getperson?token='+token).then(res => {
				if(res.data.code=="0"){
					this.personalForm.email=res.data.data.email;
					this.personalForm.company=res.data.data.companyname;
					this.personalForm.name=res.data.data.name;
					this.phone.callingCode=res.data.data.callingCode;
					this.phone.phoneNumber=res.data.data.phone;
				}
		});
		
		},
		getdata(){
			let  token=localStorage.getItem('token');
			this.axios.get('/cart/list?token='+token).then(res => {
				if(res.data.code=="0"){	
					this.tableData=res.data.data;			
				}	
		});
		
		},
		sub(){//订单提交
			if(this.tradeterm==""){
				this.$message({
					message: "Please select Trade term!",
					type: 'error'
				});
				return;
			}
			this.subtn=true;
			let  token=localStorage.getItem('token');
			this.axios.post('/order/add?token='+token,{
	          	"companyname":this.personalForm.company,
	          	"name":this.personalForm.name,
	          	"callingCode":this.phone.callingCode,
	          	'phone':this.phone.phoneNumber,
				"tradeterm":this.tradeterm,
				"leadtimes":this.leadtimes
			}).then(res => {
				this.subtn=false;
				if(res.data.code=="0"){
					this.centerDialogVisible=false;
					this.getdata();
					this.$message({
						message: "submit  success!",
						type: 'success'
					});			
				}
				if(res.data.code=="10034"){
					this.$message({
						message: "Your shopping cart is empty!",
						type: 'info'
					});
				}
			});
		},
		allremove(){
			let  token=localStorage.getItem('token');
			this.axios.post('/cart/allremove?token='+token,{
			}).then(res => {
				if(res.data.code=="0"){
					this.$message({
								message: "Remove All Success!",
								type: 'success'
					});
					this.getdata();
				}	
			});	
		},
		changenumber(index,row){
			let  token=localStorage.getItem('token');
			this.axios.post('/cart/updatenumber?token='+token,{	
				"id":row.id,
				"number":row.number
			}).then(res => {
				if(res.data.code=="0"){
					this.getdata();
				}	
			});	
		},
		handleDelete(index,row){
			let  token=localStorage.getItem('token');
			this.axios.post('/cart/cartdelete?token='+token,{	
				"cartId":row.id
			}).then(res => {
				if(res.data.code=="0"){
					this.$message({
								message: "Delete Success!",
								type: 'success'
					});
					this.getdata();
				}	
			});
		},
		submit(){
			let  token=localStorage.getItem('token');
			this.axios.get('/cart/calculate?token='+token,{
			}).then(res => {
				this.total.number=res.data.data.number;
				this.total.price=res.data.data.price;
				this.total.quantity=res.data.data.quantity;
				this.total.volume=res.data.data.volume;
				this.total.grossweight=res.data.data.grossweight;
			});
			this.getperson();
			this.centerDialogVisible=true;
		}
	}
}
	
	
</script>

<style>
.cart{
    width:100%;	
}
.cart-a{
	width: 1239px;
	margin: 0 auto;
	position: relative;
	top:50px;
}
.cart-b{
	width: 1239px;
	margin: 0 auto;
	position: relative;
	top:80px;
}
.cart-c{
	width: 1239px;
	margin: 0 auto;
	position:relative;
	top:120px;
}
.dtable{
	min-height:100px;	
}
.dbtn{
	position:relative;
	top:20px;
}
.el-table {
	font-size: 8px;
}





</style>