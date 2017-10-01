import axios from 'axios';

const api = {
	blog: 'http://api.phillipparker.tech/wp-json/wp/v2/posts'
}

export const loadBlogData = {
	state: {
		blogs: [],
		isRemoteDataLoaded: false,
	},
	actions: {
		LOAD_BLOG_DATA ({commit, dispatch}) {
			dispatch('IS_REMOTE_DATA_LOADED', false);
			axios.get(api.blog)
				.then((res) => {
					let refinedBlogData = res.data.reduce((accumulator, element) => {
						if (element.acf.hasOwnProperty('blog')) {
							return [...accumulator, [
								...element.acf.blog,
								{acf_fc_layout: 'id', id: element.id}
							]];
						} else {
							return accumulator;
						}
					}, []);
					commit('LOAD_BLOG_DATA', refinedBlogData);
					dispatch('IS_REMOTE_DATA_LOADED', true);
				})
		},
		IS_REMOTE_DATA_LOADED ({commit}, val) {
			commit('IS_REMOTE_DATA_LOADED', val);
		},
	},
	mutations: {
		LOAD_BLOG_DATA (state, payload) {
			state.blogs = payload;
		},
		IS_REMOTE_DATA_LOADED (state, payload) {
			state.isRemoteDataLoaded = payload;
		},
	},
};
