<template>
	<section class="home">
		<text-hero></text-hero>
		<image-grid></image-grid>
	</section>
</template>

<script>
	import TextHero from '@/components/texthero';
	export default {
		name: 'home',
		props: [''],
		components: {
			TextHero,
			'ImageGrid': () => import('@/components/imagegrid/imagegrid')
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.home {

	}
</style>
