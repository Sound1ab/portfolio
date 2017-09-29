<template>
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<heading></heading>
		<transition name="fade">
			<router-view></router-view>
		</transition>
		<footing></footing>
	</div>
</template>

<script>
	import store from '@/vuex/store';
	import { mapState } from 'vuex';
	export default {
		name: 'app',
		store,
		components: {
			'Heading': () => import('@/components/header.vue'),
			'Footing': () => import('@/components/footer.vue'),
		},
		computed: mapState([
			'localData'
		]),
		methods: {
			loadData () {
				this.$store.dispatch('LOAD_LOCAL_DATA', 'general');
				this.$store.dispatch('LOAD_BLOG_DATA');
			},
		},
		created () {
			this.loadData();
			this.$Progress.start();
			this.$router.beforeEach((to, from, next) => {
				if (to.meta.progress !== undefined) {
					let meta = to.meta.progress;
					this.$Progress.parseMeta(meta);
				}
				this.$Progress.start();
				next();
			});
			this.$router.afterEach((to, from) => {
				this.$Progress.finish();
			});
		},
		mounted () {
			this.$Progress.finish();
		},
	}
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/main.scss';
	#app {
		/*overflow: hidden;*/
	}
</style>
