// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Mixin imports
import {fetchImg} from './mixins/fetchImg';

// Directive imports
import designMode from './directives/designMode';

// Mixin globals
Vue.mixin(fetchImg);

// Directive globals
Vue.directive('design-mode', designMode());

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
