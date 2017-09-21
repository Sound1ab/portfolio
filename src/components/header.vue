<template>
	<header class="header" v-design-mode>
		<div class="header__container">
			<div class="header__logo">
				<img :src="fetchImg(storeData.logo)" />
			</div>
			<div class="header__nav-items-container">
				<router-link
					v-for="element in storeData.nav"
					:to="element.slug"
					class="header__router-link"
					:key="element.title"
				>
					<ul class="header__nav-items">
						<li
							class="header__nav-item">
							{{element.title}}
							<div class="header__border"></div>
						</li>
					</ul>
				</router-link>
			</div>
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
		computed: {
			storeData () {
				return this.$store.getters.retrieveData('header')
			},
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
			max-width: 1200px;
			margin: 0 auto;
			padding: em($padVert) em(20);
			display: flex;
			justify-content: space-between;
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
			&:hover > div {
				opacity: 1;
			}
		}
		&__router-link {
			margin-right: em(40);
			&:last-child {
				margin-right: 0;
			}
			&.router-link-active {

			}
		}
		&__border {
			position: absolute;
			height: 5px;
			width: 100%;
			bottom: -10px;
			background-color: #c41230;
			opacity: 0;
			transition: all 1s;
			.router-link-exact-active & {
				opacity: 1;
			}
		}
	}
</style>
