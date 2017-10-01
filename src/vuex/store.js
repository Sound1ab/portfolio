import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

// Modules
import {loadLocalData} from "./loadlocaldata";
import {loadBlogData} from "./loadblogdata";
import {loadProjectData} from "./loadprojectdata";

export default new Vuex.Store({
	plugins: [createPersistedState()],
	state: {
		showMenu: false
	},
	actions: {
		SHOW_BURGER_MENU ({commit}, val) {
			commit('SHOW_BURGER_MENU', val);
		},
	},
	mutations: {
		SHOW_BURGER_MENU (state, payload) {
			if (payload) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
			state.showMenu = payload;
		},
	},
	getters: {
		retrieveData: (state) => (section) => {
			if (state.data[section]) {
				return state.data[section];
			}
		},
		retrieveBlogPost: (state) => (id) => {
			return state.data.blog.filter(element => {
				return id === element.id;
			})
		},
	},
	modules: {
		localData: loadLocalData,
		blogData: loadBlogData,
		projectData: loadProjectData,
	}
});
