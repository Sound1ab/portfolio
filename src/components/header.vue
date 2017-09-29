<template>
	<header
		class="header"
		:class="{'fix': fix}"
	>
		<div class="header__container">
			<router-link to="/">
				<div class="header__logo">
					<img :src="fetchImg(storeData.logo)" />
				</div>
			</router-link>
			<div class="header__nav-items-container">
				<ul class="header__nav-items">
					<li
						v-for="element in storeData.nav"
						class="header__nav-item">
							<router-link
								:to="element.slug"
								class="header__router-link"
								:key="element.title"
							>
								{{element.title}}
								<div class="header__border"></div>
							</router-link>
					</li>
				</ul>
				<cross></cross>
				<burger-menu></burger-menu>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'header',
		components: {
			'Cross': () => import('@/components/burgermenu/cross'),
			'BurgerMenu': () => import('@/components/burgermenu/burgermenu.vue'),
		},
		data () {
			return {
				fix: false,
			};
		},
		computed: {
			...mapState({
				storeData: state => state.localData.data.header,
			}),
		},
		methods: {
			'handleScroll': function () {
				this.fix = document.body.getBoundingClientRect().top <= -137;
			}
		},
		mounted () {
			window.addEventListener('scroll', this.handleScroll);
		}
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background-color: #fff;
		background: rgba(255,255,255,1);
		z-index: 2;
		transition: all .5s;
		&.fix {
			background: rgba(255,255,255,0.7);
		}
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			padding: em($padVert) 0;
			display: flex;
			justify-content: space-between;
			transition: all .5s;
			.fix & {
				padding: em(20) 0;
			}
		}
		&__nav-items-container {
			display: flex;
			align-items: center;
		}
		&__nav-items {
			display: flex;
		}
		&__nav-item {
			position: relative;
			margin-right: em(40);
			&:last-child {
				margin-right: 0;
			}
			@include mq($s) {
				display: none;
			}
		}
		&__router-link {
			&:hover > div {
				opacity: 1;
			}
		}
		&__border {
			position: absolute;
			height: 5px;
			width: 100%;
			bottom: -10px;
			background-color: $quinaryColour;
			opacity: 0;
			transition: all 1s;
			.router-link-exact-active & {
				opacity: 1;
			}
		}
	}
</style>
