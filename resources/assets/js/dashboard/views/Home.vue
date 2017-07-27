<template>
	<section>
		<page-title title="Home"></page-title>
		<div class="row">
			<div class="col-md-3">
				<router-link :to="{name: 'articles.create' }" class="dashboard-stat dashboard-stat-v2 green" href="#">
					<div class="visual">
						<i class="fa fa-newspaper-o"></i>
					</div>
					<div class="details">
						<div class="number">
							<span>Artikel schreiben</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="col-md-3">
				<router-link :to="{name: 'ideas.create' }" class="dashboard-stat dashboard-stat-v2 blue" href="#">
					<div class="visual">
						<i class="fa fa-lightbulb-o"></i>
					</div>
					<div class="details">
						<div class="number">
							<span>Idee eintragen</span>
						</div>
					</div>
				</router-link>
			</div>

		</div>

	</section>
</template>

<script>
	export default {

	}
</script>
