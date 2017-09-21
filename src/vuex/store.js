import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function grabData (page) {
	return import(`@/assets/data/${page}.json`);
}

export default new Vuex.Store({
	state: {
		data: {}
	},
	actions: {
		LOAD_DATA({commit}, page) {
			grabData('general')
				.then(appData => {
					return appData
				})
				.then((appData) => {
					grabData(page).then(bundleData => {
						let consolidatedObj = {
							...appData,
							...bundleData,
						};
						commit('LOAD_DATA', consolidatedObj);
					});
				})
		},
	},
	mutations: {
		LOAD_DATA(state, payload) {
			// if (payload.localStore) {
			// 	localStorage.setItem('lang', JSON.stringify(payload.language));
			// }
			state.data = payload;
		},
	},
	getters: {
		retrieveData: (state) => (section) => {
			if (state.data[section]) {
				return state.data[section];
			}
		},
	},
});
