<template>
	<div class="post-overview">
		<div class="post-overview__container">
			<router-link :to="{name: 'blogpost', params: { id: id.id}}">
				<h2 class="post-overview__title eta">{{title.title}}</h2>
			</router-link>
			<h4 class="post-overview__published delta">{{title.publish_date}} -</h4>
			<h4 class="post-overview__category delta">{{category(title.category)}}</h4>
			<p>{{introduction.introduction}}</p>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash';
	export default {
		name: 'post-overview',
		props: ['data'],
		data () {
			return {};
		},
		watch: {},
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
		},
		computed: {
			id () {
				return this.filter(this.data, 'id');
			},
			title () {
				return this.filter(this.data, 'title');
			},
			introduction () {
				return this.filter(this.data, 'introduction');
			}
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.post-overview {
		width: 100%;
		margin-bottom: $mMargBottom;
		&__container {
			max-width: $column;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
		}
		&__title {
			color: $quinaryColour;
			&:hover {
				color: darken($quinaryColour, 5%)
			}
		}
		&__published {
			display: inline-block;
			color: $darkGrey;
			font-style: italic;
		}
		&__category {
			display: inline-block;
			color: $darkGrey;
			letter-spacing: 3px;
		}
	}
</style>
