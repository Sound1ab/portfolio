 <template>
	<div class="column" ref="parentNode"></div>
</template>

<script>
	let Prism = require('prismjs');
	let Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
	let beautify = require('js-beautify').js_beautify;
	import _ from 'lodash';
	const nw = new Normalizer({
		'remove-trailing': true,
		'remove-indent': true,
		'left-trim': true,
		'right-trim': true,
        'indent': 0,
	});
	export default {
		name: 'Column',
		props: ['sections'],
		methods: {
			setupBaseElements () {
				return {
					introduction: 'p',
					tldr: 'p',
					paragraph: 'p',
					code: 'div',
					image: 'div',
				}
			},
			createNode (baseType) {
				return document.createElement(baseType);
			},
			applyClasses (classes, el) {
				classes.forEach(element => {
					el.classList.add(element);
				});
			},
			setupCodeBlock (copy) {
				let codeStr = nw.normalize(copy);
				return `
					<div class="column__code-block">
						<pre>
							<code class="language-javascript column__code-inline">
								${Prism.highlight(codeStr, Prism.languages.javascript)}
							</code>
						</pre>
					</div>
					`;
			},
			stripHTML (str) {
				return str.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
			},
			createElement (element) {
				if (!this.createElement.types) {
					this.createElement.types = this.setupBaseElements();
				}
				let childNode = this.createNode(this.createElement.types[element.type]);
				this.applyClasses(this.classes[element.type], childNode);
				if (element.type === 'image') {
					if (element.value) {
						let imgNode = this.createNode('img');
						this.applyClasses(['column__image'], imgNode);
						imgNode.src = element.value;
						childNode.appendChild(imgNode);
					}
				} else if (element.type === 'code') {
					childNode.innerHTML = this.setupCodeBlock(
						beautify(element.value, {index_size: 1, wrap_line_length: 40})
					);
					childNode.setAttribute('ref', 'childNode');
				} else if (element.type === 'paragraph') {
					childNode.innerHTML = this.stripHTML(element.value);
				} else {
					childNode.innerHTML = element.value
				}
				this.$refs.parentNode.appendChild(childNode);
			}
		},
		computed: {
			classes () {
				return {
					introduction: ["column__introduction", "eta"],
					tldr: ["column__tldr"],
					paragraph: ["column__paragraph"],
					code: ["column__code"],
					image: ["column__image-container"],
					spacer: ["column__spacer"],
				}
			},
		},
		mounted () {
			this.sections.forEach(element => {
				this.createElement({
					type: element.acf_fc_layout,
					value: element[element.acf_fc_layout]
				})
			})
		}
	};
</script>

<style lang="scss" type="text/scss">
	@import '~@/assets/scss/settings/variables.scss';
	@import '~@/assets/scss/tools/mixins.scss';
	.column {
		width: 100%;
		&__introduction {
			max-width: $column;
			margin: 0 auto em(15) auto;
			@include mq(660) {
				max-width: $mobileContainer;
			}
		}
		&__tldr {
			max-width: $column;
			margin: 0 auto em(15) auto;
			@include mq(660) {
				max-width: $mobileContainer;
			}
		}
		&__paragraph {
			max-width: $column;
			margin: 0 auto em(15) auto;
			@include mq(660) {
				max-width: $mobileContainer;
			}
		}
		&__code {
			width: 100%;
			left: 0;
			background-color: #1d262f;
			margin-bottom: em(15);
		}
		&__code-block {
			margin: 0 auto!important;
			padding: em(20);
			max-width: $column;
			& > pre {
				white-space: pre-line;
			}
		}
		&__code-inline {
			white-space: pre-wrap!important;
		}
		&__image-container {
			width: 100%;
		}
		&__image {
			max-width: $column;
			width: 100%;
			margin: 0 auto;
			display: block;
		}
	}
</style>
