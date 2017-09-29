<template>
	<section class="project">
		<tiitle
			:title="storeData.title"
			:subTitle="storeData.sub_title"
			:link="{
				title: storeData.website.title,
				url: storeData.website.url
			}">
		</tiitle>
		<hero-image :src="storeData.hero_image"></hero-image>
		<column :sections="storeData.sections"></column>
		<image-grid></image-grid>
	</section>
</template>

<script>
	export default {
		name: 'Project',
		props: [''],
		components: {
			'ImageGrid': () => import('@/components/imagegrid/imagegrid'),
			'HeroImage': () => import('@/components/heroimage'),
			'Tiitle': () => import('@/components/title'),
			'Column': () => import('@/components/column')
		},
		data () {
			return {};
		},
		watch: {},
		methods: {},
		computed: {
			storeData () {
				return this.$store.getters.retrieveData(this.$route.params.id)
			},
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.project {
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			margin-bottom: $mMargBottom;
		}
		&__titles {
			text-align: center;
			padding: em(100) em(50)
		}
		&__copy {
			max-width: $column;
			margin: 0 auto;
		}
	}
</style>
