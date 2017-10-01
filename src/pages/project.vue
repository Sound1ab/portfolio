<template>
	<section class="project">
		<tiitle
			:title="title.title"
			:subTitle="title.sub_title"
			:hero-image="{
				main: title.hero_image,
				opti: title.hero_image_opti,
			}"
			:link="{
				title: 'View the site',
				url: title.website_url
			}">
		</tiitle>
		<column :sections="columnData"></column>
		<image-grid></image-grid>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'Project',
		props: [''],
		components: {
			'ImageGrid': () => import('@/components/imagegrid/imagegrid'),
			'Tiitle': () => import('@/components/title'),
			'Column': () => import('@/components/column')
		},
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
				projects: state => state.projectData.projects
			}),
			columnData () {
				let val = [];
				val = this.project.filter(element => {
					return element.acf_fc_layout !== 'title'
						&& element.acf_fc_layout !== 'id'
						&& element.acf_fc_layout !== 'hero_image';
				});
				return val.length > 0 ? val : [];
			},
			title () {
				let val = {};
				if (this.project.length > 0) {
					val = this.filter(this.project, 'title');
				}
				return Object.keys(val).length > 0 ? val : {};
			},
			heroImage () {
				let val = {};
				if (this.project.length > 0) {
					val = this.filter(this.project, 'hero_image');
				}
				return Object.keys(val).length > 0 ? val : {};
			},
			project () {
				let val = [];
				if (this.projects.length > 0) {
					for (let i = 0; i < this.projects.length; i++) {
						let filteredArr = this.projects[i].filter(element => {
							if (element.id) {
								return element.id == this.$route.params.id;
							} else {
								return false;
							}
						});
						if (filteredArr.length > 0) {
							val = this.projects[i];
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
