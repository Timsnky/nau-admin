<template>
	<section>
		<page-title title="About" sub="test page"></page-title>
		<div class="note note-info">
		    <p> A black page template with a minimal dependency assets to use as a base for any custom page you create </p>
		</div>
	</section>
</template>

<script>
	export default {
		mounted() {
			console.log('About view loaded...');
		}
	}
</script>