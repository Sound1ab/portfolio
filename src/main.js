// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Polyfills
require('intersection-observer');

// Library imports
import VueProgressBar from 'vue-progressbar'

// Mixin imports
import {fetchImg} from './mixins/fetchImg';

// Directive imports
import designMode from './directives/designMode';
import progressiveImage from './directives/progressiveimage';

// Library globals
const options = {
	color: '#6FB98F',
	failedColor: '#874b4b',
	thickness: '5px',
	transition: {
		speed: '0.2s',
		opacity: '0.6s',
		termination: 300
	},
	autoRevert: true,
	location: 'top',
	inverse: false
}
Vue.use(VueProgressBar, options)

// Mixin globals
Vue.mixin(fetchImg);

// Directive globals
Vue.directive('design-mode', designMode());
Vue.directive('progressive-image', progressiveImage());

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
