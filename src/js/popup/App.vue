<template>
	<div>{{title}}</div>
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
