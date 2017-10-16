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
					:class="[textColor ? 'show' : '']"
					:style="{color: textColor}"
					v-html="title">
				</h1>
				<h4
					v-if="subTitle"
					class="titles__sub-title eta"
					:class="[textColor ? 'show' : '']"
					:style="{color: textColor}"
					v-html="subTitle">
				</h4>
				<div v-if="published">
					<h4
						class="titles__published eta"
						:class="[publishedColor ? 'show' : '']"
						:style="{color: publishedColor}"
					>
						{{published}} -
					</h4>
					<h4 class="titles__category eta"
						:class="[publishedColor ? 'show' : '']"
						:style="{color: publishedColor}"
					>
						{{upperCase(category)}}
					</h4>
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
	import axios from 'axios';
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
				textColor: '',
				publishedColor: '',
			}
		},
		methods: {
			upperCase (val) {
				return val.toUpperCase()
			},
			componentToHex (c) {
				var hex = c.toString(16);
				return hex.length == 1 ? "0" + hex : hex;
			},
			rgbToHex(r, g, b) {
				return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
			},
			invertColor(rgb, bw) {
				let hex = this.rgbToHex(...rgb);
				if (hex.indexOf('#') === 0) {
					hex = hex.slice(1);
				}
				// convert 3-digit hex to 6-digits.
				if (hex.length === 3) {
					hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
				}
				if (hex.length !== 6) {
					throw new Error('Invalid HEX color.');
				}
				var r = parseInt(hex.slice(0, 2), 16),
					g = parseInt(hex.slice(2, 4), 16),
					b = parseInt(hex.slice(4, 6), 16);
				if (bw) {
					// http://stackoverflow.com/a/3943023/112731
					return (r * 0.299 + g * 0.587 + b * 0.114) > 186
						? '#000000'
						: '#FFFFFF';
				}
				// invert color components
				r = (255 - r).toString(16);
				g = (255 - g).toString(16);
				b = (255 - b).toString(16);
				// pad each with zeros and return
				return "#" + padZero(r) + padZero(g) + padZero(b);
			},
			getAverageRGB(url) {
				axios.get(url, {
					responseType: 'arraybuffer',
				}).then(res => {
					let image = btoa(
						new Uint8Array(res.data)
							.reduce((data, byte) => data + String.fromCharCode(byte), '')
					);
					let dataUri = `data:${res.headers['content-type'].toLowerCase()};base64,${image}`;
					let img = new Image();
					img.onload = () => {
						var vibrant = new Vibrant(img);
						vibrant.getPalette().then(res => {
							let swatch = 'Vibrant';
							this.publishedColor = this.invertColor(res[swatch]._rgb, true);
							this.textColor = `rgb(${res[swatch]._rgb[0]},${res[swatch]._rgb[1]},${res[swatch]._rgb[2]})`;
						});
					};
					img.src = dataUri;
				}).catch(err => {
					console.log('error', err)
				})
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
		height: 100vh;
		&__container {
			max-width: $xl;
			margin: 0 auto;
			text-align: center;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
		}
		&__main-title {
			@include responsive-font(4vw, 30px, (nth($headingSizes, 1)*1px), 40px);
			opacity: 0;
			transition: opacity 3s;
			&.show {
				opacity: 1;
			}
		}
		&__sub-title {
			opacity: 0;
			transition: opacity 3s;
			transition-delay: 1s;
			&.show {
				opacity: 1;
			}
		}
		&__published {
			display: inline-block;
			color: $darkGrey;
			font-style: italic;
			opacity: 0;
			transition: opacity 3s;
			transition-delay: 1s;
			&.show {
				opacity: 1;
			}
		}
		&__category {
			display: inline-block;
			color: $darkGrey;
			letter-spacing: 3px;
			opacity: 0;
			transition: opacity 3s;
			transition-delay: 1s;
			&.show {
				opacity: 1;
			}
		}
	}
</style>
