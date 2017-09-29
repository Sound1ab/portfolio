import axios from 'axios';

const api = {
	blog: 'http://api.phillipparker.tech/wp-json/wp/v2/posts'
}

export const loadBlogData = {
	state: {
		blogs: [],
		blog: [],
		isRemoteDataLoaded: false,
	},
	actions: {
		LOAD_BLOG_DATA ({commit, dispatch}) {
			dispatch('IS_REMOTE_DATA_LOADED', false);
			axios.get(api.blog)
				.then((res) => {
					let refinedBlogData = res.data.map(element => {
						return [
							...element.acf.blog,
							{acf_fc_layout: 'id', id: element.id}
						];
					});
					commit('LOAD_BLOG_DATA', refinedBlogData);
					dispatch('IS_REMOTE_DATA_LOADED', true);
				})
		},
		LOAD_BLOG_POST ({commit, dispatch}, id) {
			dispatch('IS_REMOTE_DATA_LOADED', false);
			axios.get(`${api.blog}/${id}`)
				.then(res => {
					commit('LOAD_BLOG_POST', res.data.acf.blog);
					dispatch('IS_REMOTE_DATA_LOADED', true);
				})
		},
		SET_BLOG_POST ({commit}, blog) {
			commit('LOAD_BLOG_POST', blog)
		},
		IS_REMOTE_DATA_LOADED ({commit}, val) {
			commit('IS_REMOTE_DATA_LOADED', val);
		},
	},
	mutations: {
		LOAD_BLOG_DATA (state, payload) {
			state.blogs = payload;
		},
		LOAD_BLOG_POST (state, payload) {
			state.blog = payload;
		},
		IS_REMOTE_DATA_LOADED (state, payload) {
			state.isRemoteDataLoaded = payload;
		},
	},
};
