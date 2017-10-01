<template>
	<router-link
		:to="{name: 'project', params: { id: id.id}}"
		class="image"
		:style="style()"
		v-progressive-image="{
					src: title.hero_image,
					placeholder: title.hero_image_opti,
					background: true
				}"
	>
		<div
			class="image__copy-container">
			<h2 class="image__line-one gamma">{{title.title}}</h2>
			<p>{{title.sub_title}}</p>
		</div>
	</router-link>
</template>

<script>
	export default {
		name: 'ImageBlock',
		props: ['data'],
		methods: {
			randomIntFromInterval (min, max) {
				return Math.floor(Math.random()*(max-min+1)+min);
			},
			style () {
				if (!this.style.count || this.style.count === 2) {
					this.style.count = 0;
				}
				if (this.style.count === 0) {
					this.style.randomNo = Math.ceil(this.randomIntFromInterval(30, 70) / 10) * 10;
				} else {
					this.style.randomNo = 100 - this.style.randomNo;
				}
				this.style.count++;
				return {
					flexBasis: `${this.style.randomNo}%`,
				}
			},
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
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/tools/mixins.scss';
	@import '~@/assets/scss/settings/variables.scss';
    .image {
		position: relative;
		flex: 0 0 auto;
		height: 250px;
		background-size: cover;
		background-posiion: center;
		cursor: pointer;
		overflow: hidden;
		@include mq($m) {
			flex-basis: 100%!important;
		}
		&:hover .image-grid__copy-container {
			margin-left: em(40);
		}
		&__line-one {
			@include responsive-font(2vw, 20px, nth($headingSizes,3), 25px);
		}
		&__copy-container {
			position: absolute;
			bottom: 0;
			margin: 0 em(20);
			color: #fff;
			transition: all .5s;
			& > p {
				color: #fff;
			}
		}
    }
</style>
