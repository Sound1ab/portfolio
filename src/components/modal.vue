<template>
	<transition name="roundin" mode="out-in">
		<section v-if="show" class="modal">
				<div  class="modal__outer">
					<span class="eta">Ta</span>
				</div>
		</section>
	</transition>
</template>

<script>
	export default {
		name: 'modal',
		props: ['show'],
		components: {},
		data () {
			return {};
		},
		methods: {},
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/tools/mixins.scss';
	@import '~@/assets/scss/settings/variables.scss';
    .modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		&__outer {
			position: relative;
			max-width: em(200);
			height: em(200);
			background-color: $tertiaryColour;
			margin: 0 auto;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			color: white;
			pointer-events: none;
		}
    }
</style>
