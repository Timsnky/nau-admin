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

		<hr>

		<div class="row">
			<div class="col-md-12">
				<h3>Hast Du ein technisches Problem?</h3>
			</div>
			<div class="col-md-2">
				<p>
					<b>Montag - Freitag:</b><br>
					<i class="fa fa-envelope-o"></i> <a href="mailto:helpdesk@nau.ch">helpdesk@nau.ch</a><br>
					<i class="fa fa-phone"></i> <a href="tel:+41318100240">+41 31 810 02 40</a><br>
					<i class="fa fa-clock-o"></i> 06:00 - 23:30 (MEZ)
				</p>
			</div>
			<div class="col-md-2">
				<p>
					<b>Samstag und Sonntag:</b><br>
					<i class="fa fa-envelope-o"></i> <a href="mailto:helpdesk@nau.ch">helpdesk@nau.ch</a><br>
					<i class="fa fa-phone"></i> <a href="tel:+41318100240">+41 31 810 02 40</a><br>
					<i class="fa fa-clock-o"></i> 07:30 - 22:00 (MEZ)
				</p>
			</div>
		</div>

	</section>
</template>

<script>
	export default {

	}
</script>
