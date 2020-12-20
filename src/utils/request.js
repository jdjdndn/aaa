/* 
封装请求模块
*/

import axios from 'axios'
import store from '@/store'
const request = axios.create({
	baseURL: 'http://toutiao-app.itheima.net/',
})

request.interceptors.request.use(
	function(config) {
		const { user } = store.state
		if (user) config.headers.Authorization = `bearer ${user.token}`
		return config
	},
	function(err) {
		return Promise.reject(err)
	}
)

export default request
