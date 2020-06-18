<template>
<div>
<Top></Top>

<div  class="history-a">
	<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">Home page</el-breadcrumb-item>
			  <el-breadcrumb-item>The history order</el-breadcrumb-item>
	</el-breadcrumb>
</div>
<div  class="history-b">
	<el-table
		      :data="tableData"
		      style="width: 100%;  top:10px;"
	>
		      
		       <el-table-column type="expand">
			      <template slot-scope="props">
			          <p>Invoice Number :  {{ props.row.id }}</p>
			          <p>Email:  {{ props.row.email }}</p>
			          <p>Company Name: {{props.row.companyname}}</p>
			          <p>contact:{{props.row.name}}</p>
			          <p>phone:{{props.row.phone}}</p>
			          <p>country:{{props.row.country}}</p>
			          <p>city:{{props.row.city}}</p>
			          <p>address:{{props.row.address}}</p>
			          <p>DESTINATION PORT:{{props.row.dport}}</p>
			          <p>VAT/TAX Number:{{props.row.shuihao}}</p>
			      </template>
			  </el-table-column>
		      <el-table-column
		        prop="ddbh"
		        label="Order number"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="companyname"
		        label="Company Name"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="tradeterm"
		        label="Trade term"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="quantity"
		        label="PACKAGES"
		        width="180"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="grossweight"
		        label="G.W."
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="volume"
		        label="CBM"
		        width="130"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="number"
		        label="QUANTITY"
		        width="120"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
		        prop="price"
		        label="AMOUNT"
		        width="150"
		        :show-overflow-tooltip="true">
		      </el-table-column>
		      <el-table-column
			      align="center" label='operation'
			      >
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          type="info"
			          @click="detail(scope.$index, scope.row)"
			          >details</el-button>
			      </template>
			   </el-table-column>
		   
		    </el-table>
</div>
<div  class="history-c">

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


</div>




<el-dialog title="The order details" :visible.sync="detaildialogVisible" :close-on-click-modal="false">
			
			<el-table
            	:data="tableData2"
			    style="width: 100%">
			    
			    <el-table-column
			      label="name"
			      prop="name"
			      width="120"
			      >
			    </el-table-column>
			    <el-table-column
			      label="code"
			      prop="code"
			      width="130"
			      >
			    </el-table-column>
			    <el-table-column
			      label="size"
			      prop="size"
			      width="110"
			      >
			    </el-table-column>
			    
			     <el-table-column
			      label="quantity"
			      prop="quantity"
			      width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      label="Rough weight"
			      prop="grossweight"
			      width="120"
			      >
			    </el-table-column>
			    <el-table-column
			      label="CBM"
			      prop="volume"
			      width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      label="price"
			      prop="price"
			      width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      label="number"
			      prop="number"
			      width="100"
			      >
			    </el-table-column>
			  </el-table>
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
	created() {
		this.getData();

    },
	data(){
		return {
			tableData:[],
			tableData2:[],
			currentPage:1,
	        pageSize: 20,
	        total:0,
	        detaildialogVisible:false,
		}
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
         	this.currentPage=val;
          	this.getData();  
        },
		getData(){
			let  token=localStorage.getItem('token');
			this.axios.get('/order/customer/list?token='+token,{
	    	    params:{
					"pageSize":this.pageSize,
					"currentPage":this.currentPage,
				}
	    	}).then(res=>{
	    		this.tableData=res.data.data.orderList;
	    		this.total=res.data.data.allCount;
	    	});
		},
		detail(index,row){
			let  token=localStorage.getItem('token');
			this.axios.get('/order/customer/orderlist?token='+token,{
	    	    params:{
					"id":row.id,
				}
	    	}).then(res=>{
	    		this.detaildialogVisible=true;
	    		this.tableData2=res.data.data;	
	    	});
			
			
			
			
		}
	}
	
	
	
}
		
	
	
	
</script>

<style>
	.history-a{
		width: 80%;
		min-width: 1300px;
		margin: 0 auto;
		position: relative;
		top:50px;
	}
	.history-b{
		width: 80%;
		min-width: 1300px;
		margin: 0 auto;
		position: relative;
		top:80px;
	}
	.demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 120px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
	.history-c{
		width: 1239px;
		margin: 0 auto;
		position: relative;
		top:120px;
	}
	
	
	
	
	
</style>