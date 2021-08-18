<template>
	<div class="app-container p-5">
		<h1 class="title is-4 is-underlined">Gender Extender!</h1>
		<label class="label mb-1">Genders</label>
		<p class="help mb-2">What genders would you like to see reflected on forms?</p>

		<div class="tags">
			<span v-for="gender in genders" class="tag m-1" :key="gender">
				{{gender}}
				<button class="delete is-small" @click="() => removeGender(gender)"></button>
			</span>
		</div>

		<div class="field has-addons mt-">
			<div class="control">
				<input type="text" placeholder="An exciting new gender!" class="input" v-model="newGender"/>
			</div>

			<div class="control">
		    <a class="button is-info" @click="addGender">
		      +
		    </a>
		  </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import defaultGenders from './defaultGenders'

	export default {
		data: () => ({
			newGender: '',
			genders: localStorage.getItem('genders').split(','),
		}),

		watch: {
			genders(newGenders) {
				localStorage.setItem('genders', newGenders.join(','));
			}
		},

		methods: {
			addGender() {
				const { genders, newGender } = this;

				this.genders = [...genders, newGender];
				this.newGender = '';
			},

			removeGender(targetGender) {
				const { genders } = this;

				this.genders = genders.filter(gender => gender !== targetGender);
			}
		},

		setup() {
			if (!localStorage.getItem('genders')) {
				localStorage.setItem('genders', defaultGenders)
			}
		},
	};
</script>

<style lang="scss">
	.tags-container {
	}
</style>
