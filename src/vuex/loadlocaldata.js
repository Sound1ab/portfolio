function grabData (page) {
	return import(`@/assets/data/${page}.json`);
}

export const loadLocalData = {
	state: {
		data: {},
		isDataLoaded: false,
	},
	actions: {
		LOAD_LOCAL_DATA ({commit, dispatch}, page) {
			dispatch('IS_DATA_LOADED', false);
			grabData(page)
				.then(appData => {
					commit('LOAD_LOCAL_DATA', appData);
					dispatch('IS_DATA_LOADED', true);
				});
		},
		IS_DATA_LOADED ({commit}, val) {
			commit('IS_DATA_LOADED', val);
		},
	},
	mutations: {
		LOAD_LOCAL_DATA (state, payload) {
			// if (payload.localStore) {
			// 	localStorage.setItem('lang', JSON.stringify(payload.language));
			// }
			state.data = payload;
		},
		IS_DATA_LOADED (state, payload) {
			state.isDataLoaded = payload;
		},
	},
};
