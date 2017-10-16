<template>
	<section class="project-title">
		<div class="project-title__container">
			<div>
				<h1
					v-if="title"
					class="project-title__main-title alpha"
					v-html="title">
				</h1>
				<h4
					v-if="subTitle"
					class="project-title__sub-title eta"
					v-html="subTitle">
				</h4>
				<a
					v-if="url"
					class="cta"
					:href="url"
					target="_blank"
					rel="noopener">
					View the site
				</a>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'ProjectTitle',
		props: ['title', 'subTitle', 'url'],
		data () {
			return {};
		},
		watch: {},
		methods: {},
		computed: {
			storeData () {
				return this.$store.getters.retrieveData('')
			},
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.project-title {
		color: black;
		text-align: center;
		margin-top: 146px;
		margin-bottom: em(50);
		&__container {
			max-width: $xl;
			margin: 0 auto;
			text-align: center;
			height: em(300);
			display: flex;
			justify-content: center;
			align-items: center;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
		}
		&__main-title {
			@include responsive-font(4vw, 30px, (nth($headingSizes, 1)*1px), 40px);
			color: #333;
		}
	}
</style>
