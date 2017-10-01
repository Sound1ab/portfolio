<template>
	<section class="image-grid">
		<div class="image-grid__container">
			<image-block
				v-for="(element, index) in projects"
				:key="`image-block-${index}`"
				:data="element"
			>
			</image-block>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'ImageGrid',
		components: {
			'ImageBlock': () => import('@/components/imagegrid/image'),
		},
		computed: {
			...mapState({
				projects: state => state.projectData.projects,
			}),
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.image-grid {
		width: 100%;
		margin-bottom: $mMargBottom;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
