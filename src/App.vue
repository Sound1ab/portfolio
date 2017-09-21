<template>
	<div v-if="Object.keys(data).length > 0" id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import store from '@/vuex/store';
	import { mapState } from 'vuex';
	export default {
		name: 'app',
		store,
		computed: mapState([
			'data',
		]),
		watch: {
			'$route.name': function (val) {
				this.loadData(val);
			},
		},
		methods: {
			loadData (page) {
				this.$store.dispatch('LOAD_DATA', page);
			},
		}
	}
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/main.scss';

</style>
