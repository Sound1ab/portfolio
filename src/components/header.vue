<template>
	<header class="header">
		<div class="header__container">
			<div class="header__logo">logo</div>
			<div class="header__nav-items">nav items</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'header',
		props: [''],
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
	.header {
		position: relative;
		width: 100%;
		&__container {
			width: 1200px;
			margin: 0 auto;
			padding: em(padVert);
		}
	}
</style>
