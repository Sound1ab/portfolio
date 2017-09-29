<template>
	<section class="home">
		contact
	</section>
</template>

<script>
	export default {
		name: 'home',
		props: [''],
		components: {
			'Heading': () => import('@/components/header.vue'),
		},
		data () {
			return {};
		},
		watch: {},
		methods: {},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.home {

	}
</style>
