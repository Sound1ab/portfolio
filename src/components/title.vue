<template>
	<div
		class="titles"
		v-progressive-image="{
					src: heroImage.main,
					placeholder: heroImage.opti,
					background: true
				}"
	>
		<div class="titles__container">
			<div>
				<h1
					v-if="title"
					class="titles__main-title alpha"
					:style="{color: textColor}"
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
	</div>
</template>

<script>
	let Vibrant = require('node-vibrant');
	export default {
		name: 'Title',
		props: {
			title: String,
			subTitle: String,
			link: Object,
			published: String,
			category: String,
			heroImage: Object
		},
		data () {
			return {
				textColor: 'rgb(255,255,255)'
			}
		},
		methods: {
			upperCase (val) {
				return val.toUpperCase()
			},
			getAverageRGB(url) {
				let img = new Image();
				img.onload = () => {
					var vibrant = new Vibrant(img);
					vibrant.getPalette().then(res => {
						let swatch = 'Vibrant';
						this.textColor = `rgb(${res[swatch]._rgb[0]},${res[swatch]._rgb[1]},${res[swatch]._rgb[2]})`;
					});
				}
				img.src = url + '?' + new Date().getTime();
				img.setAttribute('crossOrigin', '');
			},
		},
		computed: {
			style () {
				return {
					background: `url(${this.heroImage.main}) no-repeat`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}
			}
		},
		created () {
			if (this.heroImage) {
				this.getAverageRGB(this.heroImage.main);
			}

		}
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.titles {
		position: relative;
		z-index: -1;
		width: 100%;
		background: no-repeat;
		background-position: center;
		background-size: cover;
		margin-bottom: em(50);
		&__container {
			max-width: $xl;
			margin: 0 auto;
			text-align: center;
			height: 100vh;
			/*padding: em(100) em(50);*/
			display: flex;
			justify-content: center;
			align-items: center;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
		}
		&__main-title {
			transition: all 5s;
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
