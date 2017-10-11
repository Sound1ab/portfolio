<template>
	<div class="hero-image">
		<img class="hero-image__image" :src="src" />
	</div>
</template>

<script>
	export default {
		name: 'hero-image',
		props: ['src'],
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
	.hero-image {
		width: 100%;
		margin-bottom: em(50);
		&__image {
			margin: 0 auto;
			display: block;
			max-width: $column;
			@include mq($column) {
				max-width: $mobileContainer;
			}
		}
	}
</style>
