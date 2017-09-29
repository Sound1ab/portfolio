<template>
	<transition name="roundin" mode="out-in">
		<div
			v-if="showMenu"
			class="burger-menu"
		>
			<div class="burger-menu__container">
				<ul class="burger-menu__nav-items">
					<li
						v-for="element in storeData.nav"
						@click="handleClick"
						class="burger-menu__nav-item">
							<router-link
								:to="element.slug"
								class="burger-menu__router-link"
								:key="element.title"
							>
								{{element.title}}
							</router-link>
					</li>
				</ul>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'BurgerMenu',
		props: [''],
		data () {
			return {};
		},
		computed: {
			...mapState({
				storeData: state => state.localData.data.header,
			}),
			...mapState([
				'showMenu',
			])
		},
		methods: {
			handleClick () {
				this.$store.dispatch('SHOW_BURGER_MENU', false);
			}
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.burger-menu {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		clip-path: circle(100vh at top right);
		background-color: $primaryColour;
		z-index: 3;
		&__container {
			position: fixed;
			background-color: $primaryColour;
			z-index: 1;
		}
		&__nav-items {
			position: absolute;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		&__nav-item {
			transition: all .5s;
			&:last-child {
				margin-bottom: em(0);
			}
			&:hover {
				transform: translateX(20px);
			}
		}
		&__router-link {
			color: #fff;
			font-size: 50px;
		}
	}
</style>
