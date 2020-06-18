<template>
	<div>
		<Top></Top>
		<div  class="abouts">
			<div class="abouts-a">
				<div class="abouts-title">
					<strong style="position: relative;top:60px;">About Welfull</strong>
				</div>
				<div  class="abouts-text">
					<p>Welfull group Co., Ltd desde 1993, tiene dos fábricas y dos almacenes. Contamos con modernos equipos de producción y un excelente sistema de control de calidad, con certificados de ISO9002 / ISO40001. Nuestros productos también aceptan pruebas SGS e ITS.</p>

					<p>Desde 2006, estamos exportando productos a Centroamérica: Costa Rica, Panamá, Guatemala, El Salvardo, México, Colombia, Ecuador, Puerto Rico y otros países.</p>

					<p>Proporcionamos productos rentables, calidad confiable, opciones ricas, servicio integral, es una buena ayuda para resolver problemas.</p>
				</div>
			</div>
		</div>
		<div class="factory">
			<div  class="factory-a">
				<div class="factory-title">
					<strong style="position: relative;top:20px;">Our Factory</strong>
				</div>
				<div class="factory-img">
					<el-image 
					    style="width: 260px;"
					    :src="require('@/assets/factory-1.png')" 
					    :preview-src-list="[require('@/assets/factory-1.png')]" 
					    >
					</el-image>
					<el-image 
					    style="width: 260px;"
					    :src="require('@/assets/factory-2.png')" 
					    :preview-src-list="[require('@/assets/factory-2.png')]" 
					    >
					</el-image>
					<el-image 
					    style="width: 260px;"
					    :src="require('@/assets/factory-3.png')" 
					    :preview-src-list="[require('@/assets/factory-3.png')]" 
					    >
					</el-image>
					<el-image 
					    style="width: 260px;"
					    :src="require('@/assets/factory-4.png')" 
					    :preview-src-list="[require('@/assets/factory-4.png')]" 
					    >
					</el-image>				
				</div>
				
			</div>
			
		</div>
		<div  class="about-footer">
			
			© 2020 Welfull All rights reserved.
		</div>
		
		
	</div>
	
</template>

<script>
	
import Top from "../common/Top.vue"
export default{
	name:"welcome",
	components:{
		Top
	},
	data(){
		return {
			srcList1: [
	          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
	          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
	        ],
	        srcList2: [
	          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
	          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
	        ],
	        srcList3: [
	          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
	          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
	        ],
	        srcList4: [
	          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
	          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
	        ]
	     
      }
		
	}
}
	
</script>

<style>
	.abouts{
		height:500px;
				
	}
	.abouts-a{
		height: 500px;
	    width: 80%;
	    min-width: 1300px;
	    margin: 0 auto;
	    position: relative;
	    /*background-color: red;*/
	}
	.abouts-title{
		height:150px;
		font-size:50px ;
		
	}
	.abouts-text{
		height:350px;
		
	}
	.abouts-text p{
		font-size:25px;
	}
	.factory{
		height:520px;
		width:100%;	
	}
	.factory-a{
		height: 520px;
	    width: 80%;
	    min-width: 1300px;
	    margin: 0 auto;
	    position: relative;
	}
	.factory-title{
		height:150px;
		font-size:50px ;
	}
	.about-footer{
		height: 150px;
	    width: 80%;
	    margin: 0 auto;
	    position: relative;
	    line-height: 150px;
	    font-size: 20px;
	    text-align: center;
	    font-family: inherit;
	}
	

</style>