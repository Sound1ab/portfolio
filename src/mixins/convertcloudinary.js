export let convertCloudinary = {
	methods: {
		convertCloudinary ({src, effect, amount}) {
			let baseUrl = 'http://res.cloudinary.com/dwdoisdas/image/upload';
			let effectUrl = `/e_${effect}:${amount}`;
			let splitSrc = src.split('/');
			return `${baseUrl}${effectUrl}/${splitSrc[splitSrc.length-2]}/${splitSrc[splitSrc.length-1]}`;
		}
	}
};
