<template>
	<header
		class="header"
		:class="{'fix': fix}"
	>
		<div class="header__container">
			<router-link to="/">
				<div class="header__logo">

					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 325">
						<title>Artboard 1</title>
						<path d="M106.4.94q43.74,0,74.89,31.2t31.15,75q0,44.17-31.14,75.36-30.79,30.85-74.88,30.85a102.42,102.42,0,0,1-52.67-14,106.19,106.19,0,0,1-38-37.16V323.77H.71V8.65H15.79l0,43.82a107.72,107.72,0,0,1,38-37.33A101.46,101.46,0,0,1,106.4.94Zm.18,197q37.15,0,64.15-26.29,26.63-26.63,26.64-64.5,0-37.5-26.64-64.15T106.57,16.36Q69.06,16.36,42.43,43T15.79,107.15q0,37.86,26.64,64.5Q69.06,197.94,106.57,197.94Z"/>
						<path d="M450.43,107.15A104.62,104.62,0,0,1,428,172.7q-23.13,28.39-56.79,37.16l65.9,113.92H419.24L355.09,212.66q-3.51.35-6.13.53c-1.75.12-3.22.17-4.38.17A104.12,104.12,0,0,1,291.65,199q-23.14-13-37.86-36.81V323.77H238.72V8.65h16.47l14,24.19Q300,.94,344.42.94q43.73,0,74.88,31.2T450.43,107.15ZM253.79,37.39V52.47c.7-1.17,1.46-2.33,2.28-3.51s1.69-2.33,2.63-3.5ZM346.5,197.94,267.06,60.18a89.87,89.87,0,0,0-.67,92.89,89.77,89.77,0,0,0,32.88,32.6,86.67,86.67,0,0,0,45.13,12.27ZM344.58,16.36a85.55,85.55,0,0,0-37.51,8.41,98.6,98.6,0,0,0-30.15,22.08l86.23,149A87.63,87.63,0,0,0,414.68,165q20.68-24.88,20.68-57.84,0-37.5-26.64-64.15T344.58,16.36Z"/>
						<path d="M582.4.94q43.74,0,74.89,31.2t31.15,75q0,44.17-31.14,75.36-30.79,30.85-74.88,30.85a102.41,102.41,0,0,1-52.67-14,106.19,106.19,0,0,1-38-37.16V323.77H476.72V8.65h15.07l0,43.82a107.72,107.72,0,0,1,38-37.33A101.47,101.47,0,0,1,582.4.94Zm.17,197q37.15,0,64.15-26.29,26.63-26.63,26.64-64.5,0-37.5-26.64-64.15T582.58,16.36q-37.51,0-64.15,26.64t-26.64,64.15q0,37.86,26.64,64.5Q545.07,197.94,582.58,197.94Z"/>
					</svg>
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
				this.fix = document.body.getBoundingClientRect().top.toFixed() < 0;
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
		background: rgba(255,255,255,0.5);
		z-index: 2;
		transition: all .5s;
		box-shadow: 0px 6px 9px 0px rgba(0,0,0,0.15);
		&.fix {
			background: rgba(255,255,255,0.5);
		}
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			padding: em(40) 0;
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
		&__logo {
			position: relative;
			width: 82px;
		}
		&__nav-items {
			display: flex;
			list-style-type: none;
			margin-bottom: 0;
			padding-left: 0;
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
			color: #000;
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
