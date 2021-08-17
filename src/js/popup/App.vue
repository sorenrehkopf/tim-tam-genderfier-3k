<template>
	<div class="app-container p-5">
		<h1 class="title is-4 is-underlined">Gender Extender!</h1>
		<label class="label">Genders</label>
		<div>
			<div v-for="gender in genders">
				{{gender}}
			</div>
		</div>
		<div class="field has-addons">
			<div class="control">
				<input type="text" placeholder="An exciting new gender!" class="input" />
			</div>

			<div class="control">
		    <a class="button is-info">
		      +
		    </a>
		  </div>
		</div>
		<p>What genders would you like to see reflected on forms?</p>
	</div>
</template>

<script type="text/javascript">
	import { onBeforeMount } from 'vue';
	import defaultGenders from './defaultGenders'

	export default {
		computed: {
			genders() {
				return localStorage.getItem('genders').split(',');
			}
		},
		setup() {
			onBeforeMount(() => {
				if (!localStorage.getItem('genders')) {
					localStorage.setItem('genders', defaultGenders)
				}
			})
		},
	};
</script>

<style lang="scss">
	.app-container {
	}
</style>
