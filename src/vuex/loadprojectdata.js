// import axios from 'axios';
//
// const api = {
// 	blog: 'http://api.phillipparker.tech/wp-json/wp/v2/posts'
// }
//
// export const loadProjectData = {
// 	state: {
// 		blogs: [],
// 		blog: [],
// 		isRemoteDataLoaded: false,
// 	},
// 	actions: {
// 		LOAD_BLOG_DATA ({commit, dispatch}) {
// 			dispatch('IS_REMOTE_DATA_LOADED', false);
// 			axios.get(api.blog)
// 				.then((res) => {
// 					let refinedBlogData = res.data.map(element => {
// 						if (element.acf.hasOwnProperty(blog)) {
// 							return [
// 								...element.acf.blog,
// 								{acf_fc_layout: 'id', id: element.id}
// 							];
// 						}
// 					});
// 					commit('LOAD_BLOG_DATA', refinedBlogData);
// 					dispatch('IS_REMOTE_DATA_LOADED', true);
// 				})
// 		},
// 		IS_REMOTE_DATA_LOADED ({commit}, val) {
// 			commit('IS_REMOTE_DATA_LOADED', val);
// 		},
// 	},
// 	mutations: {
// 		LOAD_BLOG_DATA (state, payload) {
// 			state.blogs = payload;
// 		},
// 		IS_REMOTE_DATA_LOADED (state, payload) {
// 			state.isRemoteDataLoaded = payload;
// 		},
// 	},
// };
