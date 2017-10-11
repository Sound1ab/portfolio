<template>
	<section class="about">
		<tiitle
			:title="'About'"
			:hero-image="{
				main: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940508/Photo22_22A_bwq23w.jpg',
				opti: convertCloudinary({
					src: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940508/Photo22_22A_bwq23w.jpg',
					effect: 'blur',
					amount: 2000
				})
			}"
		></tiitle>
		<div class="about__info-container">
			<div class="about__info-container-inner">
				<div class="about__picture-container">
					<div class="about__picture"></div>
				</div>
				<div class="about__copy-container eta" v-html="storeData.copy">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import Tiitle from '@/components/title';
	export default {
		name: 'About',
		props: [''],
		components: {
			Tiitle
		},
		data () {
			return {};
		},
		watch: {},
		methods: {},
		computed: {
			...mapState({
				storeData: state => state.localData.data.about,
			}),
		}
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.about {
		&__info-container {
			width: 100%;
		}
		&__info-container-inner {
			max-width: 800px;
			margin: 0 auto;
			display: flex;
			justify-content: space-around;
			align-items: stretch;
			@include mq(800) {
				max-width: $mobileContainer;
			}
		}
		&__picture-container {
			flex: 1 1 auto;
		}
		&__copy-container {
			flex: 5 1 auto;
			padding: em(10) em(10) em(10) em(30);
			margin-bottom: 0;
		}
		&__picture {
			position: relative;
			height: em(180);
			width: em(180);
			border-radius: 50%;
			margin: 0 auto;
			top: 50%;
			transform: translateY(-50%);
			background-image: url(http://res.cloudinary.com/dwdoisdas/image/upload/c_crop,w_501/v1507720681/profile_ppiaod.jpg);
			background-position: center;
			background-size: cover;
		}
	}
</style>
