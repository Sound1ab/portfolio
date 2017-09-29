<template>
	<section class="image-grid">
		<div class="image-grid__container">
			<router-link
				v-for="element in storeData"
				:to="{name: 'project', params: { id: element.id}}"
				class="image-grid__image"
				:style="style()"
				:key="element.id"
				v-progressive-image="{
						src: fetchImg(element.image),
						placeholder: fetchImg(element.placeholder),
						background: true
					}"
			>
				<div
					class="image-grid__copy-container">
					<h2 class="image-grid__line-one gamma">{{element.line_one}}</h2>
					<p>{{element.line_two}}</p>
				</div>
			</router-link>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'ImageGrid',
		props: [''],
		data () {
			return {};
		},
		watch: {},
		methods: {
			randomIntFromInterval (min, max) {
				return Math.floor(Math.random()*(max-min+1)+min);
			},
			style (backgroundImage) {
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
		},
		computed: {
			...mapState({
				storeData: state => state.localData.data.projects,
			}),
		},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.image-grid {
		width: 100%;
		margin-bottom: $mMargBottom;
		&__container {
			max-width: $xl;
			@include mq($xl) {
				max-width: $mobileContainer;
			}
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
		}
		&__line-one {
			@include responsive-font(2vw, 20px, nth($headingSizes,3), 25px);
		}
		&__image {
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
