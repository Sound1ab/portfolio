<template>
	<section class="more-blogs">
		<div class="more-blogs__container">
			<div class="more-blogs__copy-container">
				<h1 class="delta">Continue reading</h1>
				<ul class="more-blogs__list">
					<router-link
						v-for="element in data"
						:key="id(element).id"
						:to="{name: 'blogpost', params: { id: id(element).id}}"
					>
						<li class="more-blogs__list-item">
							<div class="more-blogs__date-container">
								<h1 class="more-blogs__date">{{title(element).publish_date}}</h1>
							</div>
							<div class="more-blogs__title-container">
								<h1 class="more-blogs__title theta">{{title(element).title}}</h1>
							</div>
						</li>
					</router-link>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'moreBlogs',
		props: ['data'],
		methods: {
			filter (data, searchTerm) {
				let valArr = data.filter(element => {
					return element.acf_fc_layout === searchTerm
				});
				return valArr[0]
			},
			category (val) {
				return val.toUpperCase()
			},
			id (data) {
				return this.filter(data, 'id');
			},
			title (data) {
				return this.filter(data, 'title');
			},
			introduction (data) {
				return this.filter(data, 'introduction');
			}
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.more-blogs {
		width: 100%;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
		}
		&__copy-container {
			max-width: 660px;
			margin: 0 auto;
			padding-left: em(50);
			@include mq($s) {
				padding-left: 0;
			}
		}
		&__list {
			list-style-type: none;
			padding: 0;
			margin: 0;

		}
		&__list-item {
			margin-bottom: em(15);
		}
		&__date-container{
			width: 230px;
			display: inline-block;
		}
		&__title-container {
			display: inline-block;
			transition: all .5s;
			&:hover {
				transform: translateX(10px);
			}
		}
		&__date {
			display: inline;
			color: $lightGrey;
			font-style: italic;
		}
		&__title {
			display: inline;

		}
	}
</style>
