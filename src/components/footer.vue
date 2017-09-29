<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__section">
				<div class="footer__links" v-for="element in storeData.links">
					<span class="footer__copy line-one">{{element.line_one}}</span>
					<span class="footer__copy line-two">{{element.line_two}}</span>
				</div>
			</div>
			<div class="footer__section">
				<div class="footer__links social" v-for="element in storeData.social">
					<img class="footer__icon" :src="fetchImg(element.icon)" />
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'footer',
		computed: {
			...mapState({
				storeData: state => state.localData.data.footer,
			}),
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.footer {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer
			}
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
		}
		&__section {
			display: flex;
			padding: em(50) em(10);
		}
		&__copy {
			display: block;
			font-size: 13px;
			&.line-one {
				color: $darkGrey;
				font-weight: 500;
				margin-bottom: em(10);
			}
			&.line-two {
				color: $lightGrey;
				font-weight: 500;
			}
		}
		&__links {
			margin-right:em(10);
			&:last-child {
				margin-right: 0;
			}
			&.social {
				display: flex;
				align-items: center;
			}
		}
		&__icon {
			width: 30px;
			height: auto;
		}
	}
</style>
