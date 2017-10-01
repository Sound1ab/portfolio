<template>
	<div
		@click="handleClick"
		class="cross"
		:class="{'show': showMenu}"
	>
		<div class="cross__line-holder">
			<div class="cross__line one"></div>
			<div class="cross__line two"></div>
			<div class="cross__line three"></div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'cross',
		methods: {
			handleClick () {
				this.$store.dispatch('SHOW_BURGER_MENU', !this.showMenu);
			},
		},
		computed: {
			storeData () {
				return this.$store.getters.retrieveData('')
			},
			...mapState([
				'showMenu',
			])
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.cross {
		transition: .2s;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000;
		cursor: pointer;
		z-index: 4;
		pointer-events: all;
		display: none;
		@include mq($s) {
			display: flex;
		}
		&__line {
			width: 33px;
			height: 3px;
			background-color: $quinaryColour;
			margin-bottom: 5px;
			z-index: 1;
			transform-origin: 4px 0px;
			transition: all .5s;
			&.one {
				transform-origin: 0% 0%;
				.show & {
					transform: rotate(45deg) translate(2px, -6px);
				}
			}
			&.two {
				.show & {
					opacity: 0;
				}
			}
			&.three {
				margin-bottom: 1px;
				transform-origin: 0% 100%;
				.show & {
					transform: rotate(-45deg) translate(1px, 6px);
				}
			}
		}
	}
</style>
