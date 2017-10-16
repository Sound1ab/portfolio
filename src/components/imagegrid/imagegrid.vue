<template>
	<section class="image-grid">
		<div class="image-grid__container">
			<image-block
				v-for="(element, index) in projects"
				:key="`image-block-${index}`"
				:data="element"
				:width="widths[index]"
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
		data () {
			return {
				widths: [40, 60, 50, 50, 40, 60]
			}
		},
		methods: {
			randomIntFromInterval (min, max) {
				return Math.floor(Math.random()*(max-min+1)+min);
			},
			width () {
				if (!this.style.count || this.style.count === 2) {
					this.style.count = 0;
				}
				if (this.style.count === 0) {
					this.style.randomNo = Math.ceil(this.randomIntFromInterval(30, 70) / 10) * 10;
				} else {
					this.style.randomNo = 100 - this.style.randomNo;
				}
				this.style.count++;
				return this.style.randomNo;
			},
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
