import axios from 'axios';

const api = {
	projects: 'http://api.phillipparker.tech/wp-json/wp/v2/posts'
}

export const loadProjectData = {
	state: {
		projects: [],
		isRemoteDataLoaded: false,
	},
	actions: {
		LOAD_PROJECT_DATA ({commit, dispatch}) {
			dispatch('IS_REMOTE_DATA_LOADED', false);
			axios.get(api.projects)
				.then((res) => {
					let refinedProjectData = res.data.reduce((accumulator, element) => {
						if (element.acf.hasOwnProperty('project')) {
							return [...accumulator, [
								...element.acf.project,
								{acf_fc_layout: 'id', id: element.id}
							]];
						} else {
							return accumulator;
						}
					}, []);
					commit('LOAD_PROJECT_DATA', refinedProjectData);
					dispatch('IS_REMOTE_DATA_LOADED', true);
				})
		},
		IS_REMOTE_DATA_LOADED ({commit}, val) {
			commit('IS_REMOTE_DATA_LOADED', val);
		},
	},
	mutations: {
		LOAD_PROJECT_DATA (state, payload) {
			state.projects = payload;
		},
		IS_REMOTE_DATA_LOADED (state, payload) {
			state.isRemoteDataLoaded = payload;
		},
	},
};
