export let fetchImg = {
	methods: {
		fetchImg(image) {
			return require(`@/assets/images/${image}`);
		}
	}
};
