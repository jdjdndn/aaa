import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN = 'TOKEN'
export default new Vuex.Store({
	state: {
		user: getItem(TOKEN),
	},
	mutations: {
		restoreToken(state, data) {
			state.user = data
			setItem(TOKEN, state.user)
		},
	},
	actions: {},
	modules: {},
})
