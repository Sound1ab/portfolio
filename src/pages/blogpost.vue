<template>
	<section class="blog-post" :key="$route.path">

		<transition-group name="fade">
			<tiitle
				v-if="Object.keys(title).length > 0"
				key="title"
				:title="title.title"
				:published="title.publish_date"
				:hero-image="{
					main: title.hero_image,
					opti: convertCloudinary({
						src: title.hero_image,
						effect: 'blur',
						amount: 2000
					}),
				}"
				:category="title.category">
			</tiitle>
			<column v-if="columnData.length > 0" key="column" :sections="columnData"></column>
			<more-blogs :data="blogs" key="more-blogs"></more-blogs>
		</transition-group>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import _ from 'lodash';
	import Tiitle from '@/components/title';
	export default {
		name: 'BlogPost',
		props: [''],
		components: {
			Tiitle,
			'Column': () => import('@/components/column'),
			'MoreBlogs': () => import('@/components/moreblogs'),
		},
		watch: {},
		methods: {
			filter (data, searchTerm) {
				let valArr = data.filter(element => {
					return element.acf_fc_layout === searchTerm
				});
				return valArr[0]
			},
		},
		computed: {
			...mapState({
				blogs: state => state.blogData.blogs
			}),
			columnData () {
				let val = [];
				val = this.blog.filter(element => {
					return element.acf_fc_layout !== 'title' && element.acf_fc_layout !== 'id';
				});
				return val.length > 0 ? val : [];
			},
			title () {
				let val = {};
				if (this.blog.length > 0) {
					val = this.filter(this.blog, 'title');
				}
				return Object.keys(val).length > 0 ? val : {};
			},
			blog () {
				let val = [];
				if (this.blogs.length > 0) {
					for (let i = 0; i < this.blogs.length; i++) {
						let filteredArr = this.blogs[i].filter(element => {
							if (element.id) {
								return element.id == this.$route.params.id;
							} else {
								return false;
							}
						});
						if (filteredArr.length > 0) {
							val = this.blogs[i];
						}
					}
				}
				return val;
			},
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.blog-post {
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
		}
	}
</style>
