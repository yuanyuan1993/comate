<template>
	
	
	<div v-bind:style="{backgroundImage:'url(' + bg + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">
		<div class="footer">
			<div class="foot-text">
				<p>WWW.WELFULL.COM.CN</p>
				<p>E-mail:William.jiang@welfull.com</p>
				<p>WeChat:William0571</p>
				<p>WhatsApp:+86 189 6906 2213</p>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
  name: 'HelloWorld',
  data () {
    return {
      bg:require('@/assets/bg.jpg'),
    }
  }
}
</script>

<style>
	.footer{
		position: relative;
		top:50px;
		width:80%;
		min-width: 1300px;
		height:800px;
		margin: 0 auto;
		font-size: 50px;
		font-weight:bold;
	}
	.foot-text{
		position: relative;
		top:200px;
		color:#FFF;
	}
</style>