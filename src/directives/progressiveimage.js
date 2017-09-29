function randomString() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	for (var i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function getQuery (url) {
	let qs = url.substring(url.indexOf('?') + 1).split('&');
	let result = {};
	for(let i = 0; i < qs.length; i++){
		qs[i] = qs[i].split('=');
		result[qs[i][0]] = decodeURIComponent(qs[i][1]);
	}
	return result;
}

function setupOptimisedImg (url) {
	let queryString = getQuery(url);
	let splitChar = Object.keys(queryString).length > 0 ? '&' : '?';
	return `${url}${splitChar}pixelate=3&blur=100`;
}

function changeBackgroundImg (el, url) {
	el.style.backgroundImage = `url('${url}')`;
}

function changeImgSrc (el, url) {
	el.src = url;
}

function createClass (url) {
	return `
		position: absolute; 
		top: 0;
		left: 0;
		z-index: inherit;
		display: block;
		background-image: url('${url}');
		background-size: inherit;
		background-position: inherit;
		width: 100%;
		height: 100%;
	`
}

function createNode (cls) {
	let div = document.createElement('div');
	div.classList.add(cls);
	return div;
}

function setAttribute (el, name, val) {
	el.setAttribute(name, val);
}

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

function intersectionCallback ({url, isBackgroundImg}, entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			let img = new Image();
			let node;
			img.src = url;
			if (isBackgroundImg) {
				let rndClass = randomString();
				addCSSRule(	document.styleSheets[document.styleSheets.length-1], `.${rndClass}`, createClass(url));
				node = createNode(rndClass);
				setAttribute(node, 'pLazy', 'loading');
				entry.target.insertBefore(node, entry.target.firstChild);
			} else {
				changeImgSrc(entry.target, url);
				setAttribute(entry.target, 'pLazy', 'loading');
			}
			img.onload = () => {
				setAttribute(isBackgroundImg ? node : entry.target, 'pLazy', 'loaded');
			};
			observer.unobserve(entry.target);
		}
	});
}

const intersectOptions = {
	root: null,
	rootMargin: '100px 0px',
	threshold: 0,
};

function setupObserver (el, url) {
	let observer = new IntersectionObserver(intersectionCallback.bind(null, url), intersectOptions);
	observer.observe(el);
}

export default function progressiveImage () {
	return {
		bind (el, binding) {
			let isBackgroundImg = typeof binding.value.background === 'boolean' && binding.value.background;
			if (isBackgroundImg) {
				changeBackgroundImg(el, binding.value.placeholder);
			}
			setupObserver(el, {url: binding.value.src, isBackgroundImg});
		}
	}
};
