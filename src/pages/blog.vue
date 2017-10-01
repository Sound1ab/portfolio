<template>
	<section class="blog">
		<tiitle
			:title="'Blog'"
			:hero-image="{
				main: 'http://api.phillipparker.tech/wp-content/uploads/2017/09/Photo17_17.jpg',
				opti: 'http://api.phillipparker.tech/wp-content/uploads/2017/09/Photo17_17.jpg'
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
	export default {
		name: 'Blog',
		components: {
			'Tiitle': () => import('@/components/title'),
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
