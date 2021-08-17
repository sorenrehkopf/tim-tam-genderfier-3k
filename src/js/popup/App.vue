<template>
	<div class="app-container p-5">
		<h1 class="title is-4 is-underlined">Gender Extender!</h1>
		<h3>What genders would you like to see reflected?</h3>

	</div>
</template>

<script type="text/javascript">
	import { onMounted } from 'vue';

	export default {
		data: () => ({
			title: 'hey here it is!!!!',
		}),
		setup() {
			onMounted(() => {
				console.log('created!');
			})
		},
	};
</script>

<style lang="scss">
	.app-container {
		width: 700px;
		max-width: 100vw;
	}
</style>
