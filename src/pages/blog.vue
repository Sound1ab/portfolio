<template>
	<section class="blog">
		<tiitle
			:title="'Blog'"
			:hero-image="{
				main: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940493/Photo29_29_rlwfsy.jpg',
				opti: convertCloudinary({
					src: 'http://res.cloudinary.com/dwdoisdas/image/upload/v1506940493/Photo29_29_rlwfsy.jpg',
					effect: 'blur',
					amount: 2000
				})
			}"
		></tiitle>
		<transition-group name="fade">
			<post-overview
				v-for="(element, index) in blogs"
				:key="index"
				:data="element"
			></post-overview>
		</transition-group>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import Tiitle from '@/components/title';
	export default {
		name: 'Blog',
		components: {
			Tiitle,
			'PostOverview': () => import('@/components/postoverview'),
		},
		computed: mapState({
			blogs: state => state.blogData.blogs
		}),
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.blog {
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
		}
		&__post-overview-container {
			max-width: $column;
			margin: 0 auto;
		}
	}
</style>
