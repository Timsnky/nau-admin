<template>
	<h1 class="page-title"> 
		{{ title }}
		<small>{{ sub }}</small>
	</h1>
</template>

<script>
	export default {
		props: [
			'title',
			'sub'
		]
	}
</script>