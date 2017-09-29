<template>
	<section class="text-hero">
		<div class="text-hero__container">
			<p class="text-hero__line-one">{{storeData.line_one}}</p>
			<h1 class="text-hero__line-two alpha">{{storeData.line_two}}</h1>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'TextHero',
		computed: {
			...mapState({
				storeData: state => state.localData.data.text_hero,
			}),
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.text-hero {
		position: relative;
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			padding: em(200) em(50);
		}
		&__line-one {
			font-weight: bold;
			color: $quinaryColour;
		}
		&__line-two {
			@include responsive-font(4vw, 25px, (nth($headingSizes, 1)*1px), 40px);
		}
	}
</style>
