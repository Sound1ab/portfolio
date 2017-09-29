<template>
	<section class="blog-post">
		<transition-group name="fade">
			<tiitle
				v-if="Object.keys(title).length > 0"
				key="title"
				:title="title.title"
				:published="title.publish_date"
				:category="title.category">
			</tiitle>
			<column v-if="columnData.length > 0" key="column" :sections="columnData"></column>
		</transition-group>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	import _ from 'lodash';
	export default {
		name: 'BlogPost',
		props: [''],
		components: {
			'Tiitle': () => import('@/components/title'),
			'Column': () => import('@/components/column')
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
