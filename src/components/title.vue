<template>
	<div class="titles">
		<div class="titles__container">
			<h1
				v-if="title"
				class="titles__main-title alpha"
				v-html="title">
			</h1>
			<h4
				v-if="subTitle"
				class="delta"
				v-html="subTitle">
			</h4>
			<div v-if="published">
				<h4 class="titles__published delta">{{published}} -</h4>
				<h4 class="titles__category delta">{{upperCase(category)}}</h4>
			</div>
			<a
				v-if="link"
				class="cta"
				:href="link.url"
				target="_blank"
				rel="noopener">
				{{link.title}}
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Title',
		props: ['title', 'subTitle', 'link', 'published', 'category'],
		methods: {
			upperCase (val) {
				return val.toUpperCase()
			},
		}
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.titles {
		width: 100%;
		&__container {
			max-width: $xl;
			margin: 0 auto;
			text-align: center;
			padding: em(100) em(50);
			@include mq($xl) {
				max-width: $mobileContainer;
			}
		}
		&__main-title {
			@include responsive-font(4vw, 30px, (nth($headingSizes, 1)*1px), 40px);
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
